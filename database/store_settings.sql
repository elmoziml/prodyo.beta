
-- A key-value table for storing various store-wide settings
CREATE TABLE store_settings (
    -- The setting key (e.g., 'store_name', 'currency_symbol')
    key VARCHAR(100) PRIMARY KEY,
    -- The setting value
    value TEXT,
    -- An optional description for clarity in the dashboard
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample data for store settings
INSERT INTO store_settings (key, value, description)
VALUES
    ('store_name', 'Prodyo', 'The public name of the store'),
    ('store_slogan', 'Your one-stop shop for quality goods', 'A catchy slogan displayed in the header/footer'),
    ('contact_email', 'support@prodyo.com', 'The primary email for customer support'),
    ('currency_symbol', '$', 'The currency symbol to display for prices'),
    ('currency_code', 'USD', 'The ISO currency code (e.g., USD, EUR)'),
    ('tax_rate', '0.05', 'Default sales tax rate (e.g., 0.05 for 5%)');

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attaching the trigger to the store_settings table
CREATE TRIGGER update_store_settings_timestamp
    BEFORE UPDATE ON store_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();
