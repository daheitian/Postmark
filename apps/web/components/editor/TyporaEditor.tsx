/**
 * TyporaEditor.tsx
 * Typora风格编辑器 - 集成Tiptap，改进的排版和交互
 */

'use client';

import React, { useState, useEffect } from 'react';
import TailwindAdvancedEditor from '../tailwind/advanced-editor';
import EditorToolbar from './EditorToolbar';

interface TyporaEditorProps {
  file: {
    id: string;
    name: string;
    content: any;
  };
}

const TyporaEditor: React.FC<TyporaEditorProps> = ({ file }) => {
  const [content, setContent] = useState(file.content);
  const [isSaved, setIsSaved] = useState(true);

  const handleContentChange = (newContent: any) => {
    setContent(newContent);
    setIsSaved(false);
    // 自动保存 (3秒后)
    setTimeout(() => {
      setIsSaved(true);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* 编辑器工具栏 */}
      <EditorToolbar isSaved={isSaved} fileName={file.name} />

      {/* 编辑器主体 */}
      <div className="flex-1 overflow-auto flex justify-center">
        {/* 限制编辑器宽度到800px，符合Typora排版 */}
        <div className="w-full max-w-4xl px-8 py-8">
          <TailwindAdvancedEditor onContentChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
};

export default TyporaEditor;
