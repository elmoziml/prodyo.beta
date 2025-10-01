# تحديث العملة إلى الدينار الجزائري (دج)

## نظرة عامة
تم تحديث جميع عروض الأسعار في التطبيق لاستخدام العملة الرسمية "دج" (الدينار الجزائري) بدلاً من "$" أو "DA".

## التغييرات المنفذة

### 1. الصفحة الرئيسية العامة
**الملف:** `src/components/public/storefront/ProductCard.tsx`
- **قبل:** `${product.price.toFixed(2)}`
- **بعد:** `{product.price.toFixed(2)} دج`

### 2. صفحة المنتجات (Dashboard)
**الملف:** `src/components/products/ProductsPage.tsx`
- **قبل:** `${product.price.toFixed(2)}`
- **بعد:** `{product.price.toFixed(2)} دج`

### 3. نافذة تفاصيل المنتج (Modal)
**الملف:** `src/components/products/ProductDetailModal.tsx`
- **قبل:** `${product.price.toFixed(2)}`
- **بعد:** `{product.price.toFixed(2)} دج`

### 4. صفحة المنتج العامة
**الملف:** `src/app/[locale]/(public)/products/[id]/page.tsx`
- **قبل:** `DA {product.price.toFixed(2)}`
- **بعد:** `{product.price.toFixed(2)} دج`

### 5. صفحة الطلبات
**الملف:** `src/components/orders/OrdersPage.tsx`
- **قبل:** `DA {order.total_amount.toFixed(2)}`
- **بعد:** `{order.total_amount.toFixed(2)} دج`

### 6. نافذة تفاصيل الطلب
**الملف:** `src/components/orders/OrderDetailModal.tsx`
- **قبل:** `DA {(item.price_at_purchase * item.quantity).toFixed(2)}`
- **بعد:** `{(item.price_at_purchase * item.quantity).toFixed(2)} دج`
- **قبل:** `DA {order.total_amount.toFixed(2)}`
- **بعد:** `{order.total_amount.toFixed(2)} دج`

### 7. إعدادات المتجر
**الملف:** `src/lib/data/store_settings.json`
- **قبل:** `"currency_symbol": "DA"`
- **بعد:** `"currency_symbol": "دج"`
- **currency_code:** `"DZD"` (بدون تغيير - رمز ISO الصحيح)

## الملفات المعدلة

1. ✅ `src/components/public/storefront/ProductCard.tsx`
2. ✅ `src/components/products/ProductsPage.tsx`
3. ✅ `src/components/products/ProductDetailModal.tsx`
4. ✅ `src/app/[locale]/(public)/products/[id]/page.tsx`
5. ✅ `src/components/orders/OrdersPage.tsx`
6. ✅ `src/components/orders/OrderDetailModal.tsx`
7. ✅ `src/lib/data/store_settings.json`

## التنسيق الموحد

### قبل التحديث:
- استخدام `$` في بعض الأماكن
- استخدام `DA` في أماكن أخرى
- عدم اتساق في التنسيق

### بعد التحديث:
- **تنسيق موحد:** `{price} دج`
- **مثال:** `1234.00 دج`
- **العملة تأتي بعد الرقم** (حسب المعيار الجزائري)

## أمثلة العرض

### المنتجات:
- قميص كلاسيكي: **2300.00 دج**
- سماعات لاسلكية: **199.99 دج**
- dfg: **1234.00 دج**

### الطلبات:
- إجمالي الطلب: **5000.00 دج**
- سعر المنتج × الكمية: **1200.00 دج**

## ملاحظات

### ✅ المزايا:
1. **توحيد العملة** في جميع أنحاء التطبيق
2. **استخدام العملة الرسمية** للجزائر
3. **تنسيق صحيح** (الرقم ثم العملة)
4. **دعم اللغة العربية** بشكل كامل

### 📝 التوصيات:
1. إذا كنت تريد استخدام "DZD" بدلاً من "دج"، يمكن تغييره بسهولة
2. يمكن إنشاء دالة مساعدة `formatCurrency()` لتوحيد التنسيق
3. يمكن إضافة دعم لعملات متعددة في المستقبل

## الاختبار

للتحقق من التغييرات:

1. **الصفحة الرئيسية:** http://localhost:3000/ar
   - تحقق من عرض أسعار المنتجات بـ "دج"

2. **صفحة المنتج:** http://localhost:3000/ar/products/[id]
   - تحقق من عرض السعر بـ "دج"

3. **Dashboard - المنتجات:** http://localhost:3000/ar/products
   - تحقق من جدول المنتجات

4. **Dashboard - الطلبات:** http://localhost:3000/ar/orders
   - تحقق من عرض إجمالي الطلبات بـ "دج"

## الخلاصة

✅ تم توحيد العملة في جميع أنحاء التطبيق  
✅ استخدام "دج" كعملة رسمية  
✅ تنسيق موحد ومتسق  
✅ دعم كامل للغة العربية  
✅ تحديث إعدادات المتجر  

العملة الآن موحدة ومتسقة في جميع أنحاء التطبيق! 🎉
