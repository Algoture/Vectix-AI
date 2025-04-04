import { Button } from "@/components/ui/button";
import { Download, Save, Loader2 } from "lucide-react";

export function ActionButtons({
  isSaving,
  isGeneratingPdf,
  onSave,
  onGeneratePdf,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-end items-center gap-2">
      <Button
        variant="destructive"
        onClick={onSave}
        disabled={isSaving || isGeneratingPdf}
        className="w-full sm:w-auto">
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Resume
          </>
        )}
      </Button>
      <Button
        onClick={onGeneratePdf}
        disabled={isGeneratingPdf || isSaving}
        className="w-full sm:w-auto">
        {isGeneratingPdf ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </>
        )}
      </Button>
    </div>
  );
}
