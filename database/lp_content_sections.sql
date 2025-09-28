
-- Table to hold content for various sections of the landing page.
-- Using JSONB for text fields allows for storing multiple translations.
-- Example format for a translated field: {"en": "Hello", "ar": "مرحباً"}

CREATE TABLE lp_content_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Identifies the section, e.g., 'hero', 'how_it_works', 'testimonials_section'
    section_key VARCHAR(50) UNIQUE NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    title JSONB, -- e.g., {"en": "How It Works", "ar": "كيف يعمل"}
    subtitle JSONB,
    content TEXT, -- For generic content blocks
    media_url VARCHAR(255), -- For background images or videos
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attaching the timestamp trigger to the table
CREATE TRIGGER update_lp_content_sections_timestamp
    BEFORE UPDATE ON lp_content_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- Sample data for the main sections
INSERT INTO lp_content_sections (section_key, title, subtitle)
VALUES
    (
        'hero',
        '{"en": "The Future of Your Store", "ar": "مستقبل متجرك"}',
        '{"en": "Access a vast database, guided repair protocols, and advanced workshop management tools.", "ar": "وصول فوري لقاعدة بيانات ضخمة، بروتوكولات إصلاح موجهة، وأدوات متقدمة لإدارة ورشتك."}'
    ),
    (
        'features_section',
        '{"en": "Main Features", "ar": "الميزات الرئيسية"}',
        NULL
    ),
    (
        'testimonials_section',
        '{"en": "What Our Clients Say", "ar": "ماذا يقول عملاؤنا"}',
        '{"en": "See what our satisfied technicians and workshop owners are saying.", "ar": "شاهد ماذا يقول عملاؤنا الراضون من الفنيين وأصحاب الورش."}'
    ),
    (
        'faq_section',
        '{"en": "Frequently Asked Questions", "ar": "الأسئلة الشائعة"}',
        '{"en": "Have questions? We have answers.", "ar": "لديك أسئلة؟ لدينا إجابات."}'
    );
