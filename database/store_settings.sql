-- جدول إعدادات المتجر
CREATE TABLE store_settings (
    key VARCHAR(100) PRIMARY KEY,         
    value TEXT,                           
    description TEXT,                     
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO store_settings (key, value, description)
VALUES
('store_name', 'متجر فارس', 'اسم المتجر الظاهر للعملاء'),
('currency_symbol', 'د.ج', 'رمز العملة'),
('currency_code', 'DZD', 'كود العملة الدولي'),
('store_email', 'support@faresstore.com', 'البريد الإلكتروني لخدمة العملاء'),
('store_phone', '+213555555555', 'رقم الهاتف الظاهر للعملاء'),
('store_address', 'الجزائر العاصمة - شارع ديدوش مراد', 'عنوان المتجر الرئيسي'),
('store_language', 'ar', 'اللغة الافتراضية للمتجر'),
('timezone', 'Africa/Algiers', 'المنطقة الزمنية للمتجر'),
('logo_url', '/assets/logo.png', 'رابط شعار المتجر'),
('shipping_fee', '500', 'رسوم الشحن الثابتة (بالدينار الجزائري)'),
('free_shipping_threshold', '10000', 'المبلغ الأدنى للحصول على شحن مجاني'),
('tax_rate', '19', 'نسبة الضريبة المضافة %'),
('payment_methods', '["بطاقة بنكية","دفع عند الاستلام","بريد موب"]', 'طرق الدفع المتاحة'),
('return_policy', 'يمكنك إرجاع المنتج خلال 7 أيام بحالته الأصلية', 'سياسة الإرجاع'),
('support_hours', '09:00-18:00', 'أوقات عمل خدمة العملاء'),
('facebook_url', 'https://facebook.com/faresstore', 'رابط صفحة فيسبوك'),
('instagram_url', 'https://instagram.com/faresstore', 'رابط صفحة إنستغرام'),
('whatsapp_number', '+213666666666', 'رقم الواتساب للتواصل المباشر'),
('default_currency_symbol_position', 'right', 'مكان رمز العملة (left أو right)'),
('min_order_amount', '1000', 'الحد الأدنى لقيمة الطلب'),
('max_order_amount', '500000', 'الحد الأقصى لقيمة الطلب'),
('maintenance_mode', 'off', 'وضع الصيانة (on/off)');
INSERT INTO store_settings (key, value, description)
VALUES
-- إعدادات عامة
('enable_reviews', 'on', 'تفعيل تقييمات العملاء على المنتجات (on/off)'),
('enable_wishlist', 'on', 'تفعيل قائمة المفضلة (on/off)'),
('enable_coupons', 'off', 'تفعيل كوبونات الخصم (on/off)'),
('enable_guest_checkout', 'on', 'السماح بالشراء بدون تسجيل حساب (on/off)'),
('enable_product_stock_tracking', 'on', 'تفعيل تتبع المخزون للمنتجات (on/off)'),

-- الشحن والدفع
('enable_free_shipping', 'on', 'تفعيل الشحن المجاني عند تجاوز مبلغ معين (on/off)'),
('enable_cash_on_delivery', 'on', 'تفعيل الدفع عند الاستلام (on/off)'),
('enable_multi_currency', 'off', 'تفعيل تعدد العملات (on/off)'),

-- أمان وحماية
('enable_ssl', 'on', 'إجبار الاتصال عبر HTTPS (on/off)'),
('enable_recaptcha', 'on', 'تفعيل reCAPTCHA في تسجيل الدخول والنماذج (on/off)'),
('enable_two_factor_auth', 'off', 'تفعيل المصادقة الثنائية (on/off)'),

-- التسويق
('enable_email_marketing', 'on', 'تفعيل إرسال رسائل تسويقية بالبريد الإلكتروني (on/off)'),
('enable_sms_notifications', 'off', 'تفعيل الإشعارات عبر الرسائل النصية (on/off)'),
('enable_push_notifications', 'on', 'تفعيل إشعارات المتصفح (on/off)'),

-- تجربة المستخدم
('enable_dark_mode', 'off', 'تفعيل الوضع الليلي في المتجر (on/off)'),
('enable_quick_view', 'on', 'تفعيل عرض سريع للمنتجات (on/off)'),
('enable_related_products', 'on', 'عرض منتجات مشابهة في صفحة المنتج (on/off)'),
('enable_product_zoom', 'on', 'تفعيل تكبير الصور عند المرور عليها (on/off)'),

-- التطوير
('enable_maintenance_mode', 'off', 'تفعيل وضع الصيانة (on/off)'),
('enable_debug_mode', 'off', 'تشغيل وضع التصحيح (on/off)'),
('enable_api_access', 'on', 'تفعيل الوصول إلى API الخاص بالمتجر (on/off)');
