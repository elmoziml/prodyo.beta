-- جدول ربط لربط المنتجات والطلبات
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد لعنصر الطلب
    order_id UUID NOT NULL, -- معرف الطلب
    product_id UUID NOT NULL, -- معرف المنتج
    quantity INTEGER NOT NULL CHECK (quantity > 0), -- الكمية (يجب أن تكون أكبر من 0)
    -- تخزين السعر وقت الشراء في حال تغير سعر المنتج لاحقًا
    price_at_purchase DECIMAL(10, 2) NOT NULL, -- السعر عند الشراء
    -- تخزين الخيارات المحددة لهذا العنصر (مثل اللون، الحجم)
    selected_options JSONB, -- الخيارات المحددة

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- بيانات تجريبية لعناصر الطلبات
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, selected_options)
VALUES
    (
        (SELECT id FROM orders WHERE display_id = 'ORD001'), -- الطلب: ORD001
        (SELECT id FROM products WHERE name = 'Classic T-Shirt'), -- المنتج: Classic T-Shirt
        1, -- الكمية
        99.99, -- السعر عند الشراء
        '{"color": "Red", "size": "M"}' -- الخيارات: اللون أحمر، الحجم M
    ),
    (
        (SELECT id FROM orders WHERE display_id = 'ORD002'), -- الطلب: ORD002
        (SELECT id FROM products WHERE name = 'Wireless Headphones'), -- المنتج: Wireless Headphones
        2, -- الكمية
        50.25, -- السعر عند الشراء
        '{"color": "Black"}' -- الخيار: اللون أسود
    ),
    (
        (SELECT id FROM orders WHERE display_id = 'ORD002'), -- الطلب: ORD002
        (SELECT id FROM products WHERE name = 'Leather Wallet'), -- المنتج: Leather Wallet
        1, -- الكمية
        50.00, -- السعر عند الشراء
        '{"size": "L"}' -- الخيار: الحجم L
    );