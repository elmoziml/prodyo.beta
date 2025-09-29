-- تعريف جدول العملاء
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للعميل
    full_name VARCHAR(100) NOT NULL, -- الاسم الكامل للعميل
    email VARCHAR(100) UNIQUE, -- البريد الإلكتروني (فريد)
    phone VARCHAR(50), -- رقم الهاتف
    address TEXT, -- العنوان
    created_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ إنشاء الحساب
);

-- بيانات تجريبية للعملاء من الطلبات
INSERT INTO customers (full_name, email)
VALUES
    ('John Doe', 'john.doe@example.com'), -- جون دو
    ('Jane Smith', 'jane.smith@example.com'), -- جين سميث
    ('Sam Wilson', 'sam.wilson@example.com'); -- سام ويلسون