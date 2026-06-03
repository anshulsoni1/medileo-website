import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { inquiryId, assignedTo, adminId, adminEmail } = req.body;

  if (!inquiryId) {
    return res.status(400).json({ message: 'Missing inquiryId' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("[SYSTEM_ASSIGN] WARNING: Supabase credentials missing.");
      return res.status(500).json({ message: 'Supabase credentials missing in server environment.' });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // 1. Fetch the user details we are assigning to
    let assignedUserName = "Unassigned";
    let assignedUserEmail = "";
    if (assignedTo) {
        const { data: user } = await supabaseAdmin.from('admin_users').select('full_name, email').eq('id', assignedTo).single();
        if (user) {
            assignedUserName = user.full_name || user.email;
            assignedUserEmail = user.email;
        }
    }

    // 2. Update the inquiry
    const { data: inquiryData, error: updateError } = await supabaseAdmin
      .from('inquiries')
      .update({ assigned_to: assignedTo || null })
      .eq('id', inquiryId)
      .select()
      .single();

    if (updateError) throw updateError;

    // 3. Create an internal note for the audit trail
    const noteText = assignedTo ? `Lead assigned to ${assignedUserName} (${assignedUserEmail})` : 'Lead was unassigned.';
    const actorId = adminId || '00000000-0000-0000-0000-000000000000';
    
    const { error: noteError } = await supabaseAdmin.from('inquiry_notes').insert({
        inquiry_id: inquiryId,
        admin_id: actorId,
        admin_email: adminEmail || 'System Auto-Log',
        note: `[SYSTEM] ${noteText}`
    });

    if (noteError) console.error("Failed to insert assignment note:", noteError);

    // 4. Create Audit Log
    const { error: auditError } = await supabaseAdmin.from('audit_logs').insert({
      user_id: actorId,
      user_email: adminEmail || 'admin@medileohealthcare.com',
      action: 'ASSIGN_LEAD',
      entity_type: 'INQUIRY',
      entity_id: inquiryId,
      new_value: { assigned_to: assignedTo || null, assignee_name: assignedUserName }
    });
    if (auditError) console.error("Failed to insert audit log:", auditError);

    return res.status(200).json({ success: true, data: inquiryData });
  } catch (error) {
    console.error('Assign API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
