import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { authors } from '@/db/schema';
import { eq, like, or, asc } from 'drizzle-orm';

const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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

      const author = await db
        .select()
        .from(authors)
        .where(eq(authors.id, parseInt(id)))
        .limit(1);

      if (author.length === 0) {
        return NextResponse.json(
          { error: 'Author not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(author[0], { status: 200 });
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(authors);

    if (search) {
      query = query.where(
        or(
          like(authors.name, `%${search}%`),
          like(authors.bio, `%${search}%`)
        )
      );
    }

    const results = await query
      .orderBy(asc(authors.name))
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
    const { name, bio, avatar, role, twitter, linkedin, website } = body;

    // Validation
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and cannot be empty', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    // Auto-generate slug and createdAt
    const slug = generateSlug(name.trim());
    const createdAt = new Date().toISOString();

    // Check if slug already exists
    const existingAuthor = await db
      .select()
      .from(authors)
      .where(eq(authors.slug, slug))
      .limit(1);

    if (existingAuthor.length > 0) {
      return NextResponse.json(
        { error: 'An author with this name already exists', code: 'DUPLICATE_SLUG' },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: any = {
      name: name.trim(),
      slug,
      createdAt,
    };

    if (bio !== undefined && bio !== null) insertData.bio = bio;
    if (avatar !== undefined && avatar !== null) insertData.avatar = avatar;
    if (role !== undefined && role !== null) insertData.role = role;
    if (twitter !== undefined && twitter !== null) insertData.twitter = twitter;
    if (linkedin !== undefined && linkedin !== null) insertData.linkedin = linkedin;
    if (website !== undefined && website !== null) insertData.website = website;

    const newAuthor = await db.insert(authors).values(insertData).returning();

    return NextResponse.json(newAuthor[0], { status: 201 });
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

    // Check if author exists
    const existingAuthor = await db
      .select()
      .from(authors)
      .where(eq(authors.id, parseInt(id)))
      .limit(1);

    if (existingAuthor.length === 0) {
      return NextResponse.json(
        { error: 'Author not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, bio, avatar, role, twitter, linkedin, website } = body;

    const updates: any = {};

    if (name !== undefined && name !== null) {
      if (name.trim() === '') {
        return NextResponse.json(
          { error: 'Name cannot be empty', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updates.name = name.trim();
      updates.slug = generateSlug(name.trim());

      // Check if new slug conflicts with existing author
      if (updates.slug !== existingAuthor[0].slug) {
        const slugConflict = await db
          .select()
          .from(authors)
          .where(eq(authors.slug, updates.slug))
          .limit(1);

        if (slugConflict.length > 0) {
          return NextResponse.json(
            { error: 'An author with this name already exists', code: 'DUPLICATE_SLUG' },
            { status: 400 }
          );
        }
      }
    }

    if (bio !== undefined) updates.bio = bio;
    if (avatar !== undefined) updates.avatar = avatar;
    if (role !== undefined) updates.role = role;
    if (twitter !== undefined) updates.twitter = twitter;
    if (linkedin !== undefined) updates.linkedin = linkedin;
    if (website !== undefined) updates.website = website;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update', code: 'NO_UPDATES' },
        { status: 400 }
      );
    }

    const updatedAuthor = await db
      .update(authors)
      .set(updates)
      .where(eq(authors.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedAuthor[0], { status: 200 });
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

    // Check if author exists
    const existingAuthor = await db
      .select()
      .from(authors)
      .where(eq(authors.id, parseInt(id)))
      .limit(1);

    if (existingAuthor.length === 0) {
      return NextResponse.json(
        { error: 'Author not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(authors)
      .where(eq(authors.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Author deleted successfully',
        author: deleted[0],
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