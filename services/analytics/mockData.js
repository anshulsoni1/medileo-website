export const getMockAnalyticsOverview = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    kpis: {
      totalVisitors: "24,592",
      sessions: "31,840",
      pageViews: "89,104",
      conversionRate: "2.4%",
      avgSessionDuration: "2m 14s",
    },
    trafficTrend: [
      { name: "Week 1", Traffic: 4200 },
      { name: "Week 2", Traffic: 5100 },
      { name: "Week 3", Traffic: 6800 },
      { name: "Week 4", Traffic: 8492 },
    ],
    trafficSources: [
      { name: "Organic Search", value: 55, color: "#0f766e" },
      { name: "Direct", value: 25, color: "#3b82f6" },
      { name: "Referral", value: 15, color: "#f59e0b" },
      { name: "Social", value: 5, color: "#64748b" },
    ],
    deviceBreakdown: [
      { name: "Desktop", value: 65, color: "#0f766e" },
      { name: "Mobile", value: 30, color: "#64748b" },
      { name: "Tablet", value: 5, color: "#cbd5e1" },
    ],
    topPages: [
      { path: "/", title: "Home", views: "34,201", bounceRate: "42%" },
      { path: "/about", title: "About Us", views: "18,405", bounceRate: "35%" },
      { path: "/services", title: "Our Services", views: "15,890", bounceRate: "28%" },
      { path: "/contact", title: "Contact Us", views: "12,100", bounceRate: "15%" },
      { path: "/careers", title: "Careers", views: "8,508", bounceRate: "45%" },
    ]
  };
};
