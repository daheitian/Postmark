/**
 * TableOfContents.tsx
 * 右侧大纲导航 - 自动生成目录，显示标题层级
 */

'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Heading {
  id: string;
  level: number;
  text: string;
  children?: Heading[];
}

interface TableOfContentsProps {
  content: any;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set([1, 2, 3]));

  useEffect(() => {
    // 模拟从编辑器内容提取标题
    const extractedHeadings: Heading[] = [
      { id: 'h1', level: 1, text: '第一章' },
      { id: 'h2', level: 2, text: '1.1 介绍' },
      { id: 'h3', level: 3, text: '1.1.1 背景' },
      { id: 'h4', level: 2, text: '1.2 内容' },
      { id: 'h5', level: 1, text: '第二章' },
      { id: 'h6', level: 2, text: '2.1 分析' },
    ];
    setHeadings(extractedHeadings);
  }, [content]);

  const toggleLevel = (level: number) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(level)) {
      newExpanded.delete(level);
    } else {
      newExpanded.add(level);
    }
    setExpandedLevels(newExpanded);
  };

  const renderToc = (items: Heading[], level: number = 1) => {
    return items
      .filter((item) => item.level <= 3)
      .map((item) => (
        <div key={item.id}>
          <div
            className={`flex items-center gap-1 px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded cursor-pointer text-sm group`}
            style={{
              paddingLeft: `${(item.level - 1) * 12 + 12}px`,
              fontSize: `${16 - (item.level - 1) * 2}px`,
            }}
            onClick={() => {
              // 平滑滚动到对应位置
              const element = document.getElementById(item.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span
              className={`font-semibold text-${item.level === 1 ? 'gray-900' : item.level === 2 ? 'gray-700' : 'gray-600'} dark:text-gray-${item.level === 1 ? '100' : item.level === 2 ? '200' : '300'}`}
            >
              {item.text}
            </span>
          </div>
        </div>
      ));
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
          大纲
        </h2>
      </div>

      {/* 大纲列表 */}
      <div className="flex-1 overflow-y-auto">
        {headings.length > 0 ? (
          <div className="py-2">{renderToc(headings)}</div>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>暂无标题</p>
          </div>
        )}
      </div>

      {/* 底部 - 统计信息 */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <div>字数: 1234</div>
        <div>段落: 12</div>
        <div>阅读时间: 5 分钟</div>
      </div>
    </div>
  );
};

export default TableOfContents;
