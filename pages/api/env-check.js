export default function handler(req, res) {
  try {
    // 1. Ensure it's a true API endpoint
    res.setHeader('Content-Type', 'application/json');

    // 2. Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    // 3. Return raw JSON only, never render React components
    return res.status(200).json({
      hasGaPropertyId: !!process.env.GA_PROPERTY_ID,
      hasGoogleClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
      hasGooglePrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      runtime: process.env.NODE_ENV || 'unknown',
      deploymentEnvironment: process.env.VERCEL_ENV || 'local'
    });
  } catch (error) {
    // 6. Add console.error logging
    console.error("[API_ERROR] /api/env-check failed:", error);
    
    // 5. On failure return exact error with HTTP 500
    return res.status(500).json({
      success: false,
      error: error.message || String(error)
    });
  }
}
