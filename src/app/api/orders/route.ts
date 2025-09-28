
import { NextResponse } from 'next/server';
import orders from '@/lib/data/orders.json';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return NextResponse.json(orders);
}
