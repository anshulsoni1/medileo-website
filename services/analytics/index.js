export const getAnalyticsOverview = async () => {
  try {
    const response = await fetch('/api/admin/analytics');
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch analytics from API, returning empty structural preview:", error);
    // If the API itself fails (e.g. 500 error, network error), return an empty structure
    // that won't break the UI. (Our API already tries to return mock data on GA error)
    return {
      status: "missing_credentials",
      error: "NETWORK_ERROR",
      kpis: {},
      trafficTrend: [],
      trafficSources: [],
      deviceBreakdown: [],
      topPages: []
    };
  }
};
