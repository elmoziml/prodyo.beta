-- جدول بنظام "مفتاح-قيمة" لتخزين إعدادات المتجر المختلفة
CREATE TABLE store_settings (
    -- مفتاح الإعداد (مثلاً، 'store_name', 'currency_symbol')
    key VARCHAR(100) PRIMARY KEY, -- المفتاح
    -- قيمة الإعداد
    value TEXT, -- القيمة
    -- وصف اختياري للتوضيح في لوحة التحكم
    description TEXT, -- الوصف
    updated_at TIMESTAMPTZ DEFAULT NOW() -- تاريخ آخر تحديث
);

-- بيانات تجريبية لإعدادات المتجر
INSERT INTO store_settings (key, value, description)
VALUES
    ('store_name', 'Prodyo', 'The public name of the store'), -- اسم المتجر
    ('store_slogan', 'Your one-stop shop for quality goods', 'A catchy slogan displayed in the header/footer'), -- شعار المتجر
    ('contact_email', 'support@prodyo.com', 'The primary email for customer support'), -- بريد الدعم الفني
    ('currency_symbol', '$', 'The currency symbol to display for prices'), -- رمز العملة
    ('currency_code', 'USD', 'The ISO currency code (e.g., USD, EUR)'), -- كود العملة
    ('tax_rate', '0.05', 'Default sales tax rate (e.g., 0.05 for 5%)'); -- نسبة الضريبة

-- دالة لتحديث الطابع الزمني updated_at تلقائيًا
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ربط الـ Trigger بجدول store_settings
CREATE TRIGGER update_store_settings_timestamp
    BEFORE UPDATE ON store_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();