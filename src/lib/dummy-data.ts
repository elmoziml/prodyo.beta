
export const customers = [
  {
    id: 1,
    fullName: 'محمد أمين',
    address: {
      state: 'الجزائر',
      district: 'الدار البيضاء',
      municipality: 'باب الزوار',
    },
    phone: '0555123456',
  },
  {
    id: 2,
    fullName: 'فاطمة الزهراء',
    address: {
      state: 'وهران',
      district: 'وهران',
      municipality: 'السانية',
    },
    phone: '0777987654',
  },
];

export const categories = [
  { id: 1, name: 'ملابس رجالية' },
  { id: 2, name: 'ملابس نسائية' },
  { id: 3, name: 'ملابس أطفال' },
];

export const products = [
  {
    id: 1,
    name: 'قميص قطني',
    description: 'قميص قطني عالي الجودة، متوفر بجميع المقاسات والألوان.',
    price: 2500,
    imageUrl: '/g19-5.png', // Placeholder image
    categoryId: 1,
  },
  {
    id: 2,
    name: 'بنطلون جينز',
    description: 'بنطلون جينز عصري ومريح للارتداء اليومي.',
    price: 4500,
    imageUrl: '/g19-5.png', // Placeholder image
    categoryId: 2,
  },
];

export const orders = [
  {
    id: 'order-001',
    date: '2025-09-28',
    status: 'تم التوصيل',
    customerId: 1,
    productId: 1,
    quantity: 2,
    totalPrice: 5000,
  },
  {
    id: 'order-002',
    date: '2025-09-27',
    status: 'قيد التنفيذ',
    customerId: 2,
    productId: 2,
    quantity: 1,
    totalPrice: 4500,
  },
  {
    id: 'order-003',
    date: '2025-09-26',
    status: 'ملغي',
    customerId: 1,
    productId: 2,
    quantity: 1,
    totalPrice: 4500,
  },
];
