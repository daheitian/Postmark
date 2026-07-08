/**
 * MainLayout.tsx
 * Typora风格主框架：顶部菜单 + 左侧文件栏 + 中间编辑区 + 右侧大纲
 */

'use client';

import React, { useState } from 'react';
import TopMenuBar from './TopMenuBar';
import SidebarFileExplorer from './SidebarFileExplorer';
import TableOfContents from './TableOfContents';
import TyporaEditor from '../editor/TyporaEditor';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tocOpen, setTocOpen] = useState(true);
  const [currentFile, setCurrentFile] = useState<{
    id: string;
    name: string;
    content: any;
  } | null>(null);

  const handleFileSelect = (file: { id: string; name: string; content: any }) => {
    setCurrentFile(file);
  };

  return (
    <div className="flex h-screen w-screen bg-white dark:bg-slate-950 flex-col">
      {/* 顶部菜单栏 */}
      <TopMenuBar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleToc={() => setTocOpen(!tocOpen)}
        currentFile={currentFile}
      />

      {/* 主内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧文件浏览器 */}
        {sidebarOpen && (
          <aside className="w-1/5 min-w-[250px] border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 flex flex-col overflow-hidden">
            <SidebarFileExplorer onFileSelect={handleFileSelect} />
          </aside>
        )}

        {/* 中间编辑区 */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto bg-white dark:bg-slate-950">
            {currentFile ? (
              <TyporaEditor file={currentFile} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">欢迎使用 Typora 编辑器</h2>
                  <p>从左侧选择或创建一个文件开始编辑</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* 右侧大纲导航 */}
        {tocOpen && currentFile && (
          <aside className="w-1/5 min-w-[250px] border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 overflow-hidden">
            <TableOfContents content={currentFile.content} />
          </aside>
        )}
      </div>
    </div>
  );
}
