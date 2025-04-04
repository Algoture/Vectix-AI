// components/PdfGenerator.jsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";

export default function PdfGenerator({ content, userName, onComplete, onError }) {
  useEffect(() => {
    const generatePdf = async () => {
      try {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = document.createElement("div");
        element.innerHTML = `<div class="p-8" style="width: 210mm; min-height: 297mm;">
          <MDEditor.Markdown source="${content}" />
        </div>`;
        
        document.body.appendChild(element);
        
        await html2pdf()
          .set({
            margin: 15,
            filename: `${userName || 'resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          })
          .from(element)
          .save();
        
        document.body.removeChild(element);
        toast.success("PDF downloaded successfully!");
        onComplete();
      } catch (error) {
        onError(error.message);
      }
    };

    generatePdf();
  }, [content, userName, onComplete, onError]);

  return null;
}