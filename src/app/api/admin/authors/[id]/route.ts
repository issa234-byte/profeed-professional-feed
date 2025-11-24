import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authors } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    // Fetch author by ID
    const author = await db.select()
      .from(authors)
      .where(eq(authors.id, parseInt(id)))
      .limit(1);

    // Check if author exists
    if (author.length === 0) {
      return NextResponse.json(
        { 
          error: 'Author not found',
          code: 'AUTHOR_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(author[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}