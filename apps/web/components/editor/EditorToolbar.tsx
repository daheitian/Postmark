/**
 * EditorToolbar.tsx
 * 编辑器工具栏 - 文本格式化、段落样式等
 */

'use client';

import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image,
  Check,
  Save,
} from 'lucide-react';
import { Button } from '@/components/tailwind/ui/button';
import { Separator } from '@/components/tailwind/ui/separator';

interface EditorToolbarProps {
  isSaved: boolean;
  fileName: string;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ isSaved, fileName }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 px-4 py-2 flex items-center gap-2">
      {/* 文件名和保存状态 */}
      <div className="flex items-center gap-2 mr-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {fileName}
        </span>
        {isSaved ? (
          <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <Check className="w-3 h-3" />
            已保存
          </span>
        ) : (
          <span className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
            <Save className="w-3 h-3" />
            保存中...
          </span>
        )}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* 文本格式按钮 */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" title="粗体 (Ctrl+B)" className="h-8 w-8 p-0">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="斜体 (Ctrl+I)" className="h-8 w-8 p-0">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="下划线 (Ctrl+U)" className="h-8 w-8 p-0">
          <Underline className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="删除线" className="h-8 w-8 p-0">
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="代码 (Ctrl+\`)" className="h-8 w-8 p-0">
          <Code className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* 标题样式按钮 */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" title="标题 1 (Ctrl+1)" className="h-8 w-8 p-0">
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="标题 2 (Ctrl+2)" className="h-8 w-8 p-0">
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="标题 3 (Ctrl+3)" className="h-8 w-8 p-0">
          <Heading3 className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* 列表和块级元素按钮 */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" title="无序列表 (Ctrl+Shift+B)" className="h-8 w-8 p-0">
          <List className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="有序列表 (Ctrl+Shift+N)" className="h-8 w-8 p-0">
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="引用 (Ctrl+Shift+Q)" className="h-8 w-8 p-0">
          <Quote className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* 插入元素按钮 */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" title="链接 (Ctrl+K)" className="h-8 w-8 p-0">
          <Link className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" title="图片 (Ctrl+Shift+I)" className="h-8 w-8 p-0">
          <Image className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
