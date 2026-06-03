// Placeholder for future database-driven template service
export const getEmailTemplates = async () => {
  // In the future, this will fetch from Supabase: await supabase.from('email_templates').select('*');
  return {
    "Partnership Response": "Hello,\n\nThank you for reaching out regarding a potential partnership. We are currently reviewing your proposal and will get back to you shortly.\n\nBest regards,\nMedileo Healthcare Team",
    "Product Inquiry Response": "Hello,\n\nThank you for your interest in our pharmaceutical products. Could you please provide more details on the specific therapeutic areas or products you are inquiring about?\n\nBest regards,\nMedileo Healthcare Team",
    "Follow-up Request": "Hello,\n\nI am following up on our previous communication. Let me know if you need any further information from our end to proceed.\n\nBest regards,\nMedileo Healthcare Team",
    "Thank You Response": "Hello,\n\nThank you for getting in touch with Medileo Healthcare. Your inquiry has been received, and a representative will contact you within 24-48 hours.\n\nBest regards,\nMedileo Healthcare Team"
  };
};
