-- جدول لآراء العملاء الفردية في الصفحة المقصودة
CREATE TABLE lp_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للرأي
    display_order INTEGER DEFAULT 0, -- ترتيب العرض
    customer_name VARCHAR(100) NOT NULL, -- اسم العميل
    customer_title JSONB, -- منصب العميل (متعدد اللغات)
    quote JSONB NOT NULL, -- الاقتباس (متعدد اللغات)
    avatar_url VARCHAR(255), -- رابط الصورة الرمزية
    updated_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ آخر تحديث
);

-- ربط Trigger تحديث الطابع الزمني
CREATE TRIGGER update_lp_testimonials_timestamp
    BEFORE UPDATE ON lp_testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- بيانات تجريبية
INSERT INTO lp_testimonials (display_order, customer_name, customer_title, quote)
VALUES
    (
        1, -- ترتيب العرض
        'Mohammed', -- اسم العميل
        '{"en": "ECU Programming Specialist", "ar": "متخصص في برمجة وحدات التحكم الإلكترونية"}', -- منصب العميل
        '{"en": "Diagnostics became 50% faster!", "ar": "أصبحت التشخيص أسرع بنسبة 50%!"}' -- الاقتباس
    ),
    (
        2, -- ترتيب العرض
        'Fatima', -- اسم العميل
        '{"en": "15+ Years of Experience", "ar": "خبرة أكثر من 15 عامًا"}', -- منصب العميل
        '{"en": "Session management made my work easier.", "ar": "إدارة الجلسات سهلت عملي."}' -- الاقتباس
    );