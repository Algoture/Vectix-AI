"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Edit, Monitor, AlertTriangle } from "lucide-react";

export function MarkdownPreview({ content, onContentChange, isFormEdited }) {
  const [mode, setMode] = useState("preview");

  const handleEditorChange = (value) => {
    onContentChange(value || "");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <Button
          variant="link"
          type="button"
          onClick={() => setMode(mode === "preview" ? "edit" : "preview")}>
          {mode === "preview" ? (
            <>
              <Edit className="mr-2 h-4 w-4" /> Edit Markdown
            </>
          ) : (
            <>
              <Monitor className="mr-2 h-4 w-4" /> Show Preview
            </>
          )}
        </Button>
        {mode === "edit" && isFormEdited && (
          <div className="flex p-2 gap-2 items-center border border-yellow-600 text-yellow-600 rounded text-xs">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>
              Edits here might be overwritten if you change the form fields
              again.
            </span>
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <MDEditor
          value={content}
          onChange={handleEditorChange}
          height={800}
          preview={mode}
        />
      </div>

      <div className="hidden">
        <div id="resume-pdf">
          <MDEditor.Markdown
            source={content}
            style={{
              background: "white",
              color: "black",
              padding: "15px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
