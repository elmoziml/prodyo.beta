
-- Table definition for users/staff
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords, not plain text
    role user_role NOT NULL DEFAULT 'Staff',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data for users
INSERT INTO users (full_name, email, password_hash, role)
VALUES
    ('Admin User', 'admin@prodyo.com', 'hashed_password_placeholder_1', 'Admin'),
    ('Staff User', 'staff@prodyo.com', 'hashed_password_placeholder_2', 'Staff');
