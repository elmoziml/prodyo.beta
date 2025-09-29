-- جدول لعناصر الميزات الفردية في الصفحة المقصودة
CREATE TABLE lp_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- المعرف الفريد للميزة
    display_order INTEGER DEFAULT 0, -- ترتيب العرض
    -- اسم كلاس من مكتبة أيقونات مثل FontAwesome أو معرف SVG
    icon_identifier VARCHAR(50), -- معرف الأيقونة
    title JSONB NOT NULL, -- العنوان (متعدد اللغات)
    description JSONB NOT NULL, -- الوصف (متعدد اللغات)
    updated_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ آخر تحديث
);

-- ربط Trigger تحديث الطابع الزمني
CREATE TRIGGER update_lp_features_timestamp
    BEFORE UPDATE ON lp_features
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- بيانات تجريبية
INSERT INTO lp_features (display_order, icon_identifier, title, description)
VALUES
    (
        1, -- ترتيب العرض
        'database_icon', -- معرف الأيقونة
        '{"en": "DTC Database", "ar": "قاعدة بيانات أكواد الأعطال"}', -- العنوان
        '{"en": "Comprehensive coverage of OBD-II and manufacturer-specific codes.", "ar": "تغطية شاملة لأكواد OBD-II والخاصة بالمصنعين."}' -- الوصف
    ),
    (
        2, -- ترتيب العرض
        'protocol_icon', -- معرف الأيقونة
        '{"en": "Guided Repair Protocols", "ar": "بروتوكولات الإصلاح الموجهة"}', -- العنوان
        '{"en": "Detailed steps with live data and diagrams.", "ar": "خطوات تفصيلية مع بيانات مباشرة ومخططات."}' -- الوصف
    ),
    (
        3, -- ترتيب العرض
        'session_icon', -- معرف الأيقونة
        '{"en": "Repair Session Management", "ar": "إدارة جلسات الإصلاح"}', -- العنوان
        '{"en": "Visual log and cost tracking.", "ar": "سجل بصري وتتبع التكلفة."}' -- الوصف
    );