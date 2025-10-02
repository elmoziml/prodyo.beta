-- جدول المنتجات
CREATE TABLE products (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,                  
    description TEXT,                            
    price DECIMAL(10,2) NOT NULL,                
    stock INTEGER NOT NULL DEFAULT 0,            
    category_id BIGINT,                          
    available_options JSONB DEFAULT '{}'::jsonb, 
    images JSONB DEFAULT '[]'::jsonb,            
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_product_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- مثال إدخال
INSERT INTO products (name, description, price, stock, category_id, available_options, images)
VALUES
('هاتف ذكي', 'هاتف حديث مع كاميرا عالية الدقة', 25000, 10, 100000, '{"اللون":"أسود"}', '["/images/phone1.png"]'),
('قميص قطني', 'قميص مريح صيفي', 2000, 30, 100001, '{"المقاس":"L"}', '["/images/shirt1.png"]');
