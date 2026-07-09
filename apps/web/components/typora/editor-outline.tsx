"use client";
import { type EditorInstance } from "novel";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface Heading {
  id: string;
  level: number;
  text: string;
  position: number;
}

interface EditorOutlineProps {
  editor: EditorInstance | null;
}

export const EditorOutline = ({ editor }: EditorOutlineProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    if (!editor) return;

    const extractHeadings = () => {
      const json = editor.getJSON();
      const heads: Heading[] = [];
      let position = 0;

      const traverse = (node: any) => {
        if (node.type === "heading") {
          const text = node.content
            ?.map((child: any) => child.text || "")
            .join("") || "Untitled";
          const id = `heading-${position}`;
          heads.push({
            id,
            level: node.attrs?.level || 1,
            text,
            position,
          });
        }
        if (node.content && Array.isArray(node.content)) {
          node.content.forEach((child: any) => traverse(child));
        }
        position++;
      };

      if (json.content) {
        json.content.forEach((node: any) => traverse(node));
      }

      setHeadings(heads);
    };

    extractHeadings();

    const updateHandler = () => {
      extractHeadings();
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor]);

  const handleHeadingClick = (heading: Heading) => {
    setActiveHeading(heading.id);
    // Scroll to heading in editor
    const headings = document.querySelectorAll(".ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6");
    if (headings[heading.position]) {
      headings[heading.position].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <FileText className="w-4 h-4" />
          Outline
        </h3>
      </div>

      {/* Outline List */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {headings.length === 0 ? (
          <p className="text-xs text-muted-foreground px-2 py-2">
            No headings found
          </p>
        ) : (
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => handleHeadingClick(heading)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeHeading === heading.id
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={{
                    marginLeft: `${(heading.level - 1) * 12}px`,
                  }}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
        <p>{headings.length} sections</p>
      </div>
    </div>
  );
};
