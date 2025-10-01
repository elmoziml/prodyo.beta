
import { NextResponse } from 'next/server';
import wilayas from '@/lib/data/wilayas_data.json';

export async function GET() {
  try {
    const allWilayas = wilayas.map(w => ({ id: w.id, name: w.name, name_ar: w.name_ar }));
    return NextResponse.json(allWilayas);
  } catch (error) {
    console.error('Error fetching wilayas:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
