-- تعريف جدول المستخدمين/الموظفين
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للمستخدم
    full_name VARCHAR(100) NOT NULL, -- الاسم الكامل
    email VARCHAR(100) UNIQUE NOT NULL, -- البريد الإلكتروني (فريد)
    password_hash VARCHAR(255) NOT NULL, -- تخزين كلمات المرور المجزأة (hashed)، وليس النص العادي
    role user_role NOT NULL DEFAULT 'Staff', -- دور المستخدم (الافتراضي: موظف)
    created_at TIMESTAMPTZ DEFAULT NOW(), -- تاريخ الإنشاء
    updated_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ آخر تحديث
);

-- بيانات تجريبية للمستخدمين
INSERT INTO users (full_name, email, password_hash, role)
VALUES
    ('Admin User', 'admin@prodyo.com', 'hashed_password_placeholder_1', 'Admin'), -- مستخدم مدير
    ('Staff User', 'staff@prodyo.com', 'hashed_password_placeholder_2', 'Staff'); -- مستخدم موظف