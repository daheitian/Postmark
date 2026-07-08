/**
 * Export API Routes
 * /api/export - Export documents to different formats
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/export
 * Export document to PDF, DOCX, HTML, or Markdown
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { document_id, format, exported_by } = body;

    if (!document_id || !format || !exported_by) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['pdf', 'docx', 'html', 'markdown'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format' },
        { status: 400 }
      );
    }

    // Get document
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', document_id)
      .single();

    if (fetchError || !document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // TODO: Implement actual export logic
    // This would call external services like:
    // - Puppeteer for PDF
    // - docx library for DOCX
    // - Serialize Tiptap content to HTML/Markdown

    const filename = `${document.name}.${format}`;
    const file_url = `https://example.com/exports/${filename}`;

    // Record export history
    const { data, error } = await supabase
      .from('export_history')
      .insert([
        {
          document_id,
          format,
          filename,
          file_url,
          exported_by,
        },
      ])
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
