import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const MEDILEO_SIGNATURE = `
<br/><br/>
<hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 24px; margin-bottom: 16px;" />
<table style="width: 100%; font-family: sans-serif; font-size: 13px; color: #475569;">
  <tr>
    <td style="padding-right: 16px; border-right: 1px solid #cbd5e1; width: 60px;">
      <div style="width: 48px; height: 48px; background-color: #0f766e; border-radius: 8px; display: inline-block; text-align: center; line-height: 48px; color: white; font-weight: bold; font-size: 24px;">M</div>
    </td>
    <td style="padding-left: 16px;">
      <strong style="color: #0f766e; font-size: 15px;">Medileo Healthcare</strong><br/>
      Corporate Partnerships & Inquiry Response<br/>
      <a href="https://www.medileohealthcare.com" style="color: #0d9488; text-decoration: none;">www.medileohealthcare.com</a><br/>
      <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 4px;">This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed.</span>
    </td>
  </tr>
</table>
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { inquiryId, recipientEmail, subject, message, adminEmail } = req.body;

  if (!inquiryId || !recipientEmail || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let deliveryStatus = 'sent';
  let errorMessage = null;
  let emailData = null;

  try {
    // Check if Resend is configured
    if (!resend) {
      console.warn("[EMAIL_DELIVERY] WARNING: RESEND_API_KEY is not configured. Email will not be sent.");
      return res.status(500).json({ message: 'Email provider is not configured. Please contact support or set RESEND_API_KEY.' });
    }

    // 1. Send the email using Resend
    const fromEmail = process.env.REPLY_FROM_EMAIL || 'info@medileohealthcare.com';
    const htmlPayload = `<div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\\n/g, '<br/>')}</div>${MEDILEO_SIGNATURE}`;

    console.log(`[EMAIL_DELIVERY] Attempting to send email to ${recipientEmail} with subject: ${subject}`);

    const response = await resend.emails.send({
      from: `Medileo Admin <${fromEmail}>`,
      to: [recipientEmail],
      subject: subject,
      html: htmlPayload,
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      deliveryStatus = 'failed';
      errorMessage = response.error.message || 'Unknown Resend Error';
    } else {
      emailData = response.data;
    }
    
    // 2. Initialize Supabase Service Role client to bypass RLS and insert the record
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
      
      // Update the inquiry status to Contacted if successful
      if (deliveryStatus === 'sent') {
        const { error: updateError } = await supabaseAdmin
          .from('inquiries')
          .update({ status: 'Contacted' })
          .eq('id', inquiryId);

        if (updateError) {
           console.error("Failed to update status to Contacted:", updateError);
        }
      }
      
      // Insert the reply log including audit fields
      const adminId = req.body.adminId || '00000000-0000-0000-0000-000000000000'; // Fallback for demo
      
      await supabaseAdmin.from('inquiry_replies').insert({
         inquiry_id: inquiryId,
         sent_by: adminId,
         sent_by_email: adminEmail || 'admin@medileohealthcare.com',
         recipient_email: recipientEmail,
         subject: subject,
         message: message, // Store original raw message without signature for UI display
         delivery_status: deliveryStatus,
         error_message: errorMessage
      });
      
      // Log to audit system
      await supabaseAdmin.from('audit_logs').insert({
        user_id: adminId,
        user_email: adminEmail || 'admin@medileohealthcare.com',
        action: 'SEND_REPLY',
        entity_type: 'INQUIRY',
        entity_id: inquiryId,
        new_value: { recipient: recipientEmail, subject, deliveryStatus }
      });
    }

    if (deliveryStatus === 'failed') {
      return res.status(500).json({ message: 'Failed to send email', error: errorMessage });
    }

    return res.status(200).json({ success: true, data: emailData });
  } catch (error) {
    console.error('Reply API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
