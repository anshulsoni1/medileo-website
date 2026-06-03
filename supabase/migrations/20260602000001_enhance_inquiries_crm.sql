-- Enhance inquiry_replies with audit and delivery status fields
ALTER TABLE inquiry_replies ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'pending';
ALTER TABLE inquiry_replies ADD COLUMN IF NOT EXISTS error_message TEXT;
ALTER TABLE inquiry_replies ADD COLUMN IF NOT EXISTS sent_by_email TEXT;

-- Create inquiry_notes table for internal team communication
CREATE TABLE IF NOT EXISTS inquiry_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES auth.users(id),
    admin_email TEXT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inquiry_notes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'inquiry_notes' AND policyname = 'Enable read access for authenticated users'
    ) THEN
        CREATE POLICY "Enable read access for authenticated users" ON inquiry_notes FOR SELECT TO authenticated USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'inquiry_notes' AND policyname = 'Enable insert access for authenticated users'
    ) THEN
        CREATE POLICY "Enable insert access for authenticated users" ON inquiry_notes FOR INSERT TO authenticated WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'inquiry_notes' AND policyname = 'Enable update access for authenticated users'
    ) THEN
        CREATE POLICY "Enable update access for authenticated users" ON inquiry_notes FOR UPDATE TO authenticated USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'inquiry_notes' AND policyname = 'Enable delete access for authenticated users'
    ) THEN
        CREATE POLICY "Enable delete access for authenticated users" ON inquiry_notes FOR DELETE TO authenticated USING (true);
    END IF;
END $$;
