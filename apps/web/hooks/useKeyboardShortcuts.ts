/**
 * useKeyboardShortcuts.ts
 * Typora风格的快捷键系统 - 文本格式化、导航、文件操作等
 */

import { useEffect, useCallback } from 'react';
import { useEditor } from '@/lib/editor';

export interface KeyBinding {
  key: string; // e.g., 'ctrl+b', 'cmd+shift+s', 'ctrl+alt+1'
  description: string;
  handler: () => void;
  platform?: 'mac' | 'windows' | 'linux' | 'all';
}

export interface KeyBindings {
  // Text formatting
  bold: KeyBinding;
  italic: KeyBinding;
  underline: KeyBinding;
  strikethrough: KeyBinding;
  code: KeyBinding;
  codeBlock: KeyBinding;

  // Headings
  heading1: KeyBinding;
  heading2: KeyBinding;
  heading3: KeyBinding;
  heading4: KeyBinding;
  heading5: KeyBinding;
  heading6: KeyBinding;

  // Lists
  bulletList: KeyBinding;
  orderedList: KeyBinding;
  taskList: KeyBinding;
  increaseIndent: KeyBinding;
  decreaseIndent: KeyBinding;

  // Blocks
  quote: KeyBinding;
  horizontalRule: KeyBinding;
  table: KeyBinding;
  link: KeyBinding;
  image: KeyBinding;

  // File operations
  newFile: KeyBinding;
  openFile: KeyBinding;
  save: KeyBinding;
  saveAs: KeyBinding;

  // Edit operations
  undo: KeyBinding;
  redo: KeyBinding;
  selectAll: KeyBinding;
  find: KeyBinding;
  findReplace: KeyBinding;

  // View
  toggleSidebar: KeyBinding;
  toggleTableOfContents: KeyBinding;
  toggleFocusMode: KeyBinding;
  toggleTypewriterMode: KeyBinding;
  toggleFullscreen: KeyBinding;

  // Other
  delete: KeyBinding;
}

const isMac = typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
const cmd = isMac ? 'Meta' : 'Control';

export function useKeyboardShortcuts() {
  const editor = useEditor();

  const normalizeKey = (key: string): string => {
    // 转换快捷键格式：'ctrl+b' -> ['Control', 'b']
    return key
      .toLowerCase()
      .split('+')
      .map((k) => {
        switch (k) {
          case 'ctrl':
            return 'Control';
          case 'cmd':
            return isMac ? 'Meta' : 'Control';
          case 'shift':
            return 'Shift';
          case 'alt':
            return 'Alt';
          default:
            return k.length === 1 ? k.toUpperCase() : k;
        }
      })
      .join('+');
  };

  const isKeyMatch = useCallback(
    (event: KeyboardEvent, binding: string): boolean => {
      const parts = normalizeKey(binding).split('+');
      const modifiers = parts.slice(0, -1);
      const key = parts[parts.length - 1];

      const hasCtrl = modifiers.includes('Control');
      const hasShift = modifiers.includes('Shift');
      const hasAlt = modifiers.includes('Alt');
      const hasMeta = modifiers.includes('Meta');

      const ctrlMatch = isMac ? event.metaKey === hasMeta : event.ctrlKey === hasCtrl;
      const shiftMatch = event.shiftKey === hasShift;
      const altMatch = event.altKey === hasAlt;

      const eventKey =
        event.key.length === 1 ? event.key.toUpperCase() : event.key.toLowerCase();
      const keyMatch = eventKey === key.toUpperCase() || event.code === key;

      return ctrlMatch && shiftMatch && altMatch && keyMatch;
    },
    []
  );

  const keyBindings: KeyBindings = {
    // Text formatting
    bold: {
      key: isMac ? 'cmd+b' : 'ctrl+b',
      description: '粗体',
      handler: () => editor?.chain().focus().toggleBold().run(),
    },
    italic: {
      key: isMac ? 'cmd+i' : 'ctrl+i',
      description: '斜体',
      handler: () => editor?.chain().focus().toggleItalic().run(),
    },
    underline: {
      key: isMac ? 'cmd+u' : 'ctrl+u',
      description: '下划线',
      handler: () => editor?.chain().focus().toggleUnderline().run(),
    },
    strikethrough: {
      key: isMac ? 'cmd+shift+x' : 'ctrl+shift+x',
      description: '删除线',
      handler: () => editor?.chain().focus().toggleStrike().run(),
    },
    code: {
      key: isMac ? 'cmd+`' : 'ctrl+`',
      description: '行内代码',
      handler: () => editor?.chain().focus().toggleCode().run(),
    },
    codeBlock: {
      key: isMac ? 'cmd+shift+`' : 'ctrl+shift+`',
      description: '代码块',
      handler: () => editor?.chain().focus().toggleCodeBlock().run(),
    },

    // Headings
    heading1: {
      key: isMac ? 'cmd+1' : 'ctrl+1',
      description: '标题 1',
      handler: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    heading2: {
      key: isMac ? 'cmd+2' : 'ctrl+2',
      description: '标题 2',
      handler: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    heading3: {
      key: isMac ? 'cmd+3' : 'ctrl+3',
      description: '标题 3',
      handler: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    heading4: {
      key: isMac ? 'cmd+4' : 'ctrl+4',
      description: '标题 4',
      handler: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    heading5: {
      key: isMac ? 'cmd+5' : 'ctrl+5',
      description: '标题 5',
      handler: () => editor?.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    heading6: {
      key: isMac ? 'cmd+6' : 'ctrl+6',
      description: '标题 6',
      handler: () => editor?.chain().focus().toggleHeading({ level: 6 }).run(),
    },

    // Lists
    bulletList: {
      key: isMac ? 'cmd+shift+b' : 'ctrl+shift+b',
      description: '无序列表',
      handler: () => editor?.chain().focus().toggleBulletList().run(),
    },
    orderedList: {
      key: isMac ? 'cmd+shift+n' : 'ctrl+shift+n',
      description: '有序列表',
      handler: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    taskList: {
      key: isMac ? 'cmd+shift+t' : 'ctrl+shift+t',
      description: '任务列表',
      handler: () => editor?.chain().focus().toggleTaskList().run(),
    },
    increaseIndent: {
      key: 'Tab',
      description: '增加缩进',
      handler: () => editor?.chain().focus().sinkListItem('listItem').run(),
    },
    decreaseIndent: {
      key: 'shift+Tab',
      description: '减少缩进',
      handler: () => editor?.chain().focus().liftListItem('listItem').run(),
    },

    // Blocks
    quote: {
      key: isMac ? 'cmd+shift+q' : 'ctrl+shift+q',
      description: '引用',
      handler: () => editor?.chain().focus().toggleBlockquote().run(),
    },
    horizontalRule: {
      key: isMac ? 'cmd+shift+-' : 'ctrl+shift+-',
      description: '水平线',
      handler: () => editor?.chain().focus().setHorizontalRule().run(),
    },
    table: {
      key: isMac ? 'cmd+shift+;' : 'ctrl+shift+;',
      description: '表格',
      handler: () => console.log('Insert table'), // TODO: Implement table insertion
    },
    link: {
      key: isMac ? 'cmd+k' : 'ctrl+k',
      description: '链接',
      handler: () => editor?.chain().focus().toggleLink({ href: '' }).run(),
    },
    image: {
      key: isMac ? 'cmd+shift+i' : 'ctrl+shift+i',
      description: '图片',
      handler: () => console.log('Insert image'), // TODO: Implement image insertion
    },

    // File operations
    newFile: {
      key: isMac ? 'cmd+n' : 'ctrl+n',
      description: '新建文件',
      handler: () => console.log('New file'),
    },
    openFile: {
      key: isMac ? 'cmd+o' : 'ctrl+o',
      description: '打开文件',
      handler: () => console.log('Open file'),
    },
    save: {
      key: isMac ? 'cmd+s' : 'ctrl+s',
      description: '保存',
      handler: () => console.log('Save'),
    },
    saveAs: {
      key: isMac ? 'cmd+shift+s' : 'ctrl+shift+s',
      description: '另存为',
      handler: () => console.log('Save as'),
    },

    // Edit operations
    undo: {
      key: isMac ? 'cmd+z' : 'ctrl+z',
      description: '撤销',
      handler: () => editor?.chain().focus().undo().run(),
    },
    redo: {
      key: isMac ? 'cmd+shift+z' : 'ctrl+y',
      description: '重做',
      handler: () => editor?.chain().focus().redo().run(),
    },
    selectAll: {
      key: isMac ? 'cmd+a' : 'ctrl+a',
      description: '全选',
      handler: () => editor?.chain().focus().selectAll().run(),
    },
    find: {
      key: isMac ? 'cmd+f' : 'ctrl+f',
      description: '查找',
      handler: () => console.log('Find'),
    },
    findReplace: {
      key: isMac ? 'cmd+h' : 'ctrl+h',
      description: '查找和替换',
      handler: () => console.log('Find and replace'),
    },

    // View
    toggleSidebar: {
      key: isMac ? 'cmd+\\' : 'ctrl+\\',
      description: '切换侧栏',
      handler: () => console.log('Toggle sidebar'),
    },
    toggleTableOfContents: {
      key: isMac ? 'cmd+]' : 'ctrl+]',
      description: '切换目录',
      handler: () => console.log('Toggle TOC'),
    },
    toggleFocusMode: {
      key: 'F8',
      description: '焦点模式',
      handler: () => console.log('Toggle focus mode'),
    },
    toggleTypewriterMode: {
      key: 'F7',
      description: '打字机模式',
      handler: () => console.log('Toggle typewriter mode'),
    },
    toggleFullscreen: {
      key: 'F11',
      description: '全屏',
      handler: () => console.log('Toggle fullscreen'),
    },

    // Other
    delete: {
      key: 'Delete',
      description: '删除',
      handler: () => editor?.chain().focus().deleteSelection().run(),
    },
  };

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Skip if focused on input/textarea (except editor)
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        (target.tagName === 'TEXTAREA' && !target.classList.contains('editor'))
      ) {
        return;
      }

      // Check all key bindings
      Object.entries(keyBindings).forEach(([, binding]) => {
        if (isKeyMatch(event, binding.key)) {
          event.preventDefault();
          binding.handler();
        }
      });
    },
    [keyBindings, isKeyMatch]
  );

  // Register event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { keyBindings, isKeyMatch };
}

/**
 * Hook for getting all keyboard shortcuts for display
 */
export function useKeyboardShortcutsList() {
  const { keyBindings } = useKeyboardShortcuts();

  return Object.entries(keyBindings).map(([id, binding]) => ({
    id,
    key: binding.key,
    description: binding.description,
  }));
}
