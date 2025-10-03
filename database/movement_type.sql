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
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY, -- معرف الحركة
    product_id BIGINT NOT NULL, -- المنتج المرتبط (غيرنا إلى BIGINT ليتوافق مع products.id)
    movement movement_type NOT NULL, -- نوع الحركة
    quantity INTEGER NOT NULL, -- الكمية (موجبة للإضافة، سالبة للخصم)
    price DECIMAL(10,2) NOT NULL DEFAULT 0, -- سعر الوحدة للحركة
    reference_id VARCHAR(50), -- مرجع الحركة (طلب، فاتورة، إرجاع...)
    note TEXT, -- ملاحظات إضافية
    created_by INT, -- المستخدم الذي قام بالحركة (ربط مع users.id)
    created_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الحركة
    CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_inventory_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- أمثلة إدخال بيانات تجريبية
INSERT INTO inventory_movements (product_id, movement, quantity, price, reference_id, note, created_by)
VALUES
(100000, 'INBOUND', 50, 25000.00, 'purchase-001', 'Stock received from supplier', 100001),
(100000, 'OUTBOUND', -2, 25000.00, 'ord-5', 'Sold to customer', 100002),
(100000, 'RETURN', 2, 25000.00, 'ret-2', 'Returned from customer', 100002),
(100001, 'ADJUSTMENT', -5, 2000.00, NULL, 'Damaged items', 100001),
(100001, 'TRANSFER', -10, 2000.00, 'wh-2', 'Transfer to warehouse 2', 100001);
