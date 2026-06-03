-- Create admin_users table to mirror auth.users for relation tracking
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" ON admin_users 
    FOR SELECT TO authenticated USING (true);
    
-- Add assigned_to field to inquiries
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL;

-- Insert a dummy admin user for demonstration purposes (you should map this to your real auth user IDs)
INSERT INTO admin_users (id, email, full_name) 
VALUES 
    ('00000000-0000-0000-0000-000000000000', 'admin@medileohealthcare.com', 'System Admin'),
    ('11111111-1111-1111-1111-111111111111', 'sarah.sales@medileohealthcare.com', 'Sarah Connor'),
    ('22222222-2222-2222-2222-222222222222', 'john.sales@medileohealthcare.com', 'John Smith')
ON CONFLICT (id) DO NOTHING;
