import { Extension } from "@tiptap/core";

export const KeyboardShortcuts = Extension.create({
  name: "keyboardShortcuts",

  addKeyboardShortcuts() {
    return {
      // Text formatting
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-`": () => this.editor.commands.toggleCode(),
      "Mod-shift-x": () => this.editor.commands.toggleStrike(),

      // Headings
      "Mod-shift-1": () =>
        this.editor.commands.setHeading({ level: 1 }),
      "Mod-shift-2": () =>
        this.editor.commands.setHeading({ level: 2 }),
      "Mod-shift-3": () =>
        this.editor.commands.setHeading({ level: 3 }),

      // Lists
      "Mod-shift-8": () => this.editor.commands.toggleBulletList(),
      "Mod-shift-7": () => this.editor.commands.toggleOrderedList(),

      // Blocks
      "Mod-shift-5": () => this.editor.commands.toggleBlockquote(),
      "Mod-shift-6": () => this.editor.commands.setCodeBlock(),

      // Link (would need additional modal)
      "Mod-k": () => this.editor.commands.toggleLink(),

      // Paragraph
      "Ctrl-Alt-0": () => this.editor.commands.setParagraph(),
    };
  },
});
