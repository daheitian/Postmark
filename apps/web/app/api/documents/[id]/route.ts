/**
 * Document by ID API Routes
 * /api/documents/[id] - Get, update, delete individual document
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Document } from '@/lib/database/types';

interface Context {
  params: {
    id: string;
  };
}

/**
 * GET /api/documents/[id]
 * Get a specific document
 */
export async function GET(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/documents/[id]
 * Update document content or metadata
 */
export async function PUT(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      name,
      content,
      content_markdown,
      status,
      last_edited_by,
    } = body;

    // Calculate statistics
    const word_count = content_markdown
      ? content_markdown.split(/\s+/).length
      : 0;
    const char_count = content_markdown
      ? content_markdown.length
      : 0;
    const reading_time = Math.ceil(word_count / 200);

    const updateData: any = {
      updated_at: new Date().toISOString(),
      last_edited_by,
      last_edited_at: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (content !== undefined) updateData.content = content;
    if (content_markdown !== undefined) {
      updateData.content_markdown = content_markdown;
      updateData.word_count = word_count;
      updateData.char_count = char_count;
      updateData.reading_time = reading_time;
    }
    if (status !== undefined) updateData.status = status;

    const { data, error } = await supabase
      .from('documents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/documents/[id]
 * Delete a document (soft delete)
 */
export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = params;

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Document deleted' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
