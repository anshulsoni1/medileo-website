import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev'
const TO_EMAIL = Deno.env.get('TO_EMAIL') || 'medileohealthcare@gmail.com'

serve(async (req) => {
  try {
    const payload = await req.json()

    // The webhook payload from Supabase has 'type' (INSERT) and 'record' (the row)
    const record = payload.record

    if (!record) {
      return new Response(JSON.stringify({ error: "No record provided" }), { status: 400 })
    }

    const { full_name, email, phone, company, subject, message, created_at } = record

    // Create a professional HTML template suitable for pharmaceutical corporate identity
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f766e; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">New Corporate Inquiry</h2>
          <p style="color: #ccfbf1; margin: 5px 0 0 0;">Medileo Healthcare</p>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${full_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Email</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${email}" style="color: #0f766e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Phone</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Company</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Subject</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><strong>${subject}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Date</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${new Date(created_at).toLocaleString()}</td>
            </tr>
          </table>
          
          <h3 style="color: #0f172a; border-bottom: 2px solid #0f766e; padding-bottom: 8px; display: inline-block;">Message</h3>
          <p style="background-color: #f8fafc; padding: 15px; border-radius: 6px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://supabase.com/dashboard/project/_/editor" style="background-color: #0f766e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Supabase Studio</a>
          </div>
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `Medileo Healthcare <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        subject: `New Inquiry: ${subject} - ${full_name}`,
        html: htmlTemplate,
        reply_to: email
      })
    })

    const resData = await res.json()
    
    if (res.ok) {
      return new Response(JSON.stringify(resData), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      })
    } else {
      console.error("Resend API Error:", resData)
      return new Response(JSON.stringify({ error: resData }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      })
    }

  } catch (error) {
    console.error("Edge Function Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
