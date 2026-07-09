"use client";
import { defaultEditorContent } from "@/lib/content";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  ImageResizer,
  type JSONContent,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
} from "novel";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "../tailwind/extensions";
import { slashCommand, suggestionItems } from "../tailwind/slash-command";
import { uploadFn } from "../tailwind/image-upload";
import { EditorOutline } from "./editor-outline";
import { StatusBar } from "./status-bar";
import { MarkdownPreview } from "./markdown-preview";
import { EditorToolbar } from "./editor-toolbar";
import { KeyboardShortcuts } from "./keyboard-shortcuts";

const hljs = require("highlight.js");

const extensions = [...defaultExtensions, slashCommand, KeyboardShortcuts];

interface TyporaEditorProps {
  initialMarkdown?: string;
  onContentChange?: (markdown: string, json: JSONContent) => void;
  showPreview?: boolean;
  showOutline?: boolean;
}

export const TyporaEditor = ({
  initialMarkdown,
  onContentChange,
  showPreview = true,
  showOutline = true,
}: TyporaEditorProps) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(null);
  const [editor, setEditor] = useState<EditorInstance | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState("Saved");

  // Initialize content from localStorage or props
  useEffect(() => {
    if (initialMarkdown) {
      setMarkdown(initialMarkdown);
      setInitialContent({ type: "doc", content: [] });
    } else {
      const content = window.localStorage.getItem("novel-content");
      if (content) {
        setInitialContent(JSON.parse(content));
      } else {
        setInitialContent(defaultEditorContent);
      }
    }
  }, [initialMarkdown]);

  // Highlight code blocks
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  // Debounced updates
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      const md = editor.storage.markdown.getMarkdown();
      const html = editor.getHTML();

      setMarkdown(md);
      setCharacterCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
      setLineCount(md.split("\n").length);

      window.localStorage.setItem(
        "html-content",
        highlightCodeblocks(html)
      );
      window.localStorage.setItem("novel-content", JSON.stringify(json));
      window.localStorage.setItem("markdown", md);

      onContentChange?.(md, json);
      setSaveStatus("Saved");
    },
    500
  );

  if (!initialContent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <EditorToolbar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Outline Panel */}
        {showOutline && (
          <aside className="w-56 border-r border-border bg-muted/30 overflow-y-auto hidden lg:block">
            <EditorOutline editor={editor} />
          </aside>
        )}

        {/* Editor */}
        <div className="flex-1 overflow-y-auto">
          <EditorRoot>
            <EditorContent
              initialContent={initialContent}
              extensions={extensions}
              className="relative w-full max-w-4xl mx-auto py-8 px-4 sm:px-8"
              editorProps={{
                handleDOMEvents: {
                  keydown: (_view, event) => handleCommandNavigation(event),
                },
                handlePaste: (view, event) =>
                  handleImagePaste(view, event, uploadFn),
                handleDrop: (view, event, _slice, moved) =>
                  handleImageDrop(view, event, moved, uploadFn),
                attributes: {
                  class:
                    "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full min-h-full",
                },
              }}
              onUpdate={({ editor }) => {
                setEditor(editor);
                debouncedUpdates(editor);
                setSaveStatus("Unsaved");
              }}
              slotAfter={<ImageResizer />}
            >
              {/* Slash Command Menu */}
              <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-border bg-background px-1 py-2 shadow-md transition-all">
                <EditorCommandEmpty className="px-2 text-muted-foreground">
                  No results
                </EditorCommandEmpty>
                <EditorCommandList>
                  {suggestionItems.map((item) => (
                    <EditorCommandItem
                      key={item.title}
                      value={item.title}
                      onCommand={(val) => item.command(val)}
                      className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </EditorCommandItem>
                  ))}
                </EditorCommandList>
              </EditorCommand>
            </EditorContent>
          </EditorRoot>
        </div>

        {/* Right Preview Panel */}
        {showPreview && editor && (
          <aside className="w-96 border-l border-border bg-muted/30 overflow-y-auto hidden 2xl:block">
            <MarkdownPreview markdown={markdown} />
          </aside>
        )}
      </div>

      {/* Footer Status Bar */}
      <StatusBar
        wordCount={wordCount}
        lineCount={lineCount}
        characterCount={characterCount}
        saveStatus={saveStatus}
      />
    </div>
  );
};

export default TyporaEditor;
