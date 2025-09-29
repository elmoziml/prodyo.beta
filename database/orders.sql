-- تعريف جدول الطلبات
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للطلب
    -- معرف تسلسلي أكثر قابلية للقراءة للتواصل مع العملاء
    display_id VARCHAR(20) UNIQUE NOT NULL, -- المعرف المعروض للطلب (فريد)
    customer_id UUID, -- معرف العميل
    status order_status NOT NULL DEFAULT 'Pending', -- حالة الطلب (الافتراضي: قيد الانتظار)
    total_amount DECIMAL(10, 2) NOT NULL, -- المبلغ الإجمالي
    order_date TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الطلب
    created_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الإنشاء
    updated_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ آخر تحديث

    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- بيانات تجريبية للطلبات
INSERT INTO orders (display_id, customer_id, status, total_amount, order_date)
VALUES
    (
        'ORD001', -- المعرف المعروض
        (SELECT id FROM customers WHERE full_name = 'John Doe'), -- العميل: John Doe
        'Processing', -- الحالة: قيد المعالجة
        99.99, -- المبلغ الإجمالي
        '2024-09-27T10:00:00Z' -- تاريخ الطلب
    ),
    (
        'ORD002', -- المعرف المعروض
        (SELECT id FROM customers WHERE full_name = 'Jane Smith'), -- العميل: Jane Smith
        'Shipped', -- الحالة: تم الشحن
        150.50, -- المبلغ الإجمالي
        '2024-09-26T14:30:00Z' -- تاريخ الطلب
    );