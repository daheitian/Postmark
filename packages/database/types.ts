/**
 * Database types for TypeScript
 */

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  workspace_id: string;
  parent_id?: string;
  name: string;
  slug?: string;
  description?: string;
  content: Record<string, any>; // Tiptap JSON content
  content_markdown?: string;
  word_count: number;
  char_count: number;
  reading_time: number;
  status: 'draft' | 'published' | 'archived';
  is_folder: boolean;
  sort_order: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  last_edited_by?: string;
  last_edited_at: string;
}

export interface DocumentRevision {
  id: string;
  document_id: string;
  content: Record<string, any>;
  content_markdown?: string;
  version_number: number;
  change_summary?: string;
  created_by: string;
  created_at: string;
}

export interface Tag {
  id: string;
  workspace_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface DocumentShare {
  id: string;
  document_id: string;
  shared_with_user_id?: string;
  share_token?: string;
  permission_level: 'view' | 'comment' | 'edit' | 'admin';
  created_by: string;
  created_at: string;
  expires_at?: string;
}

export interface DocumentComment {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  position?: number;
  resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface DocumentImage {
  id: string;
  document_id: string;
  url: string;
  filename?: string;
  size_kb?: number;
  uploaded_by: string;
  uploaded_at: string;
}

export interface ExportHistory {
  id: string;
  document_id: string;
  format: 'pdf' | 'docx' | 'html' | 'markdown';
  filename: string;
  file_url: string;
  exported_by: string;
  exported_at: string;
}
