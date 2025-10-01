# استخدام API جلب المنتجات حسب الفئة

## الوصف
تم إنشاء endpoint جديد لجلب المنتجات المفلترة حسب معرف الفئة (category ID).

## المسار
```
GET /api/products/category/[categoryId]
```

## المعاملات
- `categoryId` (string): معرف الفئة المراد جلب منتجاتها

## أمثلة الاستخدام

### 1. جلب المنتجات من الفئة "cat-1759175033735"
```bash
curl http://localhost:3000/api/products/category/cat-1759175033735
```

### 2. جلب المنتجات من الفئة "cat-1"
```bash
curl http://localhost:3000/api/products/category/cat-1
```

### 3. استخدام fetch في JavaScript
```javascript
// جلب المنتجات من فئة معينة
async function getProductsByCategory(categoryId) {
  try {
    const response = await fetch(`/api/products/category/${categoryId}`);
    const products = await response.json();
    console.log('المنتجات:', products);
    return products;
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
  }
}

// مثال على الاستخدام
getProductsByCategory('cat-1759175033735');
```

### 4. استخدام في React Component
```typescript
import { useEffect, useState } from 'react';

function ProductsByCategoryComponent({ categoryId }: { categoryId: string }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/category/${categoryId}`);
        if (!response.ok) {
          throw new Error('فشل في جلب المنتجات');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <div>
      <h2>المنتجات في هذه الفئة</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} دج
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## الاستجابة

### حالة النجاح (200 OK)
```json
[
  {
    "id": "prod-1759333781874",
    "name": "dfg",
    "category_id": "cat-1759175033735",
    "price": 1234,
    "stock": 23,
    "description": "",
    "images": [],
    "available_options": {
      "capacity": ["fsd"]
    }
  },
  {
    "name": "قميص كلاسيكي",
    "category_id": "cat-1759175033735",
    "price": 2300,
    "stock": 34,
    "description": "قميص كلاسيكي...",
    "images": [...],
    "available_options": {
      "size": ["f", "Black"]
    },
    "id": "prod-1759334757662"
  }
]
```

### حالة الخطأ (500 Internal Server Error)
```json
{
  "error": "Failed to fetch products by category"
}
```

## ملاحظات
- إذا لم توجد منتجات في الفئة المحددة، سيتم إرجاع مصفوفة فارغة `[]`
- يتم محاكاة تأخير API بمقدار 500 مللي ثانية
- يتم قراءة البيانات من الملف: `src/lib/data/products.json`

## الفئات المتاحة حالياً
بناءً على البيانات الموجودة في `products.json`:
- `cat-1` - منتجات متنوعة
- `cat-2` - سماعات لاسلكية
- `cat-3` - محافظ جلدية
- `cat-4` - أحذية رياضية
- `cat-5` - صانعات القهوة
- `cat-1759175033735` - ملابس صيفية
