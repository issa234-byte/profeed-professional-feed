import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { ads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Fetch single ad by ID
    const ad = await db.select()
      .from(ads)
      .where(eq(ads.id, parseInt(id)))
      .limit(1);

    if (ad.length === 0) {
      return NextResponse.json(
        { 
          error: 'Ad not found',
          code: 'AD_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(ad[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}