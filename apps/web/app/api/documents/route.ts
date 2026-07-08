/**
 * Document API Routes
 * /api/documents - CRUD operations for documents
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Document } from '@/lib/database/types';

/**
 * GET /api/documents
 * Get all documents in a workspace
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');
    const parentId = searchParams.get('parentId');

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Missing workspaceId' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('documents')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('sort_order', { ascending: true });

    if (parentId) {
      query = query.eq('parent_id', parentId);
    }

    const { data, error } = await query;

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
 * POST /api/documents
 * Create a new document
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      workspace_id,
      parent_id,
      name,
      is_folder = false,
      created_by,
    } = body;

    if (!workspace_id || !name || !created_by) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          workspace_id,
          parent_id,
          name,
          is_folder,
          created_by,
          content: is_folder ? null : { type: 'doc', content: [] },
          status: 'draft',
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
