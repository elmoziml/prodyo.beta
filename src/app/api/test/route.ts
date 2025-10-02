import { NextResponse } from 'next/server';
import { queryDB } from '../../../lib/utils/db';

export async function GET(request) {
  try {
    const { rows } = await queryDB('SELECT NOW()');
    return NextResponse.json({
      message: 'تم الاتصال بقاعدة البيانات بنجاح',
      time: rows[0].now,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        error: 'فشل الاتصال بقاعدة البيانات',
        details: error.message,
      },
      { status: 500 }
    );
  }
}