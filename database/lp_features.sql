
-- Table for individual feature items on the landing page
CREATE TABLE lp_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_order INTEGER DEFAULT 0,
    -- Class name from an icon library like FontAwesome or an SVG identifier
    icon_identifier VARCHAR(50),
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attaching the timestamp trigger
CREATE TRIGGER update_lp_features_timestamp
    BEFORE UPDATE ON lp_features
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- Sample data
INSERT INTO lp_features (display_order, icon_identifier, title, description)
VALUES
    (
        1,
        'database_icon',
        '{"en": "DTC Database", "ar": "قاعدة بيانات أكواد الأعطال"}',
        '{"en": "Comprehensive coverage of OBD-II and manufacturer-specific codes.", "ar": "تغطية شاملة لأكواد OBD-II والخاصة بالمصنعين."}'
    ),
    (
        2,
        'protocol_icon',
        '{"en": "Guided Repair Protocols", "ar": "بروتوكولات الإصلاح الموجهة"}',
        '{"en": "Detailed steps with live data and diagrams.", "ar": "خطوات تفصيلية مع بيانات مباشرة ومخططات."}'
    ),
    (
        3,
        'session_icon',
        '{"en": "Repair Session Management", "ar": "إدارة جلسات الإصلاح"}',
        '{"en": "Visual log and cost tracking.", "ar": "سجل بصري وتتبع التكلفة."}'
    );
