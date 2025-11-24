import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
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
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    // Fetch post by ID
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, parseInt(id)))
      .limit(1);

    // Check if post exists
    if (post.length === 0) {
      return NextResponse.json(
        {
          error: 'Post not found',
          code: 'POST_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Return the post
    return NextResponse.json(post[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}