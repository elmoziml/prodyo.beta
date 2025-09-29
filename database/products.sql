-- تعريف جدول المنتجات
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للمنتج
    name VARCHAR(255) NOT NULL, -- اسم المنتج
    description TEXT, -- وصف المنتج
    price DECIMAL(10, 2) NOT NULL, -- السعر
    stock INTEGER NOT NULL DEFAULT 0, -- كمية المخزون (الافتراضي: 0)
    category_id UUID, -- معرف الفئة
    images JSONB, -- حقل جديد لتخزين الصور
    -- JSONB ممتاز لتخزين الخيارات المتغيرة مثل الأحجام والألوان والمواد
    available_options JSONB, -- الخيارات المتاحة
    created_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الإنشاء
    updated_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ آخر تحديث

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- بيانات تجريبية للمنتجات
-- ملاحظة: في إعداد حقيقي، ستحصل على UUID للفئة أولاً.
-- هنا نستخدم استعلامًا فرعيًا للتوضيح.
INSERT INTO products (name, category_id, price, stock, description, available_options, images)
VALUES
    (
        'Classic T-Shirt', -- الاسم
        (SELECT id FROM categories WHERE name = 'Apparel'), -- الفئة: ملابس
        25.99, -- السعر
        150, -- المخزون
        'A high-quality classic t-shirt made from 100% premium cotton. Perfect for everyday wear.', -- الوصف
        '{"colors": ["Red", "Black", "White"], "sizes": ["S", "M", "L", "XL"]}', -- الخيارات المتاحة
        '["https://scontent.faae2-1.fna.fbcdn.net/v/t45.5328-4/554799686_1455196619020604_6270212029308033083_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeEv1bZatsjjgP8bE-16psnm8nebl8tlDfHyd5uXy2UN8dWOyFfhEAHiB0IT1segBP95Wv1whQCWHMgl3I1n07lC&_nc_ohc=jgYwSFnYygAQ7kNvwGN2C6Q&_nc_oc=Adky22OczVN7BTvl6EJ6BVA8kRSBEY7GM5HstP31Kpu3LFM80IE54YLiMfVmlSt0AUQ&_nc_zt=23&_nc_ht=scontent.faae2-1.fna&_nc_gid=5Pkol_IKNh1b7wrqD4rJ5Q&oh=00_AfZP56BqmuRgDqjq7KfL4khmvj-J0Pd4c6GSctG-1vMVyQ&oe=68E024EE"]'
    ),
    (
        'Wireless Headphones', -- الاسم
        (SELECT id FROM categories WHERE name = 'Electronics'), -- الفئة: إلكترونيات
        199.99, -- السعر
        75, -- المخزون
        'Experience immersive sound with these noise-cancelling wireless headphones. 24-hour battery life.', -- الوصف
        '{"colors": ["Matte Black", "Silver"]}', -- الخيارات المتاحة
        '["https://scontent.faae2-1.fna.fbcdn.net/v/t45.5328-4/554799686_1455196619020604_6270212029308033083_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeEv1bZatsjjgP8bE-16psnm8nebl8tlDfHyd5uXy2UN8dWOyFfhEAHiB0IT1segBP95Wv1whQCWHMgl3I1n07lC&_nc_ohc=jgYwSFnYygAQ7kNvwGN2C6Q&_nc_oc=Adky22OczVN7BTvl6EJ6BVA8kRSBEY7GM5HstP31Kpu3LFM80IE54YLiMfVmlSt0AUQ&_nc_zt=23&_nc_ht=scontent.faae2-1.fna&_nc_gid=5Pkol_IKNh1b7wrqD4rJ5Q&oh=00_AfZP56BqmuRgDqjq7KfL4khmvj-J0Pd4c6GSctG-1vMVyQ&oe=68E024EE"]'
    ),
    (
        'Leather Wallet', -- الاسم
        (SELECT id FROM categories WHERE name = 'Accessories'), -- الفئة: إكسسوارات
        49.50, -- السعر
        200, -- المخزون
        'A sleek and durable wallet made from genuine leather, featuring multiple card slots and a cash compartment.', -- الوصف
        '{}', -- لا توجد خيارات
        '["https://scontent.faae2-1.fna.fbcdn.net/v/t45.5328-4/554799686_1455196619020604_6270212029308033083_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeEv1bZatsjjgP8bE-16psnm8nebl8tlDfHyd5uXy2UN8dWOyFfhEAHiB0IT1segBP95Wv1whQCWHMgl3I1n07lC&_nc_ohc=jgYwSFnYygAQ7kNvwGN2C6Q&_nc_oc=Adky22OczVN7BTvl6EJ6BVA8kRSBEY7GM5HstP31Kpu3LFM80IE54YLiMfVmlSt0AUQ&_nc_zt=23&_nc_ht=scontent.faae2-1.fna&_nc_gid=5Pkol_IKNh1b7wrqD4rJ5Q&oh=00_AfZP56BqmuRgDqjq7KfL4khmvj-J0Pd4c6GSctG-1vMVyQ&oe=68E024EE"]'
    );