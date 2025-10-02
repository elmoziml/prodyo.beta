-- إنشاء ENUM لأنواع الحركات بالإنجليزية
CREATE TYPE movement_type AS ENUM (
    'INBOUND',    -- إدخال (شراء / توريد)
    'OUTBOUND',   -- إخراج (بيع / استهلاك)
    'RETURN',     -- إرجاع (من عميل أو إلى مورد)
    'TRANSFER',   -- تحويل بين مستودعات
    'ADJUSTMENT'  -- تعديل يدوي (جرد / تلف)
);

-- جدول حركات المخزون
CREATE TABLE inventory_movements (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, -- معرف الحركة
    product_id VARCHAR(50) NOT NULL, -- المنتج المرتبط
    movement movement_type NOT NULL, -- نوع الحركة
    quantity INTEGER NOT NULL, -- الكمية (موجبة للإضافة، سالبة للخصم)
    reference_id VARCHAR(50), -- مرجع الحركة (طلب، فاتورة، إرجاع...)
    note TEXT, -- ملاحظات إضافية
    created_by INT, -- المستخدم الذي قام بالحركة (ربط مع users.id)
    created_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الحركة

    -- العلاقات
    CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_inventory_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- أمثلة إدخال بيانات تجريبية
INSERT INTO inventory_movements (product_id, movement, quantity, reference_id, note, created_by)
VALUES
('prod-1', 'INBOUND', 50, 'purchase-001', 'Stock received from supplier', 100001),
('prod-1', 'OUTBOUND', -2, 'ord-5', 'Sold to customer', 100002),
('prod-1', 'RETURN', 2, 'ret-2', 'Returned from customer', 100002),
('prod-2', 'ADJUSTMENT', -5, NULL, 'Damaged items', 100001),
('prod-2', 'TRANSFER', -10, 'wh-2', 'Transfer to warehouse 2', 100001);
