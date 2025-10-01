
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const ordersPath = path.join(process.cwd(), 'src/lib/data/orders.json');

function readOrdersFile(): Order[] {
  const data = fs.readFileSync(ordersPath, 'utf-8');
  return JSON.parse(data);
}

function writeOrdersFile(data: Order[]) {
  fs.writeFileSync(ordersPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const orders = readOrdersFile();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const { customer_name, phone_number, address, items, total_amount } = await request.json();
    
    const orders = readOrdersFile();

    // Create a new order with the correct structure
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      display_id: `ORD${(orders.length + 1).toString().padStart(3, '0')}`,
      order_date: new Date().toISOString(),
      status: 'Pending',
      customer_name,
      phone_number,
      address,
      items: items.map((item: any) => ({
        ...item,
        product_name: item.product_name || 'Product Name Missing',
        selected_options: item.available_options || {}
      })),
      total_amount: total_amount,
    };

    orders.push(newOrder);
    writeOrdersFile(orders);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
