-- تعريف أنواع بيانات مخصصة (enums) لتحسين سلامة البيانات

-- نوع مخصص لحالة الطلب
CREATE TYPE order_status AS ENUM (
    'Pending', -- قيد الانتظار
    'Processing', -- قيد المعالجة
    'Shipped', -- تم الشحن
    'Delivered', -- تم التوصيل
    'Canceled' -- ملغى
);

-- نوع مخصص لأدوار المستخدمين
CREATE TYPE user_role AS ENUM (
    'Admin', -- مدير
    'Staff', -- موظف
    'Viewer' -- مشاهد
);