import { AnalyticsAdminServiceClient } from '@google-analytics/admin';

export default async function handler(req, res) {
  try {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      return res.status(500).json({
        success: false,
        error: "Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY"
      });
    }

    const adminClient = new AnalyticsAdminServiceClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      }
    });

    const diagnostics = {
      authenticatedEmail: clientEmail,
      targetPropertyVisible: false,
      accounts: [],
      properties: [],
      errors: []
    };

    try {
      // Fetch all accounts and properties accessible by this service account
      const [accountSummaries] = await adminClient.listAccountSummaries();
      
      for (const account of accountSummaries) {
        diagnostics.accounts.push({
          name: account.name,
          account: account.account,
          displayName: account.displayName
        });

        // Loop through the properties under each account
        if (account.propertySummaries) {
          for (const prop of account.propertySummaries) {
            diagnostics.properties.push({
              property: prop.property,
              displayName: prop.displayName,
              parent: prop.parent
            });

            // Check if our specific target property is inside this list
            if (prop.property === 'properties/539650280' || prop.property.includes('539650280')) {
              diagnostics.targetPropertyVisible = true;
            }
          }
        }
      }
    } catch (apiError) {
      diagnostics.errors.push(apiError.message || String(apiError));
    }

    return res.status(200).json({
      success: true,
      diagnostics
    });

  } catch (error) {
    console.error("[GA_PROPERTIES_DEBUG] Fatal Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || String(error)
    });
  }
}
