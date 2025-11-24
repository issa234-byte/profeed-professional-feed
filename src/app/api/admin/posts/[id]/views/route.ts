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

    // Get current post
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

    const currentViews = existingPost[0].views || 0;

    // Increment views by 1
    const updated = await db
      .update(posts)
      .set({
        views: currentViews + 1,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(posts.id, postId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to update post views',
          code: 'UPDATE_FAILED',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}