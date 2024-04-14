"use client";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import P from "@tiptap/extension-paragraph";
import Placeholders from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import { ReactNode } from "react";
import "./style.css";
import "./tiptap.css";

const Tiptap = ({
  onUpdate,
  initialContent,
  placeholder,
  className,
  innerClassName = "",
}: {
  initialContent: string;
  placeholder: string;
  className?: string;
  innerClassName?: string;
  onUpdate?: ({
    html,
    text,
    json,
  }: {
    html: string;
    text: string;
    json: JSONContent;
  }) => void;
}) => {
  const editor = useEditor({
    content: initialContent,
    extensions: [
      Document,
      Text,
      Bold,
      HardBreak,
      Placeholders.configure({
        placeholder,
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "tiptap-title",
        },
      }),
      History,
      P,
    ],
    editorProps: {
      attributes: {
        class: innerClassName,
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const json = editor.getJSON();
      const html = editor.getHTML();
      onUpdate?.({ text, json, html });
    },
  });

  return <EditorContent editor={editor} className={className} />;
};

export default Tiptap;
