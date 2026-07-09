"use client";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

interface MarkdownPreviewProps {
  markdown: string;
}

export const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
  const [displayMarkdown, setDisplayMarkdown] = useState(markdown);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayMarkdown(markdown);
    }, 300);

    return () => clearTimeout(timer);
  }, [markdown]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border bg-background sticky top-0 z-10">
        <h3 className="text-sm font-semibold text-foreground">Preview</h3>
        <p className="text-xs text-muted-foreground mt-1">Markdown view</p>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="bg-muted/50 rounded-lg border border-border p-4 font-mono text-xs space-y-2 break-words whitespace-pre-wrap text-foreground/80">
            {displayMarkdown ? (
              displayMarkdown.split("\n").map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  {line || "\n"}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic">Start typing...</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
        <p>{displayMarkdown.length} bytes</p>
      </div>
    </div>
  );
};
