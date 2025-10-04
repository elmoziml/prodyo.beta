
import { NextResponse } from 'next/server';
import { queryDB, getClient } from '@/lib/utils/db';
import { Order } from '@/types';

// GET all orders
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const query = `
      SELECT 
        o.id, 
        o.display_id, 
        o.status, 
        o.total_amount, 
        o.order_date,
        c.full_name as customer_name,
        c.phone as phone_number,
        c.address
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.order_date DESC
    `;
    
    const result = await queryDB(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST a new order
export async function POST(request: Request) {
  const client = await getClient();
  try {
    const { customer_name, phone_number, address, items, total_amount } = await request.json();

    if (!customer_name || !phone_number || !address || !items || items.length === 0 || !total_amount) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    await client.query('BEGIN');

    // 1. Create a new customer
    const customerQuery = 'INSERT INTO customers (full_name, phone, address) VALUES ($1, $2, $3) RETURNING id';
    const customerResult = await client.query(customerQuery, [customer_name, phone_number, address]);
    const customerId = customerResult.rows[0].id;

    // 2. Create a new order
    const displayId = `ORD-${Date.now()}`;
    const orderQuery = 'INSERT INTO orders (display_id, customer_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id, order_date';
    const orderResult = await client.query(orderQuery, [displayId, customerId, total_amount, 'Pending']);
    const orderId = orderResult.rows[0].id;
    const orderDate = orderResult.rows[0].order_date;

    // 3. Create order items
    const itemInsertPromises = items.map((item: any) => {
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, selected_options)
        VALUES ($1, $2, $3, $4, $5)
      `;
      return client.query(itemQuery, [
        orderId,
        item.product_id,
        item.quantity,
        item.price, // Assuming price per item is passed
        JSON.stringify(item.selected_options || {})
      ]);
    });
    await Promise.all(itemInsertPromises);

    await client.query('COMMIT');

    const newOrder: Order = {
      id: orderId,
      display_id: displayId,
      order_date: orderDate,
      status: 'Pending',
      customer_name,
      phone_number,
      address,
      items,
      total_amount,
    };

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to create order:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    client.release();
  }
}
