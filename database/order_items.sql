
-- Junction table to link products and orders
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    -- Store the price at the time of purchase in case the product price changes later
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    -- Store the specific options chosen for this item (e.g., color, size)
    selected_options JSONB,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Sample data for order items
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, selected_options)
VALUES
    (
        (SELECT id FROM orders WHERE display_id = 'ORD001'),
        (SELECT id FROM products WHERE name = 'Classic T-Shirt'),
        1,
        99.99,
        '{"color": "Red", "size": "M"}'
    ),
    (
        (SELECT id FROM orders WHERE display_id = 'ORD002'),
        (SELECT id FROM products WHERE name = 'Wireless Headphones'),
        2,
        50.25,
        '{"color": "Black"}'
    ),
    (
        (SELECT id FROM orders WHERE display_id = 'ORD002'),
        (SELECT id FROM products WHERE name = 'Leather Wallet'),
        1,
        50.00,
        '{"size": "L"}'
    );
