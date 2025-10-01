# تحديث Navbar - روابط الفئات الديناميكية مع Scroll

## نظرة عامة
تم تحديث شريط التنقل (Navbar) في Header لعرض الفئات ديناميكياً بدلاً من الروابط الثابتة، مع إضافة scroll سلس للانتقال إلى كل فئة.

## التغييرات المنفذة

### 1. إزالة زر السلة
**الملف:** `src/components/public/Header.tsx`

تم إزالة زر السلة (Cart) من Header بالكامل:
```tsx
// تم حذف هذا الكود:
<button className="p-2 rounded-full...">
  <svg>... Cart Icon ...</svg>
</button>
```

### 2. جلب الفئات ديناميكياً
**الملف:** `src/components/public/Header.tsx`

تم إضافة state وuseEffect لجلب الفئات من API:

```tsx
const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  fetchCategories();
}, []);
```

### 3. استبدال الروابط الثابتة بأزرار الفئات

#### قبل:
```tsx
const navLinks = [
  { href: "/shop", label: t("shop") },
  { href: "/new-arrivals", label: t("newArrivals") },
  { href: "/sale", label: t("sale") },
];

{navLinks.map((link) => (
  <Link href={link.href}>{link.label}</Link>
))}
```

#### بعد:
```tsx
{categories.map((category) => (
  <button
    key={category.id}
    onClick={() => scrollToCategory(category.id)}
    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600"
  >
    {category.name}
  </button>
))}
```

### 4. إضافة وظيفة Scroll السلس

تم إضافة دالة `scrollToCategory` للانتقال السلس إلى القسم المطلوب:

```tsx
const scrollToCategory = (categoryId: string) => {
  const element = document.getElementById(`category-${categoryId}`);
  if (element) {
    const headerOffset = 80; // Height of fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  }
};
```

**المزايا:**
- ✅ حساب موقع العنصر بدقة
- ✅ تعويض ارتفاع Header الثابت (80px)
- ✅ scroll سلس مع `behavior: 'smooth'`
- ✅ إغلاق القائمة المنسدلة تلقائياً في Mobile

### 5. تحديث CategorySection
**الملف:** `src/components/public/storefront/CategorySection.tsx`

تم إضافة `id` و `scroll-mt-20` لكل قسم فئة:

```tsx
<div 
  id={`category-${category.id}`} 
  className="bg-white dark:bg-body-dark py-12 scroll-mt-20"
>
```

**الفوائد:**
- `id`: يسمح بالعثور على العنصر عبر `getElementById`
- `scroll-mt-20`: يضيف margin علوي عند الـ scroll (لتجنب تغطية Header)

### 6. دعم Mobile

تم تحديث القائمة المنسدلة في Mobile لعرض الفئات:

```tsx
<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
  {categories.map((category) => (
    <button
      key={category.id}
      onClick={() => scrollToCategory(category.id)}
      className="block w-full rounded-md px-3 py-2 text-base font-medium text-center"
    >
      {category.name}
    </button>
  ))}
</div>
```

## الملفات المعدلة

1. ✅ `src/components/public/Header.tsx`
   - إزالة زر السلة
   - إضافة جلب الفئات ديناميكياً
   - استبدال navLinks بأزرار الفئات
   - إضافة دالة scrollToCategory
   - تحديث Mobile menu

2. ✅ `src/components/public/storefront/CategorySection.tsx`
   - إضافة id لكل قسم
   - إضافة scroll-mt-20 للتعويض عن Header

## البنية الجديدة

```
Header
├── Logo
├── Categories Navigation (ديناميكي)
│   ├── [فئة 1] → scroll to category-1
│   ├── [فئة 2] → scroll to category-2
│   └── [فئة N] → scroll to category-N
└── Actions
    ├── 🌙 Theme Switcher
    ├── 🌐 Language Switcher
    └── ☰ Mobile Menu
```

## كيف يعمل

### 1. عند تحميل الصفحة:
```
User → Page Load → Header useEffect → Fetch /api/categories → Update state
```

### 2. عند النقر على فئة:
```
User Click → scrollToCategory(id) → Find element → Calculate position → Smooth scroll
```

### 3. في الصفحة الرئيسية:
```
HomePage
├── Hero Section
└── Categories Sections
    ├── <div id="category-cat-1"> ملابس صيفية
    └── <div id="category-cat-2"> إلكترونيات
```

## المزايا

### ✅ 1. ديناميكي بالكامل
- يتم جلب الفئات من API
- تحديث تلقائي عند إضافة/حذف فئات
- لا حاجة لتعديل الكود عند تغيير الفئات

### ✅ 2. تجربة مستخدم ممتازة
- scroll سلس وطبيعي
- لا حاجة لإعادة تحميل الصفحة
- انتقال سريع بين الأقسام

### ✅ 3. واجهة نظيفة
- إزالة السلة (غير مستخدمة)
- تركيز على الفئات الرئيسية
- تصميم بسيط وواضح

### ✅ 4. دعم كامل للـ Mobile
- القائمة المنسدلة تعمل بنفس الطريقة
- إغلاق تلقائي بعد الاختيار
- تجربة متسقة عبر الأجهزة

### ✅ 5. دعم RTL
- التباعد يعمل بشكل صحيح
- الأزرار في الاتجاه الصحيح

## الاختبار

### Desktop:
1. ✅ الفئات تظهر في Navbar
2. ✅ النقر على فئة ينتقل إليها بسلاسة
3. ✅ Header يبقى ثابتاً أثناء الـ scroll
4. ✅ التعويض الصحيح لارتفاع Header

### Mobile:
1. ✅ القائمة المنسدلة تعرض الفئات
2. ✅ النقر يعمل بشكل صحيح
3. ✅ القائمة تغلق تلقائياً بعد الاختيار

### مع فئات متعددة:
1. ✅ يعمل مع فئة واحدة
2. ✅ يعمل مع فئات متعددة
3. ✅ يتعامل مع الفئات الفارغة

## مثال على الاستخدام

### الفئات الحالية:
- **ملابس صيفية** (2 منتجات)
- **إلكترونيات** (1 منتج)

### عند النقر على "ملابس صيفية":
```
1. scrollToCategory('cat-1759175033735')
2. Find element: document.getElementById('category-cat-1759175033735')
3. Calculate position with header offset
4. Smooth scroll to position
5. Close mobile menu (if open)
```

## التحسينات المستقبلية (اختيارية)

1. 🔄 إضافة highlight للفئة النشطة أثناء الـ scroll
2. 🔄 إضافة loading state أثناء جلب الفئات
3. 🔄 إضافة error handling UI
4. 🔄 إضافة skeleton loader للفئات
5. 🔄 إضافة animation عند ظهور الفئات

## الخلاصة

✅ تم إزالة زر السلة  
✅ تم جعل Navbar ديناميكي يعرض الفئات  
✅ تم إضافة scroll سلس للانتقال بين الأقسام  
✅ تم تحديث CategorySection مع id مناسب  
✅ دعم كامل للـ Mobile و RTL  

Navbar الآن ديناميكي بالكامل مع تجربة تصفح سلسة! 🎉
