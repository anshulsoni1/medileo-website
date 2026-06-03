CREATE TABLE inquiry_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    sent_by UUID NOT NULL REFERENCES auth.users(id),
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inquiry_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" ON inquiry_replies 
    FOR SELECT TO authenticated USING (true);
    
CREATE POLICY "Enable insert access for authenticated users" ON inquiry_replies 
    FOR INSERT TO authenticated WITH CHECK (true);
