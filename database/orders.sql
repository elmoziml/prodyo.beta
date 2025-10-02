-- إنشاء نوع لحالات الطلب
CREATE TYPE order_status AS ENUM (
    'Pending',     -- قيد الانتظار
    'Processing',  -- قيد المعالجة
    'Shipped',     -- تم الشحن
    'Delivered',   -- تم التوصيل
    'Canceled'     -- ملغى
    'Returned'
);

-- جدول الطلبات
CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000 INCREMENT BY 1) PRIMARY KEY,
    display_id VARCHAR(20) UNIQUE NOT NULL,     
    customer_id BIGINT NOT NULL,                
    status order_status NOT NULL DEFAULT 'Pending',
    total_amount DECIMAL(10,2) NOT NULL,        
    order_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_order_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- مثال إدخال
INSERT INTO orders (display_id, customer_id, status, total_amount)
VALUES
('ORD001', 100000, 'Pending', 27000),
('ORD002', 100001, 'Processing', 2000);
