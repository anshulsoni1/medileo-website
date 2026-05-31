import { getMockAnalyticsOverview } from './mockData';

// This is the centralized analytics service router.
// In the future, this will orchestrate calls to Google Analytics 4, Microsoft Clarity, and GSC.

export const getAnalyticsOverview = async () => {
  // Currently returning mock data as requested.
  // Roadmap: Implement GA4 Data API authentication here, and merge with Clarity/GSC metrics.
  return getMockAnalyticsOverview();
};
