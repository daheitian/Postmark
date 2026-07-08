/**
 * useEditorShortcuts.ts
 * 编辑器内部快捷键处理
 */

import { useEffect } from 'react';
import { Editor } from '@tiptap/react';

export function useEditorShortcuts(editor: Editor | null) {
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // 处理 Escape 键 - 退出某些模式
      if (event.key === 'Escape') {
        editor.chain().focus().clearNodes().run();
      }

      // 处理 Enter 键在列表中的行为
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        // Ctrl+Enter: 在列表项后创建新行
        editor.chain().focus().createParagraphNear().run();
      }
    };

    editor.view.dom.addEventListener('keydown', handleKeyDown);

    return () => {
      editor.view.dom.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);
}
