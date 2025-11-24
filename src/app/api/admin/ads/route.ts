import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { ads } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

const VALID_TYPES = ['banner', 'sidebar', 'in-article', 'feed'] as const;
const VALID_PLACEMENTS = ['homepage', 'article', 'job', 'news', 'all'] as const;
const VALID_STATUSES = ['active', 'inactive'] as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single ad by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const ad = await db
        .select()
        .from(ads)
        .where(eq(ads.id, parseInt(id)))
        .limit(1);

      if (ad.length === 0) {
        return NextResponse.json(
          { error: 'Ad not found', code: 'AD_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(ad[0], { status: 200 });
    }

    // List ads with filtering and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const placement = searchParams.get('placement');

    let query = db.select().from(ads);

    // Build where conditions
    const conditions = [];
    if (status) {
      conditions.push(eq(ads.status, status));
    }
    if (type) {
      conditions.push(eq(ads.type, type));
    }
    if (placement) {
      conditions.push(eq(ads.placement, placement));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(ads.priority), desc(ads.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      type, 
      placement, 
      contentHtml, 
      scriptCode, 
      imageUrl, 
      linkUrl,
      status,
      priority,
      impressions,
      clicks
    } = body;

    // Validate required fields
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must not be empty', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required', code: 'MISSING_TYPE' },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { 
          error: `Type must be one of: ${VALID_TYPES.join(', ')}`, 
          code: 'INVALID_TYPE' 
        },
        { status: 400 }
      );
    }

    if (!placement) {
      return NextResponse.json(
        { error: 'Placement is required', code: 'MISSING_PLACEMENT' },
        { status: 400 }
      );
    }

    if (!VALID_PLACEMENTS.includes(placement)) {
      return NextResponse.json(
        { 
          error: `Placement must be one of: ${VALID_PLACEMENTS.join(', ')}`, 
          code: 'INVALID_PLACEMENT' 
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { 
          error: `Status must be one of: ${VALID_STATUSES.join(', ')}`, 
          code: 'INVALID_STATUS' 
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const newAd = await db
      .insert(ads)
      .values({
        title: title.trim(),
        type,
        placement,
        contentHtml: contentHtml?.trim() || null,
        scriptCode: scriptCode?.trim() || null,
        imageUrl: imageUrl?.trim() || null,
        linkUrl: linkUrl?.trim() || null,
        status: status || 'active',
        priority: typeof priority === 'number' ? priority : 0,
        impressions: typeof impressions === 'number' ? impressions : 0,
        clicks: typeof clicks === 'number' ? clicks : 0,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(newAd[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if ad exists
    const existing = await db
      .select()
      .from(ads)
      .where(eq(ads.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Ad not found', code: 'AD_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { 
      title, 
      type, 
      placement, 
      contentHtml, 
      scriptCode, 
      imageUrl, 
      linkUrl,
      status,
      priority,
      impressions,
      clicks
    } = body;

    // Validate type if provided
    if (type && !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { 
          error: `Type must be one of: ${VALID_TYPES.join(', ')}`, 
          code: 'INVALID_TYPE' 
        },
        { status: 400 }
      );
    }

    // Validate placement if provided
    if (placement && !VALID_PLACEMENTS.includes(placement)) {
      return NextResponse.json(
        { 
          error: `Placement must be one of: ${VALID_PLACEMENTS.join(', ')}`, 
          code: 'INVALID_PLACEMENT' 
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { 
          error: `Status must be one of: ${VALID_STATUSES.join(', ')}`, 
          code: 'INVALID_STATUS' 
        },
        { status: 400 }
      );
    }

    // Validate title if provided
    if (title !== undefined && title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title must not be empty', code: 'INVALID_TITLE' },
        { status: 400 }
      );
    }

    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) updates.title = title.trim();
    if (type !== undefined) updates.type = type;
    if (placement !== undefined) updates.placement = placement;
    if (contentHtml !== undefined) updates.contentHtml = contentHtml?.trim() || null;
    if (scriptCode !== undefined) updates.scriptCode = scriptCode?.trim() || null;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl?.trim() || null;
    if (linkUrl !== undefined) updates.linkUrl = linkUrl?.trim() || null;
    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (impressions !== undefined) updates.impressions = impressions;
    if (clicks !== undefined) updates.clicks = clicks;

    const updated = await db
      .update(ads)
      .set(updates)
      .where(eq(ads.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if ad exists
    const existing = await db
      .select()
      .from(ads)
      .where(eq(ads.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Ad not found', code: 'AD_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(ads)
      .where(eq(ads.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      { 
        message: 'Ad deleted successfully', 
        ad: deleted[0] 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}