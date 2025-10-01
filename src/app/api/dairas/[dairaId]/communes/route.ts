
import { NextResponse } from 'next/server';
import wilayas from '@/lib/data/wilayas_data.json';

export async function GET(request: Request, { params }: { params: { dairaId: string } }) {
  try {
    const { dairaId } = params;
    let foundDaira = null;

    for (const wilaya of wilayas) {
      const daira = wilaya.dairas.find(d => d.id === dairaId);
      if (daira) {
        foundDaira = daira;
        break;
      }
    }

    if (!foundDaira) {
      return NextResponse.json({ message: 'Daira not found' }, { status: 404 });
    }

    const communes = foundDaira.communes.map(c => ({ id: c.id, name: c.name, name_ar: c.name_ar }));
    return NextResponse.json(communes);
  } catch (error) {
    console.error(`Error fetching communes for daira ${params.dairaId}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
