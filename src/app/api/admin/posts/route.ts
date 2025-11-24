import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const post = await db
        .select()
        .from(posts)
        .where(eq(posts.id, parseInt(id)))
        .limit(1);

      if (post.length === 0) {
        return NextResponse.json(
          { error: 'Post not found', code: 'POST_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(post[0], { status: 200 });
    }

    // List with filtering, pagination, and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const categoryId = searchParams.get('categoryId');
    const authorId = searchParams.get('authorId');

    let query = db.select().from(posts);

    // Build filter conditions
    const conditions = [];

    if (status) {
      conditions.push(eq(posts.status, status));
    }

    if (type) {
      conditions.push(eq(posts.type, type));
    }

    if (categoryId && !isNaN(parseInt(categoryId))) {
      conditions.push(eq(posts.categoryId, parseInt(categoryId)));
    }

    if (authorId && !isNaN(parseInt(authorId))) {
      conditions.push(eq(posts.authorId, parseInt(authorId)));
    }

    if (search) {
      const searchCondition = or(
        like(posts.title, `%${search}%`),
        like(posts.excerpt, `%${search}%`),
        like(posts.content, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, type, excerpt, categoryId, authorId, featuredImage, status, views, readTime, regions, tags, publishedAt } = body;

    // Validation
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required and cannot be empty', code: 'TITLE_REQUIRED' },
        { status: 400 }
      );
    }

    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Content is required and cannot be empty', code: 'CONTENT_REQUIRED' },
        { status: 400 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required', code: 'TYPE_REQUIRED' },
        { status: 400 }
      );
    }

    if (!['article', 'job', 'news'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be one of: article, job, news', code: 'INVALID_TYPE' },
        { status: 400 }
      );
    }

    // Auto-generate fields
    const slug = generateSlug(title.trim());
    const timestamp = new Date().toISOString();

    const newPost = await db
      .insert(posts)
      .values({
        title: title.trim(),
        slug,
        content: content.trim(),
        type,
        excerpt: excerpt?.trim() || null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        authorId: authorId ? parseInt(authorId) : null,
        featuredImage: featuredImage || null,
        status: status || 'draft',
        views: views || 0,
        readTime: readTime || null,
        regions: regions || null,
        tags: tags || null,
        publishedAt: publishedAt || null,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
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

    // Check if post exists
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Post not found', code: 'POST_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    // Update fields if provided
    if (body.title !== undefined) {
      if (body.title.trim() === '') {
        return NextResponse.json(
          { error: 'Title cannot be empty', code: 'TITLE_EMPTY' },
          { status: 400 }
        );
      }
      updates.title = body.title.trim();
      updates.slug = generateSlug(body.title.trim());
    }

    if (body.content !== undefined) {
      if (body.content.trim() === '') {
        return NextResponse.json(
          { error: 'Content cannot be empty', code: 'CONTENT_EMPTY' },
          { status: 400 }
        );
      }
      updates.content = body.content.trim();
    }

    if (body.type !== undefined) {
      if (!['article', 'job', 'news'].includes(body.type)) {
        return NextResponse.json(
          { error: 'Type must be one of: article, job, news', code: 'INVALID_TYPE' },
          { status: 400 }
        );
      }
      updates.type = body.type;
    }

    if (body.excerpt !== undefined) {
      updates.excerpt = body.excerpt?.trim() || null;
    }

    if (body.categoryId !== undefined) {
      updates.categoryId = body.categoryId ? parseInt(body.categoryId) : null;
    }

    if (body.authorId !== undefined) {
      updates.authorId = body.authorId ? parseInt(body.authorId) : null;
    }

    if (body.featuredImage !== undefined) {
      updates.featuredImage = body.featuredImage || null;
    }

    if (body.status !== undefined) {
      updates.status = body.status;
      // Auto-set publishedAt when status changes to published
      if (body.status === 'published' && !existingPost[0].publishedAt) {
        updates.publishedAt = new Date().toISOString();
      }
    }

    if (body.views !== undefined) {
      updates.views = body.views;
    }

    if (body.readTime !== undefined) {
      updates.readTime = body.readTime || null;
    }

    if (body.regions !== undefined) {
      updates.regions = body.regions || null;
    }

    if (body.tags !== undefined) {
      updates.tags = body.tags || null;
    }

    if (body.publishedAt !== undefined) {
      updates.publishedAt = body.publishedAt || null;
    }

    const updated = await db
      .update(posts)
      .set(updates)
      .where(eq(posts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
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

    // Check if post exists
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Post not found', code: 'POST_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(posts)
      .where(eq(posts.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Post deleted successfully',
        post: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}