import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid slug is required',
          code: 'INVALID_SLUG'
        },
        { status: 400 }
      );
    }

    // Query post by slug and published status
    const result = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.slug, slug.trim()),
          eq(posts.status, 'published')
        )
      )
      .limit(1);

    // Check if post exists and is published
    if (result.length === 0) {
      return NextResponse.json(
        { 
          error: 'Post not found or not published',
          code: 'POST_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0], { status: 200 });

  } catch (error) {
    console.error('GET post by slug error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}