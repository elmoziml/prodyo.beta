
-- Table definition for product categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data for categories based on products
INSERT INTO categories (name, description)
VALUES
    ('Apparel', 'Clothing and wearable items'),
    ('Electronics', 'Electronic gadgets and accessories'),
    ('Accessories', 'Wallets, bags, and other personal accessories'),
    ('Footwear', 'Shoes and boots for various activities'),
    ('Home Goods', 'Products for home and kitchen');
