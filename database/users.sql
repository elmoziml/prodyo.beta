-- إنشاء نوع مخصص لأدوار المستخدمين
CREATE TYPE user_role AS ENUM (
    'Admin',   -- مدير
    'Staff',   -- موظف
    'Viewer'   -- مشاهد
);

-- جدول المستخدمين
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY, -- رقم مكون من 6 أرقام
    full_name VARCHAR(100) NOT NULL,           
    email VARCHAR(100) UNIQUE NOT NULL,        
    password VARCHAR(255) NOT NULL,            
    role user_role NOT NULL DEFAULT 'Staff',   
    created_at TIMESTAMPTZ DEFAULT NOW(),      
    updated_at TIMESTAMPTZ DEFAULT NOW()       
);

-- مثال إدخال
INSERT INTO users (full_name, email, password, role)
VALUES 
('فارس محمد', 'fares@example.com', '12345', 'Admin'),
('أحمد بن علي', 'ahmed@example.com', '12345', 'Staff');
