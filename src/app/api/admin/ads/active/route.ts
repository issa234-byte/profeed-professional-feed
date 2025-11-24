import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { ads } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placement = searchParams.get('placement');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 50);

    // Build query to get active ads
    let query = db.select().from(ads);

    // Filter by placement if provided, always filter by active status
    if (placement) {
      query = query.where(
        and(
          eq(ads.status, 'active'),
          eq(ads.placement, placement)
        )
      );
    } else {
      query = query.where(eq(ads.status, 'active'));
    }

    // Sort by priority descending and apply limit
    const activeAds = await query
      .orderBy(desc(ads.priority))
      .limit(limit);

    return NextResponse.json(activeAds, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}