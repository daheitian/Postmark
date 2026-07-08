/**
 * Document Revision API Routes
 * /api/documents/[id]/revisions - Version history
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface Context {
  params: {
    id: string;
  };
}

/**
 * GET /api/documents/[id]/revisions
 * Get all revisions of a document
 */
export async function GET(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';
    const offset = searchParams.get('offset') || '0';

    const { data, error } = await supabase
      .from('document_revisions')
      .select('*')
      .eq('document_id', id)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

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
 * POST /api/documents/[id]/revisions
 * Save a new revision
 */
export async function POST(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { content, content_markdown, change_summary, created_by } = body;

    // Get latest version number
    const { data: latestRevision } = await supabase
      .from('document_revisions')
      .select('version_number')
      .eq('document_id', id)
      .order('version_number', { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (latestRevision?.version_number || 0) + 1;

    const { data, error } = await supabase
      .from('document_revisions')
      .insert([
        {
          document_id: id,
          content,
          content_markdown,
          version_number: nextVersion,
          change_summary,
          created_by,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
