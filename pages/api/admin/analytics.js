import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getMockAnalyticsOverview } from '@/services/analytics/mockData';

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // Explicitly log presence to server terminal
  console.log("[GA4_INIT_CHECK] GA_PROPERTY_ID:", !!propertyId);
  console.log("[GA4_INIT_CHECK] GOOGLE_CLIENT_EMAIL:", !!clientEmail);
  console.log("[GA4_INIT_CHECK] GOOGLE_PRIVATE_KEY:", !!privateKey);

  const envCheck = {
    hasPropertyId: !!propertyId,
    hasClientEmail: !!clientEmail,
    hasPrivateKey: !!privateKey
  };

  if (!propertyId || !clientEmail || !privateKey) {
    console.warn("[GA4_DEBUG] Missing credentials:", envCheck);
    const mockData = await getMockAnalyticsOverview();
    return res.status(200).json({ 
      ...mockData, 
      status: "missing_credentials",
      error: "MISSING_ENV_VARS",
      details: { propertyIdQueried: propertyId || 'None', errorMessage: "Missing one or more required environment variables." },
      envCheck
    });
  }

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      }
    });

    // Run parallel reports for performance
    const [overviewResponse, trendResponse, topPagesResponse, sourceResponse, deviceResponse] = await Promise.all([
      // 1. Overview KPIs
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' }
        ]
      }),
      // 2. Trend (Last 30 Days)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }]
      }),
      // 3. Top Pages
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'bounceRate' }],
        limit: 5,
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }]
      }),
      // 4. Traffic Sources
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }]
      }),
      // 5. Device Breakdown
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }]
      })
    ]);

    // Format Overview KPIs
    const overviewRow = overviewResponse[0].rows[0]?.metricValues || [];
    const formatNumber = (num) => parseInt(num || 0).toLocaleString();
    const formatTime = (secs) => {
      const s = parseInt(secs || 0);
      const m = Math.floor(s / 60);
      return `${m}m ${s % 60}s`;
    };

    // Format Trend Data
    const trendData = trendResponse[0].rows.map(row => {
      const d = row.dimensionValues[0].value;
      const formattedDate = `${d.substring(4,6)}/${d.substring(6,8)}`;
      return {
        name: formattedDate,
        Traffic: parseInt(row.metricValues[0].value)
      };
    }).sort((a,b) => a.name.localeCompare(b.name));

    // Format Top Pages
    const topPages = topPagesResponse[0].rows.map(row => ({
      path: row.dimensionValues[0].value,
      title: row.dimensionValues[1].value,
      views: formatNumber(row.metricValues[0].value),
      bounceRate: `${(parseFloat(row.metricValues[1].value || 0) * 100).toFixed(1)}%`
    }));

    // Format Sources
    const colors = ["#0f766e", "#3b82f6", "#f59e0b", "#64748b", "#cbd5e1"];
    const trafficSources = sourceResponse[0].rows.map((row, i) => ({
      name: row.dimensionValues[0].value,
      value: parseInt(row.metricValues[0].value),
      color: colors[i % colors.length]
    }));

    // Format Devices
    const deviceBreakdown = deviceResponse[0].rows.map((row, i) => ({
      name: row.dimensionValues[0].value,
      value: parseInt(row.metricValues[0].value),
      color: colors[i % colors.length]
    }));

    res.status(200).json({
      status: "live",
      kpis: {
        totalVisitors: formatNumber(overviewRow[0]?.value),
        sessions: formatNumber(overviewRow[1]?.value),
        pageViews: formatNumber(overviewRow[2]?.value),
        conversionRate: "-", // Computed client side via inquiries
        avgSessionDuration: formatTime(overviewRow[3]?.value)
      },
      trafficTrend: trendData.length ? trendData : [{ name: "No data", Traffic: 0 }],
      trafficSources,
      deviceBreakdown,
      topPages
    });

  } catch (error) {
    const exactErrorMessage = error.message || String(error);
    console.error("[GA4_DEBUG] API Exception thrown:", exactErrorMessage);
    console.error(error); // Full stack trace
    
    const mockData = await getMockAnalyticsOverview();
    return res.status(200).json({ 
      ...mockData, 
      status: "api_error",
      error: exactErrorMessage,
      details: {
        propertyIdQueried: propertyId,
        errorMessage: exactErrorMessage
      },
      envCheck
    });
  }
}
