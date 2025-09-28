
-- Table for individual testimonials on the landing page
CREATE TABLE lp_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_order INTEGER DEFAULT 0,
    customer_name VARCHAR(100) NOT NULL,
    customer_title JSONB, -- e.g., {"en": "CEO of Company", "ar": "الرئيس التنفيذي"}
    quote JSONB NOT NULL,
    avatar_url VARCHAR(255),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attaching the timestamp trigger
CREATE TRIGGER update_lp_testimonials_timestamp
    BEFORE UPDATE ON lp_testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- Sample data
INSERT INTO lp_testimonials (display_order, customer_name, customer_title, quote)
VALUES
    (
        1,
        'Mohammed',
        '{"en": "ECU Programming Specialist", "ar": "متخصص في برمجة وحدات التحكم الإلكترونية"}',
        '{"en": "Diagnostics became 50% faster!", "ar": "أصبحت التشخيص أسرع بنسبة 50%!"}'
    ),
    (
        2,
        'Fatima',
        '{"en": "15+ Years of Experience", "ar": "خبرة أكثر من 15 عامًا"}',
        '{"en": "Session management made my work easier.", "ar": "إدارة الجلسات سهلت عملي."}'
    );
