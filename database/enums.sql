
-- Define custom enum types for better data integrity

-- Enum for order status
CREATE TYPE order_status AS ENUM (
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Canceled'
);

-- Enum for user roles
CREATE TYPE user_role AS ENUM (
    'Admin',
    'Staff',
    'Viewer'
);
