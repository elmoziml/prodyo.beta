export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export type ProductKind = 'PHYSICAL' | 'DIGITAL';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_id: number | null; // Can be null if ON DELETE SET NULL
  description: string;
  available_options?: {
    [key: string]: string[];
  };
  images?: string[];
  kind: ProductKind;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Returned';

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
  selected_options: { [key: string]: string };
}

export interface Order {
  id: number;
  display_id: string;
  customer_id?: number;
  status: OrderStatus;
  total_amount: number;
  order_date: string;
  customer_name?: string;
  phone_number?: string;
  address?: string;
  email?: string;
  items: OrderItem[];
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: "Admin" | "Staff";
}

export interface SidebarLink {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
}