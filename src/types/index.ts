export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category_id: string;
  description: string;
  available_options?: {
    [key: string]: string[];
  };
  images?: string[];
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

export interface Order {
  id: string;
  display_id: string;
  customer_id?: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
  total_amount: number;
  order_date: string;
  customer?: Customer;
  customer_name?: string;
  phone_number?: string;
  address?: string;
  items: any[];
}