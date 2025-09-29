-- نوع مخصص لنوع حركة المخزون
CREATE TYPE inventory_movement_type AS ENUM (
    'stock_in',      -- استلام مخزون جديد من مورد
    'sale',            -- بيع مخزون من خلال طلب
    'return',          -- إرجاع مخزون من قبل عميل
    'adjustment_in',   -- زيادة يدوية (مثلاً، العثور على مخزون)
    'adjustment_out'   -- تخفيض يدوي (مثلاً، بضاعة تالفة)
);

-- جدول لتتبع كل حركة مخزون لكل منتج
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للحركة
    product_id UUID NOT NULL, -- معرف المنتج المرتبط
    type inventory_movement_type NOT NULL, -- نوع الحركة
    -- التغيير في الكمية. يمكن أن يكون موجبًا (stock_in) أو سالبًا (sale)
    quantity_change INTEGER NOT NULL, -- مقدار التغيير في الكمية
    reason TEXT, -- سبب اختياري للتعديلات اليدوية
    related_order_id UUID, -- رابط اختياري لطلب معين لعمليات البيع/الإرجاع
    movement_date TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الحركة

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (related_order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- دالة Trigger لتحديث عمود products.stock تلقائيًا
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET stock = stock + NEW.quantity_change
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ربط الـ Trigger بجدول inventory_movements
CREATE TRIGGER inventory_movements_after_insert
    AFTER INSERT ON inventory_movements
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stock();

-- بيانات تجريبية: المخزون الأولي لمنتج "Classic T-Shirt"
INSERT INTO inventory_movements (product_id, type, quantity_change, reason)
VALUES
    (
        (SELECT id FROM products WHERE name = 'Classic T-Shirt'), -- المنتج: Classic T-Shirt
        'stock_in', -- النوع: إدخال مخزون
        150, -- الكمية: 150
        'Initial stock count' -- السبب: جرد المخزون الأولي
    );