-- جدول عناصر الطلب
CREATE TABLE order_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY,
    order_id BIGINT NOT NULL,                        
    product_id BIGINT,                               
    quantity INTEGER NOT NULL,                       
    price_at_purchase DECIMAL(10,2) NOT NULL,        
    selected_options JSONB DEFAULT '{}'::jsonb,      
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_item_order FOREIGN KEY (order_id)
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_product FOREIGN KEY (product_id)
        REFERENCES products(id) ON DELETE SET NULL
);

-- مثال إدخال
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, selected_options)
VALUES
(100000, 100000, 1, 25000, '{"اللون":"أسود"}'),
(100000, 100001, 1, 2000, '{"المقاس":"L"}');
