
import { NextResponse } from 'next/server';
import orders from '@/lib/data/orders.json';
import orderItems from '@/lib/data/order_items.json';
import products from '@/lib/data/products.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // Find the main order
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // Find the items for this order
    const itemsForOrder = orderItems.filter(item => item.order_id === orderId);

    // Combine items with product details (simulating a JOIN)
    const detailedItems = itemsForOrder.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
        ...item,
        product_name: product ? product.name : 'Unknown Product',
        product_description: product ? product.description : '',
      };
    });

    // Combine everything into a single response
    const detailedOrder = {
      ...order,
      items: detailedItems,
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(detailedOrder);
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
