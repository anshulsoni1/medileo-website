import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ message: 'Supabase credentials missing' });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    if (req.method === 'POST') {
      // Add a new note
      const { inquiryId, note, adminEmail } = req.body;
      if (!inquiryId || !note) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const adminId = req.body.adminId || '00000000-0000-0000-0000-000000000000';

      const { data, error } = await supabaseAdmin.from('inquiry_notes').insert({
        inquiry_id: inquiryId,
        admin_id: adminId,
        admin_email: adminEmail || 'admin@medileohealthcare.com',
        note: note
      }).select().single();

      if (error) throw error;
      return res.status(200).json({ success: true, data });

    } else if (req.method === 'PUT') {
      // Edit an existing note
      const { noteId, newNote } = req.body;
      if (!noteId || !newNote) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const { data, error } = await supabaseAdmin.from('inquiry_notes').update({
        note: newNote
      }).eq('id', noteId).select().single();

      if (error) throw error;
      return res.status(200).json({ success: true, data });

    } else if (req.method === 'DELETE') {
      // Delete a note
      const { noteId } = req.body;
      if (!noteId) {
        return res.status(400).json({ message: 'Missing noteId' });
      }

      const { error } = await supabaseAdmin.from('inquiry_notes').delete().eq('id', noteId);

      if (error) throw error;
      return res.status(200).json({ success: true });

    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Notes API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
