import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Filter parameters
    const type = searchParams.get('type');
    const categoryId = searchParams.get('categoryId');
    const authorId = searchParams.get('authorId');
    const search = searchParams.get('search');

    // Build where conditions
    const conditions = [eq(posts.status, 'published')];

    // Add type filter if provided
    if (type) {
      conditions.push(eq(posts.type, type));
    }

    // Add categoryId filter if provided
    if (categoryId) {
      const parsedCategoryId = parseInt(categoryId);
      if (!isNaN(parsedCategoryId)) {
        conditions.push(eq(posts.categoryId, parsedCategoryId));
      }
    }

    // Add authorId filter if provided
    if (authorId) {
      const parsedAuthorId = parseInt(authorId);
      if (!isNaN(parsedAuthorId)) {
        conditions.push(eq(posts.authorId, parsedAuthorId));
      }
    }

    // Add search condition if provided
    if (search) {
      const searchCondition = or(
        like(posts.title, `%${search}%`),
        like(posts.excerpt, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    // Execute query with all conditions
    const results = await db.select()
      .from(posts)
      .where(and(...conditions))
      .orderBy(desc(posts.publishedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}