"use client";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Github,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const EditorToolbar = () => {
  const [previewMode, setPreviewMode] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts = [
    { key: "Ctrl+B", action: "Bold" },
    { key: "Ctrl+I", action: "Italic" },
    { key: "Ctrl+U", action: "Underline" },
    { key: "Ctrl+`", action: "Code" },
    { key: "Ctrl+K", action: "Link" },
    { key: "Ctrl+Shift+1", action: "Heading 1" },
    { key: "Ctrl+Shift+2", action: "Heading 2" },
    { key: "Ctrl+/", action: "Slash menu" },
  ];

  return (
    <>
      <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
        {/* Left - Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold text-foreground">Typora Editor</div>
          <div className="text-xs text-muted-foreground">Notion-style WYSIWYG</div>
        </div>

        {/* Center - Quick Actions */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
            <Heading1 className="w-4 h-4 text-muted-foreground" />
            <Heading2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
            <Bold className="w-4 h-4 text-muted-foreground" />
            <Italic className="w-4 h-4 text-muted-foreground" />
            <Underline className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
            <List className="w-4 h-4 text-muted-foreground" />
            <ListOrdered className="w-4 h-4 text-muted-foreground" />
            <Quote className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Right - Tools */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHelp(!showHelp)}
            title="Keyboard shortcuts"
            className="text-muted-foreground hover:text-foreground"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
          <a
            href="https://github.com/daheitian/Postmark"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="w-4 h-4" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="sm"
            title="Settings"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Keyboard Shortcuts Help */}
      {showHelp && (
        <div className="border-b border-border bg-muted/50 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex flex-col gap-1 p-2 rounded bg-background border border-border"
                >
                  <div className="text-xs font-mono font-bold text-foreground">
                    {shortcut.key}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {shortcut.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
