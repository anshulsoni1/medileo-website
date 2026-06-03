import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { action, entityType, entityId, oldValue, newValue, userId, userEmail } = req.body;

  if (!action || !entityType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({ message: 'Supabase credentials missing' });
    }

    // Bypass RLS to ensure logs are always successfully written
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // We default to the dummy admin user if none provided (for client-side calls where auth.users.id is hard to extract)
    const finalUserId = userId || '00000000-0000-0000-0000-000000000000';
    const finalUserEmail = userEmail || 'admin@medileohealthcare.com';

    const { error } = await supabaseAdmin.from('audit_logs').insert({
      user_id: finalUserId,
      user_email: finalUserEmail,
      action,
      entity_type: entityType,
      entity_id: entityId ? String(entityId) : null,
      old_value: oldValue || null,
      new_value: newValue || null
    });

    if (error) {
      console.error("Supabase Audit Log Error:", error);
      throw error;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Audit API Error:', error);
    // Don't fail the parent request just because audit logging failed
    return res.status(500).json({ message: 'Failed to write audit log' });
  }
}
