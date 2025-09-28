
-- Table definition for orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- A more readable, sequential ID for customer-facing communication
    display_id VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID,
    status order_status NOT NULL DEFAULT 'Pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Sample data for orders
INSERT INTO orders (display_id, customer_id, status, total_amount, order_date)
VALUES
    (
        'ORD001',
        (SELECT id FROM customers WHERE full_name = 'John Doe'),
        'Processing',
        99.99,
        '2024-09-27T10:00:00Z'
    ),
    (
        'ORD002',
        (SELECT id FROM customers WHERE full_name = 'Jane Smith'),
        'Shipped',
        150.50,
        '2024-09-26T14:30:00Z'
    );
