/**
 * TopMenuBar.tsx
 * Typora风格顶部菜单栏，包含文件操作、编辑、视图、帮助等菜单
 */

'use client';

import React, { useState } from 'react';
import {
  Menu,
  ChevronDown,
  FileText,
  Edit3,
  Eye,
  HelpCircle,
  MoreVertical,
  Sun,
  Moon,
  LayoutSidebar,
  List,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/tailwind/ui/dropdown-menu';
import { Button } from '@/components/tailwind/ui/button';

interface TopMenuBarProps {
  onToggleSidebar: () => void;
  onToggleToc: () => void;
  currentFile: { id: string; name: string } | null;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({
  onToggleSidebar,
  onToggleToc,
  currentFile,
}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 flex items-center px-4 gap-2">
      {/* Logo/App Name */}
      <div className="font-bold text-lg text-gray-900 dark:text-white mr-4">
        📝 Postmark
      </div>

      {/* 文件菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-700 dark:text-gray-300"
          >
            <FileText className="w-4 h-4" />
            文件
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => console.log('新建')}>
            <span>新建文件</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+N</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('打开')}>
            <span>打开文件</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+O</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('打开文件夹')}>
            <span>打开文件夹</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+K Ctrl+O</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log('保存')}>
            <span>保存</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+S</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('另存为')}>
            <span>另存为</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+S</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log('导出')}>
            <span>导出为...</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log('退出')}>
            <span>退出</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 编辑菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-700 dark:text-gray-300"
          >
            <Edit3 className="w-4 h-4" />
            编辑
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>
            <span>撤销</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+Z</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>重做</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+Y</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>剪切</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+X</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>复制</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+C</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>粘贴</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+V</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>全选</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+A</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>查找</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+F</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>查找和替换</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+H</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 视图菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-700 dark:text-gray-300"
          >
            <Eye className="w-4 h-4" />
            视图
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={onToggleSidebar}>
            <LayoutSidebar className="w-4 h-4 mr-2" />
            <span>文件浏览器</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+\\</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleToc}>
            <List className="w-4 h-4 mr-2" />
            <span>大纲导航</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+]</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleTheme}>
            {isDark ? (
              <>
                <Sun className="w-4 h-4 mr-2" />
                <span>浅色主题</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" />
                <span>深色主题</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>焦点模式</span>
            <span className="ml-auto text-xs text-gray-500">F8</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>打字机模式</span>
            <span className="ml-auto text-xs text-gray-500">F7</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 帮助菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-700 dark:text-gray-300"
          >
            <HelpCircle className="w-4 h-4" />
            帮助
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>
            <span>快捷键参考</span>
            <span className="ml-auto text-xs text-gray-500">Ctrl+?</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>使用文档</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>关于 Postmark</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 右侧功能按钮 */}
      <div className="ml-auto flex items-center gap-2">
        {currentFile && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentFile.name}
          </span>
        )}
      </div>
    </header>
  );
};

export default TopMenuBar;
