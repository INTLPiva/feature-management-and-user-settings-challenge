CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receive_notifications BOOLEAN NOT NULL DEFAULT false,
    dark_mode BOOLEAN NOT NULL DEFAULT false,
    profile_signature TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO settings (receive_notifications, dark_mode, profile_signature)
SELECT false, false, NULL
WHERE NOT EXISTS (SELECT 1 FROM settings LIMIT 1);

CREATE TABLE IF NOT EXISTS feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flag_key VARCHAR(100) NOT NULL UNIQUE,
    flag_name VARCHAR(255) NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO feature_flags (flag_key, flag_name, is_enabled) VALUES
    ('enable_signature', 'Enable Profile Signature', true),
    ('enable_dark_mode', 'Enable Dark Mode', true),
    ('enable_notifications', 'Enable Notifications', true)
ON CONFLICT (flag_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity TEXT NOT NULL,
    field_name TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    action TEXT NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW()
);
