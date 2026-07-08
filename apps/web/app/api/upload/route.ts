/**
 * Upload API Routes
 * /api/upload - Handle file uploads (images, attachments)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/upload
 * Upload an image to a document
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const document_id = formData.get('document_id') as string;
    const uploaded_by = formData.get('uploaded_by') as string;

    if (!file || !document_id || !uploaded_by) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload to Supabase Storage
    const filename = `${document_id}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('document-images')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('document-images')
      .getPublicUrl(filename);

    // Record in database
    const { data, error } = await supabase
      .from('document_images')
      .insert([
        {
          document_id,
          url: publicData.publicUrl,
          filename: file.name,
          size_kb: Math.round(file.size / 1024),
          uploaded_by,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { data: { url: publicData.publicUrl } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
