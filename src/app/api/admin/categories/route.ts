import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const results = await db.select()
      .from(categories)
      .orderBy(asc(categories.name))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, color } = body;

    // Validate required field
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ 
        error: "Name is required and must not be empty",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Auto-generate slug and createdAt
    const slug = generateSlug(name.trim());
    const createdAt = new Date().toISOString();

    // Prepare insert data
    const insertData: {
      name: string;
      slug: string;
      createdAt: string;
      description?: string;
      icon?: string;
      color?: string;
    } = {
      name: name.trim(),
      slug,
      createdAt
    };

    if (description && typeof description === 'string') {
      insertData.description = description.trim();
    }
    if (icon && typeof icon === 'string') {
      insertData.icon = icon.trim();
    }
    if (color && typeof color === 'string') {
      insertData.color = color.trim();
    }

    const newCategory = await db.insert(categories)
      .values(insertData)
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    
    // Handle unique constraint violation for slug
    if ((error as Error).message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ 
        error: "A category with this name already exists",
        code: "DUPLICATE_SLUG" 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if category exists
    const existingCategory = await db.select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json({ 
        error: "Category not found",
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, icon, color } = body;

    // Prepare update data
    const updateData: {
      name?: string;
      slug?: string;
      description?: string | null;
      icon?: string | null;
      color?: string | null;
    } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return NextResponse.json({ 
          error: "Name must not be empty",
          code: "INVALID_NAME" 
        }, { status: 400 });
      }
      updateData.name = name.trim();
      updateData.slug = generateSlug(name.trim());
    }

    if (description !== undefined) {
      updateData.description = description && typeof description === 'string' ? description.trim() : null;
    }

    if (icon !== undefined) {
      updateData.icon = icon && typeof icon === 'string' ? icon.trim() : null;
    }

    if (color !== undefined) {
      updateData.color = color && typeof color === 'string' ? color.trim() : null;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(existingCategory[0], { status: 200 });
    }

    const updated = await db.update(categories)
      .set(updateData)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);

    // Handle unique constraint violation for slug
    if ((error as Error).message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ 
        error: "A category with this name already exists",
        code: "DUPLICATE_SLUG" 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if category exists before deleting
    const existingCategory = await db.select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json({ 
        error: "Category not found",
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(categories)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: "Category deleted successfully",
      category: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}