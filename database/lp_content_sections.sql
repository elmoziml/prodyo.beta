-- جدول لتخزين محتوى الأقسام المختلفة في الصفحة المقصودة.
-- استخدام JSONB لحقول النص يسمح بتخزين ترجمات متعددة.
-- مثال على تنسيق حقل مترجم: {"en": "Hello", "ar": "مرحباً"}

CREATE TABLE lp_content_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للقسم
    -- يحدد القسم، على سبيل المثال 'hero', 'how_it_works', 'testimonials_section'
    section_key VARCHAR(50) UNIQUE NOT NULL, -- مفتاح القسم (فريد)
    is_visible BOOLEAN DEFAULT TRUE, -- هل القسم مرئي؟
    title JSONB, -- العنوان (متعدد اللغات)
    subtitle JSONB, -- العنوان الفرعي (متعدد اللغات)
    content TEXT, -- للمحتوى النصي العام
    media_url VARCHAR(255), -- لصور الخلفية أو الفيديوهات
    updated_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ آخر تحديث
);

-- ربط Trigger تحديث الطابع الزمني بالجدول
CREATE TRIGGER update_lp_content_sections_timestamp
    BEFORE UPDATE ON lp_content_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- بيانات تجريبية للأقسام الرئيسية
INSERT INTO lp_content_sections (section_key, title, subtitle)
VALUES
    (
        'hero', -- مفتاح القسم: هيرو
        '{"en": "The Future of Your Store", "ar": "مستقبل متجرك"}', -- العنوان
        '{"en": "Access a vast database, guided repair protocols, and advanced workshop management tools.", "ar": "وصول فوري لقاعدة بيانات ضخمة، بروتوكولات إصلاح موجهة، وأدوات متقدمة لإدارة ورشتك."}' -- العنوان الفرعي
    ),
    (
        'features_section', -- مفتاح القسم: الميزات
        '{"en": "Main Features", "ar": "الميزات الرئيسية"}', -- العنوان
        NULL -- لا يوجد عنوان فرعي
    ),
    (
        'testimonials_section', -- مفتاح القسم: آراء العملاء
        '{"en": "What Our Clients Say", "ar": "ماذا يقول عملاؤنا"}', -- العنوان
        '{"en": "See what our satisfied technicians and workshop owners are saying.", "ar": "شاهد ماذا يقول عملاؤنا الراضون من الفنيين وأصحاب الورش."}' -- العنوان الفرعي
    ),
    (
        'faq_section', -- مفتاح القسم: الأسئلة الشائعة
        '{"en": "Frequently Asked Questions", "ar": "الأسئلة الشائعة"}', -- العنوان
        '{"en": "Have questions? We have answers.", "ar": "لديك أسئلة؟ لدينا إجابات."}' -- العنوان الفرعي
    );