
-- جدول معلومات المنتجات الرقمية المرتبطة بجدول products
CREATE TABLE digital_products (
  product_id BIGINT PRIMARY KEY, -- نفس المعرف في products
  download_url TEXT,             -- رابط التحميل (قد يكون مؤقتاً)
  file_size_bytes BIGINT,        -- حجم الملف بالبايت
  mime_type VARCHAR(255),        -- نوع الملف
  file_hash VARCHAR(255),        -- تجزئة الملف للتحقق
  license_key_template TEXT,     -- قالب مفتاح الترخيص إن وجد
  download_limit INT DEFAULT 0,  -- عدد مرات التحميل المسموح بها (0 لغير محدد)
  expires_at TIMESTAMPTZ,        -- تاريخ انتهاء صلاحية الرابط/المنتج إن وجد
  access_duration_days INT,      -- مدة الوصول بعد الشراء بالأيام إن وجد
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_digital_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);