-- جدول العملاء
CREATE TABLE customers (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY, 
    full_name VARCHAR(100) NOT NULL,         
    phone VARCHAR(50),                       
    address TEXT,                            
    created_at TIMESTAMPTZ DEFAULT NOW()     
);

-- مثال إدخال
INSERT INTO customers (full_name, phone, address)
VALUES
('يوسف بن عمر', '0555555555', 'الجزائر العاصمة'),
('ليلى عبد الرحمن', '0666666666', 'وهران');
