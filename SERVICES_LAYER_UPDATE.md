# تحديث طبقة الخدمات (Services Layer)

## 📋 نظرة عامة

تم توحيد وتنظيم جميع استدعاءات الـ API في المشروع من خلال إنشاء Services Layer كاملة ومتسقة.

---

## ✨ الملفات الجديدة المُنشأة

### 1️⃣ `src/services/locationService.ts`
خدمات الموقع الجغرافي (الولايات، الدوائر، البلديات)

**الدوال المتاحة:**
```typescript
- fetchWilayas(): Promise<LocationItem[]>
- fetchDairas(wilayaId: string): Promise<LocationItem[]>
- fetchCommunes(dairaId: string): Promise<LocationItem[]>
```

**مثال الاستخدام:**
```typescript
import { fetchWilayas } from '@/services/locationService';

const wilayas = await fetchWilayas();
```

---

### 2️⃣ `src/services/storefrontService.ts`
خدمات الصفحة الرئيسية العامة

**الدوال المتاحة:**
```typescript
- fetchStorefrontData(): Promise<StorefrontData>
```

**مثال الاستخدام:**
```typescript
import { fetchStorefrontData } from '@/services/storefrontService';

const { categoriesWithProducts } = await fetchStorefrontData();
```

---

## 🔄 الملفات المُحدّثة

### 3️⃣ `src/services/productService.ts`
**إضافة جديدة:**
```typescript
- fetchProductsByCategory(categoryId: string): Promise<Product[]>
```

**مثال الاستخدام:**
```typescript
import { fetchProductsByCategory } from '@/services/productService';

const products = await fetchProductsByCategory('cat-001');
```

---

### 4️⃣ `src/hooks/useLocation.ts`
**التغييرات:**
- ✅ استبدال استدعاءات `axios` المباشرة بـ `locationService`
- ✅ استيراد `LocationItem` interface من الـ service
- ✅ تحسين أسماء الدوال الداخلية (loadWilayas, loadDairas, loadCommunes)

**قبل:**
```typescript
const response = await axios.get('/api/wilayas');
setWilayas(response.data);
```

**بعد:**
```typescript
const data = await fetchWilayas();
setWilayas(data);
```

---

### 5️⃣ `src/app/[locale]/(public)/page.tsx`
**التغييرات:**
- ✅ تنظيف التعليقات الزائدة
- ✅ تبسيط دالة `getStorefrontData()`
- ℹ️ ملاحظة: لا يزال يستخدم `fetch` مباشرة لأنه Server Component

---

## 📊 ملخص البنية الجديدة

### جميع الـ Services المتاحة الآن:

| Service | الملف | الوظيفة |
|---------|------|---------|
| **Products** | `productService.ts` | إدارة المنتجات + جلب حسب الفئة |
| **Categories** | `categoryService.ts` | إدارة الفئات |
| **Orders** | `orderService.ts` | إدارة الطلبات |
| **Users** | `userService.ts` | إدارة المستخدمين |
| **Location** | `locationService.ts` | الولايات، الدوائر، البلديات |
| **Storefront** | `storefrontService.ts` | بيانات الصفحة الرئيسية |

---

## 🎯 الفوائد

### ✅ قبل التحديث:
```typescript
// ❌ استدعاءات API متفرقة في كل مكان
const response = await axios.get('/api/wilayas');
const wilayas = response.data;
```

### ✅ بعد التحديث:
```typescript
// ✅ استدعاءات موحدة ومنظمة
import { fetchWilayas } from '@/services/locationService';
const wilayas = await fetchWilayas();
```

### المزايا:
1. **تنظيم أفضل**: كل الـ API calls في مكان واحد
2. **قابلية إعادة الاستخدام**: استخدام نفس الدالة في أي مكون
3. **سهولة الصيانة**: تعديل واحد يؤثر على كل المشروع
4. **Type Safety**: TypeScript types واضحة ومحددة
5. **معالجة أخطاء مركزية**: في `apiService.ts`

---

## 🔍 الـ Endpoints المغطاة

| Endpoint | Service | Status |
|----------|---------|--------|
| `/api/products` | ✅ productService | موجود |
| `/api/products/[id]` | ✅ productService | موجود |
| `/api/products/category/[categoryId]` | ✅ productService | **جديد** |
| `/api/categories` | ✅ categoryService | موجود |
| `/api/categories/[id]` | ✅ categoryService | موجود |
| `/api/orders` | ✅ orderService | موجود |
| `/api/orders/[id]` | ✅ orderService | موجود |
| `/api/wilayas` | ✅ locationService | **جديد** |
| `/api/wilayas/[id]/dairas` | ✅ locationService | **جديد** |
| `/api/dairas/[id]/communes` | ✅ locationService | **جديد** |
| `/api/storefront` | ✅ storefrontService | **جديد** |

---

## 📝 ملاحظات مهمة

### Server Components vs Client Components

**Server Components** (مثل `page.tsx`):
- يمكن استخدام `fetch` مباشرة
- لا يحتاج للـ services في بعض الحالات
- يعمل على السيرفر فقط

**Client Components** (مثل hooks):
- يجب استخدام الـ services
- يعمل في المتصفح
- يحتاج React Query أو useState

---

## 🚀 التوصيات المستقبلية

1. ✨ إضافة `authService.ts` لإدارة المصادقة
2. ✨ إضافة `cartService.ts` لإدارة سلة التسوق
3. ✨ إضافة retry logic في `apiService.ts`
4. ✨ إضافة caching strategy
5. ✨ إضافة request/response interceptors

---

## 📅 تاريخ التحديث
**التاريخ:** 2025-10-01  
**الإصدار:** 1.0.0  
**الحالة:** ✅ مكتمل

---

## 👨‍💻 للمطورين

عند إضافة endpoint جديد:
1. أنشئ الدالة في الـ service المناسب
2. أضف TypeScript types
3. استخدم الدالة في الـ components/hooks
4. حدّث هذا الملف

**مثال:**
```typescript
// في productService.ts
export const fetchProductsByTag = async (tag: string) => {
  const response = await axios.get(`/api/products/tag/${tag}`);
  return response.data;
};
```
