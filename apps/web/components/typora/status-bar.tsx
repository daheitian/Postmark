"use client";
import { FileText, Clock, BarChart3 } from "lucide-react";

interface StatusBarProps {
  wordCount: number;
  lineCount: number;
  characterCount: number;
  saveStatus: "Saved" | "Unsaved";
}

export const StatusBar = ({
  wordCount,
  lineCount,
  characterCount,
  saveStatus,
}: StatusBarProps) => {
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
  const now = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="h-10 border-t border-border bg-muted/50 flex items-center justify-between px-4 text-xs text-muted-foreground">
      {/* Left side - Save status */}
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-1 ${
            saveStatus === "Saved" ? "text-green-600" : "text-amber-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              saveStatus === "Saved" ? "bg-green-600" : "bg-amber-600"
            }`}
          />
          {saveStatus}
        </div>
      </div>

      {/* Center - Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          <span>{wordCount}</span>
          <span className="text-muted-foreground">words</span>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <BarChart3 className="w-4 h-4" />
          <span>{characterCount}</span>
          <span className="text-muted-foreground">characters</span>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <span>{lineCount}</span>
          <span className="text-muted-foreground">lines</span>
        </div>
      </div>

      {/* Right side - Time info */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1">
          <span>{readingTime}</span>
          <span className="text-muted-foreground">min read</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{now}</span>
        </div>
      </div>
    </div>
  );
};
