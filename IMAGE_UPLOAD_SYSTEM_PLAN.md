# 📸 خطة نظام رفع وتخزين الصور

## 🎯 الهدف
تحويل نظام الصور من روابط خارجية إلى نظام رفع وتخزين محلي باستخدام `fs` (File System).

---

## 📊 تحليل الوضع الحالي

### ✅ ما هو موجود:
1. **AddProductForm.tsx**: يستقبل روابط الصور فقط (URL)
2. **EditProductForm.tsx**: يعدل روابط الصور
3. **API Route** (`/api/products/route.ts`): يستخدم `fs` لقراءة/كتابة `products.json`
4. **مجلد public**: يحتوي على `g19-5.png` فقط
5. **products.json**: يخزن مسارات الصور كـ strings

### ❌ ما هو مفقود:
1. نظام رفع الملفات (File Upload)
2. مجلدات لتخزين الصور
3. API endpoint لرفع الصور
4. مكون لاختيار الملفات بدلاً من إدخال روابط
5. نظام حذف الصور من الملفات

---

## 🏗️ البنية المقترحة

### 📁 هيكل المجلدات الجديد

```
/home/fares/for-work/Elmoziml/prodyo.beta/
├── public/
│   └── uploads/                    # مجلد رئيسي للصور المرفوعة
│       └── products/               # مجلد المنتجات
│           ├── prod-1234567890/    # مجلد لكل منتج (ID)
│           │   ├── image-1.jpg
│           │   ├── image-2.jpg
│           │   └── image-3.png
│           ├── prod-9876543210/
│           │   ├── main.jpg
│           │   └── thumb.jpg
│           └── .gitkeep
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── products/
│   │       │   ├── route.ts              # موجود (سيتم تعديله)
│   │       │   ├── [id]/
│   │       │   │   └── route.ts          # موجود (سيتم تعديله)
│   │       │   └── upload/
│   │       │       └── route.ts          # جديد - رفع الصور
│   │       └── images/
│   │           └── [productId]/
│   │               └── [imageId]/
│   │                   └── route.ts      # جديد - حذف صورة
│   ├── components/
│   │   └── products/
│   │       ├── AddProductForm.tsx        # سيتم تعديله
│   │       ├── EditProductForm.tsx       # سيتم تعديله
│   │       └── ImageUploader.tsx         # جديد - مكون رفع الصور
│   ├── lib/
│   │   └── utils/
│   │       └── fileUpload.ts             # جديد - دوال مساعدة
│   └── types/
│       └── index.ts                      # سيتم تعديله
```

---

## 🔧 المكونات المطلوبة

### 1️⃣ **API Endpoint لرفع الصور**
**المسار:** `/api/products/upload/route.ts`

**الوظيفة:**
- استقبال ملفات الصور (multipart/form-data)
- التحقق من نوع الملف (jpg, png, webp, gif)
- التحقق من حجم الملف (max 5MB)
- إنشاء مجلد للمنتج إذا لم يكن موجوداً
- حفظ الصورة في المجلد
- إرجاع مسار الصورة

**المدخلات:**
```typescript
{
  productId: string,      // ID المنتج
  file: File,            // الملف
  imageIndex?: number    // رقم الصورة (اختياري)
}
```

**المخرجات:**
```typescript
{
  success: true,
  imagePath: "/uploads/products/prod-123/image-1.jpg",
  imageUrl: "http://localhost:3000/uploads/products/prod-123/image-1.jpg"
}
```

---

### 2️⃣ **API Endpoint لحذف الصور**
**المسار:** `/api/images/[productId]/[imageId]/route.ts`

**الوظيفة:**
- حذف الصورة من الملفات
- تحديث `products.json` لإزالة مسار الصورة
- حذف المجلد إذا كان فارغاً

**المدخلات:**
```typescript
{
  productId: string,
  imageId: string  // اسم الملف
}
```

**المخرجات:**
```typescript
{
  success: true,
  message: "Image deleted successfully"
}
```

---

### 3️⃣ **مكون ImageUploader**
**المسار:** `src/components/products/ImageUploader.tsx`

**الوظيفة:**
- عرض منطقة Drag & Drop
- معاينة الصور قبل الرفع
- عرض الصور المرفوعة مع زر حذف
- دعم رفع متعدد
- عرض progress bar أثناء الرفع

**الواجهة:**
```tsx
interface ImageUploaderProps {
  productId: string;
  images: string[];           // الصور الحالية
  onImagesChange: (images: string[]) => void;
  maxImages?: number;         // الحد الأقصى (default: 10)
  maxSizeInMB?: number;       // الحجم الأقصى (default: 5)
}
```

---

### 4️⃣ **دوال مساعدة (Utilities)**
**المسار:** `src/lib/utils/fileUpload.ts`

**الدوال:**

```typescript
// التحقق من نوع الملف
export function isValidImageType(file: File): boolean;

// التحقق من حجم الملف
export function isValidImageSize(file: File, maxSizeInMB: number): boolean;

// إنشاء اسم فريد للملف
export function generateUniqueFileName(originalName: string): string;

// إنشاء مجلد إذا لم يكن موجوداً
export function ensureDirectoryExists(dirPath: string): void;

// حذف مجلد إذا كان فارغاً
export function deleteEmptyDirectory(dirPath: string): void;

// حذف جميع صور منتج
export function deleteProductImages(productId: string): Promise<void>;
```

---

## 📝 خطوات التنفيذ (بالترتيب)

### المرحلة 1: البنية التحتية ⚙️

#### ✅ الخطوة 1.1: إنشاء المجلدات
```bash
mkdir -p public/uploads/products
touch public/uploads/products/.gitkeep
```

#### ✅ الخطوة 1.2: إنشاء ملف الدوال المساعدة
- إنشاء `src/lib/utils/fileUpload.ts`
- إضافة جميع الدوال المساعدة

#### ✅ الخطوة 1.3: تحديث Types
- إضافة interfaces جديدة في `src/types/index.ts`

---

### المرحلة 2: API Endpoints 🔌

#### ✅ الخطوة 2.1: إنشاء Upload API
- إنشاء `/api/products/upload/route.ts`
- دعم multipart/form-data
- حفظ الملفات في المجلدات

#### ✅ الخطوة 2.2: إنشاء Delete Image API
- إنشاء `/api/images/[productId]/[imageId]/route.ts`
- حذف الملف + تحديث JSON

#### ✅ الخطوة 2.3: تحديث Products API
- تعديل `POST` في `/api/products/route.ts`
- تعديل `PUT` في `/api/products/[id]/route.ts`
- تعديل `DELETE` لحذف الصور عند حذف المنتج

---

### المرحلة 3: المكونات (Components) 🎨

#### ✅ الخطوة 3.1: إنشاء ImageUploader Component
- Drag & Drop zone
- معاينة الصور
- Progress bar
- زر حذف لكل صورة

#### ✅ الخطوة 3.2: تحديث AddProductForm
- استبدال input URL بـ ImageUploader
- إزالة validation للـ URL
- إضافة state للصور المرفوعة

#### ✅ الخطوة 3.3: تحديث EditProductForm
- نفس التعديلات
- عرض الصور الحالية
- السماح بإضافة/حذف صور

---

### المرحلة 4: الخدمات (Services) 🔧

#### ✅ الخطوة 4.1: إضافة دوال في productService
```typescript
export const uploadProductImage = async (productId: string, file: File)
export const deleteProductImage = async (productId: string, imageId: string)
```

---

### المرحلة 5: الاختبار والتحسين ✨

#### ✅ الخطوة 5.1: اختبار الرفع
- رفع صورة واحدة
- رفع صور متعددة
- رفع ملف كبير (يجب أن يفشل)
- رفع ملف غير صورة (يجب أن يفشل)

#### ✅ الخطوة 5.2: اختبار الحذف
- حذف صورة واحدة
- حذف جميع الصور
- حذف منتج (يجب حذف مجلده)

#### ✅ الخطوة 5.3: اختبار التعديل
- إضافة صور لمنتج موجود
- حذف صور من منتج موجود
- استبدال الصور

---

## 🔐 الأمان والتحقق

### Validations المطلوبة:

1. **نوع الملف:**
   - ✅ jpg, jpeg, png, webp, gif
   - ❌ exe, pdf, doc, etc.

2. **حجم الملف:**
   - ✅ أقل من 5MB
   - ❌ أكبر من 5MB

3. **عدد الصور:**
   - ✅ حد أقصى 10 صور لكل منتج
   - ❌ أكثر من 10 صور

4. **أسماء الملفات:**
   - استخدام UUID أو timestamp
   - منع الأحرف الخاصة
   - الحفاظ على الامتداد الأصلي

---

## 📦 المكتبات المطلوبة

### ✅ موجودة بالفعل:
- `fs` (Node.js built-in)
- `path` (Node.js built-in)
- `next` (يدعم API Routes)

### ❓ قد نحتاج (اختياري):
- `formidable` - لمعالجة multipart/form-data (إذا لم يعمل Next.js built-in)
- `sharp` - لتحسين وضغط الصور
- `uuid` - لإنشاء أسماء فريدة

**ملاحظة:** Next.js 15 يدعم FormData بشكل مدمج، لذا قد لا نحتاج مكتبات إضافية.

---

## 🎨 تجربة المستخدم (UX)

### في AddProductForm:

```
┌─────────────────────────────────────┐
│  📸 صور المنتج                      │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │  🖼️  اسحب الصور هنا          │  │
│  │     أو اضغط للاختيار          │  │
│  │  (حد أقصى 10 صور، 5MB لكل)   │  │
│  └───────────────────────────────┘  │
│                                     │
│  الصور المرفوعة:                   │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │              │
│  │ ❌ │ │ ❌ │ │ ❌ │              │
│  └────┘ └────┘ └────┘              │
└─────────────────────────────────────┘
```

### أثناء الرفع:

```
┌─────────────────────────────────────┐
│  جاري رفع الصور...                 │
│  ████████████░░░░░░░░  60%          │
│  (3 من 5 صور تم رفعها)             │
└─────────────────────────────────────┘
```

---

## 📊 تحديث products.json

### قبل:
```json
{
  "id": "prod-123",
  "name": "قميص",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

### بعد:
```json
{
  "id": "prod-123",
  "name": "قميص",
  "images": [
    "/uploads/products/prod-123/image-1.jpg",
    "/uploads/products/prod-123/image-2.jpg"
  ]
}
```

---

## ⚠️ التحديات المتوقعة

### 1. حجم الملفات
**المشكلة:** Next.js له حد افتراضي لحجم الطلبات (4MB)
**الحل:** تعديل `next.config.ts`:
```typescript
export default {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
```

### 2. FormData في Server Components
**المشكلة:** FormData يعمل فقط في Client Components
**الحل:** استخدام `'use client'` في المكونات

### 3. الصور القديمة
**المشكلة:** المنتجات الحالية تستخدم روابط خارجية
**الحل:** 
- دعم كلا النظامين (روابط + ملفات محلية)
- أو migration script لتحويل الروابط

### 4. Git و الصور
**المشكلة:** رفع الصور إلى Git سيزيد حجم الريبو
**الحل:** إضافة `/public/uploads/` إلى `.gitignore`

---

## 🚀 الفوائد المتوقعة

### ✅ للمطور:
1. تحكم كامل في الصور
2. لا اعتماد على خدمات خارجية
3. سرعة أكبر (الصور محلية)
4. سهولة النسخ الاحتياطي

### ✅ للمستخدم:
1. رفع سهل (Drag & Drop)
2. معاينة فورية
3. حذف وإضافة سريع
4. لا حاجة لرفع الصور لموقع آخر أولاً

### ✅ للأداء:
1. تحميل أسرع (Next.js Image Optimization)
2. إمكانية ضغط الصور
3. إمكانية إنشاء thumbnails

---

## 📋 Checklist التنفيذ

- [ ] إنشاء المجلدات
- [ ] إنشاء fileUpload.ts utilities
- [ ] إنشاء Upload API endpoint
- [ ] إنشاء Delete Image API endpoint
- [ ] تحديث Products API (POST/PUT/DELETE)
- [ ] إنشاء ImageUploader component
- [ ] تحديث AddProductForm
- [ ] تحديث EditProductForm
- [ ] إضافة دوال في productService
- [ ] تحديث Types
- [ ] اختبار الرفع
- [ ] اختبار الحذف
- [ ] اختبار التعديل
- [ ] تحديث next.config.ts
- [ ] إضافة /uploads إلى .gitignore
- [ ] كتابة التوثيق

---

## 🎯 الخلاصة

هذا النظام سيحول المشروع من الاعتماد على روابط خارجية إلى نظام رفع محلي كامل باستخدام `fs`. 

**الوقت المتوقع للتنفيذ:** 4-6 ساعات عمل

**الأولوية:** متوسطة إلى عالية (حسب الحاجة)

**الصعوبة:** متوسطة

---

## 📞 هل تريد البدء؟

اختر أحد الخيارات:
1. ✅ **نعم، ابدأ الآن** - سأبدأ بالتنفيذ خطوة بخطوة
2. 📝 **أريد تعديلات على الخطة** - أخبرني بالتعديلات
3. ❓ **لدي أسئلة** - اسأل عن أي جزء غير واضح
