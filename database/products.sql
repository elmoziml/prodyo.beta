
-- Table definition for products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category_id UUID,
    -- JSONB is great for storing variable options like sizes, colors, materials
    available_options JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Sample data for products
-- Note: In a real setup, you would get the UUID for the category first.
-- Here we use a subquery for demonstration.
INSERT INTO products (name, category_id, price, stock, description, available_options)
VALUES
    (
        'Classic T-Shirt',
        (SELECT id FROM categories WHERE name = 'Apparel'),
        25.99,
        150,
        'A high-quality classic t-shirt made from 100% premium cotton. Perfect for everyday wear.',
        '{"colors": ["Red", "Black", "White"], "sizes": ["S", "M", "L", "XL"]}'
    ),
    (
        'Wireless Headphones',
        (SELECT id FROM categories WHERE name = 'Electronics'),
        199.99,
        75,
        'Experience immersive sound with these noise-cancelling wireless headphones. 24-hour battery life.',
        '{"colors": ["Matte Black", "Silver"]}'
    ),
    (
        'Leather Wallet',
        (SELECT id FROM categories WHERE name = 'Accessories'),
        49.50,
        200,
        'A sleek and durable wallet made from genuine leather, featuring multiple card slots and a cash compartment.',
        '{}'
    );
