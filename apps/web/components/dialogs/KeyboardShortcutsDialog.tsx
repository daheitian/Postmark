/**
 * KeyboardShortcutsDialog.tsx
 * 快捷键帮助对话框
 */

'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/tailwind/ui/dialog';
import { Button } from '@/components/tailwind/ui/button';
import { Input } from '@/components/tailwind/ui/input';
import { ScrollArea } from '@/components/tailwind/ui/scroll-area';
import { HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { useKeyboardShortcutsList } from '@/hooks/useKeyboardShortcuts';

const KeyboardShortcutsDialog: React.FC = () => {
  const shortcuts = useKeyboardShortcutsList();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShortcuts = shortcuts.filter(
    (shortcut) =>
      shortcut.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shortcut.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedShortcuts = {
    '文本格式': [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'codeBlock',
    ],
    '标题': ['heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6'],
    '列表': ['bulletList', 'orderedList', 'taskList', 'increaseIndent', 'decreaseIndent'],
    '块元素': ['quote', 'horizontalRule', 'table', 'link', 'image'],
    '文件操作': ['newFile', 'openFile', 'save', 'saveAs'],
    '编辑操作': ['undo', 'redo', 'selectAll', 'find', 'findReplace'],
    '视图': [
      'toggleSidebar',
      'toggleTableOfContents',
      'toggleFocusMode',
      'toggleTypewriterMode',
      'toggleFullscreen',
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          <span>快捷键</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>键盘快捷键</DialogTitle>
        </DialogHeader>

        {/* 搜索框 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索快捷键..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 快捷键列表 */}
        <ScrollArea className="h-[60vh]">
          {searchTerm ? (
            // 搜索结果
            <div className="space-y-4 pr-4">
              {filteredShortcuts.length > 0 ? (
                <div className="space-y-2">
                  {filteredShortcuts.map((shortcut) => (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {shortcut.description}
                      </span>
                      <kbd className="px-3 py-1 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  未找到相关快捷键
                </div>
              )}
            </div>
          ) : (
            // 分组显示
            <div className="space-y-6 pr-4">
              {Object.entries(groupedShortcuts).map(([group, ids]) => {
                const groupShortcuts = shortcuts.filter((s) =>
                  ids.includes(s.id)
                );
                return (
                  <div key={group}>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
                      {group}
                    </h3>
                    <div className="space-y-2">
                      {groupShortcuts.map((shortcut) => (
                        <div
                          key={shortcut.id}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {shortcut.description}
                          </span>
                          <kbd className="px-3 py-1 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg">
                            {shortcut.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsDialog;
