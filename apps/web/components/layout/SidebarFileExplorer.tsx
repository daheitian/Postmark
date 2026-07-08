/**
 * SidebarFileExplorer.tsx
 * 左侧文件浏览器 - 文件树、文件夹结构、快速操作
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  MoreVertical,
  Trash2,
  Edit2,
} from 'lucide-react';
import { Button } from '@/components/tailwind/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/tailwind/ui/dropdown-menu';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content?: any;
}

interface SidebarFileExplorerProps {
  onFileSelect: (file: { id: string; name: string; content: any }) => void;
}

const SidebarFileExplorer: React.FC<SidebarFileExplorerProps> = ({
  onFileSelect,
}) => {
  const [fileTree, setFileTree] = useState<FileItem[]>([
    {
      id: 'folder-1',
      name: '我的文档',
      type: 'folder',
      children: [
        {
          id: 'file-1',
          name: '欢迎.md',
          type: 'file',
          content: { type: 'doc', content: [] },
        },
        {
          id: 'file-2',
          name: '笔记.md',
          type: 'file',
          content: { type: 'doc', content: [] },
        },
      ],
    },
  ]);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['folder-1'])
  );

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (items: FileItem[], level: number = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        {item.type === 'folder' ? (
          <div>
            <div
              className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded cursor-pointer group"
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
              <button
                onClick={() => toggleFolder(item.id)}
                className="p-0 h-5 w-5 flex items-center justify-center"
              >
                {expandedFolders.has(item.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedFolders.has(item.id) ? (
                <FolderOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                {item.name}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-5 w-5 p-0"
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => console.log('新建文件')}>
                    <Plus className="w-3 h-3 mr-2" />
                    新建文件
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('新建文件夹')}>
                    <Folder className="w-3 h-3 mr-2" />
                    新建文件夹
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('重命名')}>
                    <Edit2 className="w-3 h-3 mr-2" />
                    重命名
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('删除')}>
                    <Trash2 className="w-3 h-3 mr-2" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {expandedFolders.has(item.id) && item.children && (
              <div>
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded cursor-pointer group"
            style={{ paddingLeft: `${level * 12 + 20}px` }}
            onClick={() =>
              onFileSelect({
                id: item.id,
                name: item.name,
                content: item.content,
              })
            }
          >
            <File className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
              {item.name}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-5 w-5 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log('重命名')}>
                  <Edit2 className="w-3 h-3 mr-2" />
                  重命名
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('删除')}>
                  <Trash2 className="w-3 h-3 mr-2" />
                  删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
          文件浏览器
        </h2>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => console.log('新建文件')}
          className="h-6 w-6 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* 文件树 */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">{renderFileTree(fileTree)}</div>
      </div>
    </div>
  );
};

export default SidebarFileExplorer;
