import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
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
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const postId = parseInt(id);

    // Check if post exists
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        {
          error: 'Post not found',
          code: 'POST_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const currentPost = existingPost[0];
    const currentTimestamp = new Date().toISOString();

    // Update post status to published
    const updatedPost = await db
      .update(posts)
      .set({
        status: 'published',
        publishedAt: currentPost.publishedAt || currentTimestamp,
        updatedAt: currentTimestamp,
      })
      .where(eq(posts.id, postId))
      .returning();

    return NextResponse.json(updatedPost[0], { status: 200 });
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