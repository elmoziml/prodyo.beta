
import { NextResponse } from 'next/server';
import wilayas from '@/lib/data/wilayas_data.json';

export async function GET(request: Request, { params }: { params: { wilayaId: string } }) {
  try {
    const { wilayaId } = params;
    const wilaya = wilayas.find(w => w.id === wilayaId);

    if (!wilaya) {
      return NextResponse.json({ message: 'Wilaya not found' }, { status: 404 });
    }

    const dairas = wilaya.dairas.map(d => ({ id: d.id, name: d.name, name_ar: d.name_ar }));
    return NextResponse.json(dairas);
  } catch (error) {
    console.error(`Error fetching dairas for wilaya ${params.wilayaId}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
