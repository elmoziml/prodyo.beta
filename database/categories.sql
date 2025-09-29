-- تعريف جدول فئات المنتجات
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للفئة
    name VARCHAR(100) UNIQUE NOT NULL, -- اسم الفئة (فريد)
    description TEXT, -- وصف الفئة
    created_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ إنشاء الفئة
);

-- بيانات تجريبية لفئات المنتجات بناءً على المنتجات
INSERT INTO categories (name, description)
VALUES
    ('Apparel', 'Clothing and wearable items'), -- الملابس: ملابس وأصناف قابلة للارتداء
    ('Electronics', 'Electronic gadgets and accessories'), -- الإلكترونيات: أجهزة إلكترونية وملحقاتها
    ('Accessories', 'Wallets, bags, and other personal accessories'), -- الإكسسوارات: محافظ، حقائب، وإكسسوارات شخصية أخرى
    ('Footwear', 'Shoes and boots for various activities'), -- الأحذية: أحذية وجزم لمختلف الأنشطة
    ('Home Goods', 'Products for home and kitchen'); -- سلع منزلية: منتجات للمنزل والمطبخ