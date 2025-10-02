-- جدول الفئات
CREATE TABLE categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY, 
    name VARCHAR(100) UNIQUE NOT NULL,      
    description TEXT,                       
    created_at TIMESTAMPTZ DEFAULT NOW()    
);

-- مثال إدخال
INSERT INTO categories (name, description)
VALUES
('إلكترونيات', 'أجهزة وهواتف'),
('ملابس', 'ألبسة رجالية ونسائية');
