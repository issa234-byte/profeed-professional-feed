import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { ads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
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
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { type } = body;

    // Validate type
    if (!type || (type !== 'impression' && type !== 'click')) {
      return NextResponse.json(
        {
          error: "Type must be either 'impression' or 'click'",
          code: 'INVALID_TYPE',
        },
        { status: 400 }
      );
    }

    // Check if ad exists
    const existingAd = await db
      .select()
      .from(ads)
      .where(eq(ads.id, parseInt(id)))
      .limit(1);

    if (existingAd.length === 0) {
      return NextResponse.json(
        {
          error: 'Ad not found',
          code: 'AD_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const currentAd = existingAd[0];

    // Prepare update values based on type
    const updateValues =
      type === 'impression'
        ? {
            impressions: (currentAd.impressions || 0) + 1,
            updatedAt: new Date().toISOString(),
          }
        : {
            clicks: (currentAd.clicks || 0) + 1,
            updatedAt: new Date().toISOString(),
          };

    // Update the ad
    const updatedAd = await db
      .update(ads)
      .set(updateValues)
      .where(eq(ads.id, parseInt(id)))
      .returning();

    if (updatedAd.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to update ad',
          code: 'UPDATE_FAILED',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedAd[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}