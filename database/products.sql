-- تعريف جدول المنتجات
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للمنتج
    name VARCHAR(255) NOT NULL, -- اسم المنتج
    description TEXT, -- وصف المنتج
    price DECIMAL(10, 2) NOT NULL, -- السعر
    stock INTEGER NOT NULL DEFAULT 0, -- كمية المخزون (الافتراضي: 0)
    category_id UUID, -- معرف الفئة
    -- JSONB ممتاز لتخزين الخيارات المتغيرة مثل الأحجام والألوان والمواد
    available_options JSONB, -- الخيارات المتاحة
    created_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الإنشاء
    updated_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ آخر تحديث

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- بيانات تجريبية للمنتجات
-- ملاحظة: في إعداد حقيقي، ستحصل على UUID للفئة أولاً.
-- هنا نستخدم استعلامًا فرعيًا للتوضيح.
INSERT INTO products (name, category_id, price, stock, description, available_options)
VALUES
    (
        'Classic T-Shirt', -- الاسم
        (SELECT id FROM categories WHERE name = 'Apparel'), -- الفئة: ملابس
        25.99, -- السعر
        150, -- المخزون
        'A high-quality classic t-shirt made from 100% premium cotton. Perfect for everyday wear.', -- الوصف
        '{"colors": ["Red", "Black", "White"], "sizes": ["S", "M", "L", "XL"]}' -- الخيارات المتاحة
    ),
    (
        'Wireless Headphones', -- الاسم
        (SELECT id FROM categories WHERE name = 'Electronics'), -- الفئة: إلكترونيات
        199.99, -- السعر
        75, -- المخزون
        'Experience immersive sound with these noise-cancelling wireless headphones. 24-hour battery life.', -- الوصف
        '{"colors": ["Matte Black", "Silver"]}' -- الخيارات المتاحة
    ),
    (
        'Leather Wallet', -- الاسم
        (SELECT id FROM categories WHERE name = 'Accessories'), -- الفئة: إكسسوارات
        49.50, -- السعر
        200, -- المخزون
        'A sleek and durable wallet made from genuine leather, featuring multiple card slots and a cash compartment.', -- الوصف
        '{}' -- لا توجد خيارات
    );