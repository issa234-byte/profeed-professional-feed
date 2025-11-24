import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authors } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate pagination parameters
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: 'Invalid limit parameter', code: 'INVALID_LIMIT' },
        { status: 400 }
      );
    }

    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        { error: 'Invalid offset parameter', code: 'INVALID_OFFSET' },
        { status: 400 }
      );
    }

    // Query all authors with pagination, sorted by name ASC
    const allAuthors = await db
      .select()
      .from(authors)
      .orderBy(asc(authors.name))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(allAuthors, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}