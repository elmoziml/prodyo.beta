
import { NextResponse } from 'next/server';
import { queryDB } from '@/lib/utils/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id, 10);

    if (isNaN(orderId)) {
      return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
    }

    // 1. Fetch the main order details along with customer info
    const orderQuery = `
      SELECT 
        o.id, o.display_id, o.status, o.total_amount, o.order_date,
        c.id as customer_id, c.full_name as customer_name, c.phone as phone_number, c.address
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.id = $1
    `;
    const orderResult = await queryDB(orderQuery, [orderId]);

    if (orderResult.rows.length === 0) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    const order = orderResult.rows[0];

    // 2. Fetch the order items with product details
    const itemsQuery = `
      SELECT 
        oi.id, oi.quantity, oi.price_at_purchase, oi.selected_options,
        p.id as product_id, 
        COALESCE(p.name, 'المنتج محذوف') as product_name
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `;
    const itemsResult = await queryDB(itemsQuery, [orderId]);
    const items = itemsResult.rows;

    // 3. Combine into a single response
    const detailedOrder = {
      ...order,
      items: items,
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(detailedOrder);
  } catch (error: any) {
    console.error(`Error fetching order ${params.id}:`, error);
    console.error(error.stack);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ message: 'Status is required' }, { status: 400 });
    }

    const query = 'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await queryDB(query, [status, orderId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating order ${params.id}:`, error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // The ON DELETE CASCADE constraint on order_items will handle item deletion
    const result = await queryDB('DELETE FROM orders WHERE id = $1', [orderId]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting order ${params.id}:`, error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
