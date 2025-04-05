"use client";

import { useState, useEffect, useCallback} from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {ContactInfoForm} from "./ContactInfoForm";
import {TextAreaSection }from "./TextAreaSection";
import {EntryListForm }from "./EntryListForm";
import {MarkdownPreview} from "./MarkdownPreview";
import {ActionButtons }from "./ActionButtons";

import { saveResume } from "@/actions/resume";
import { entriesToMarkdown } from "@/app/lib/helper";
import MDEditor from "@uiw/react-md-editor";

export default function ResumeBuilder({ initialContent = "" }) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("html2pdf.js").then((module) => {
        setHtml2pdf(() => module.default);
      });
    }
  }, []);

  const [previewContent, setPreviewContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState(initialContent ? "preview" : "edit");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    mobile: "",
    linkedin: "",
    twitter: "",
  });
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);

  const getContactMarkdown = useCallback(() => {
    const parts = [];
    const userName = user?.fullName || "Your Name";
    
    if (contactInfo.email) parts.push(`${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`${contactInfo.mobile}`);
    if (contactInfo.linkedin) parts.push(`[LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`[Twitter](${contactInfo.twitter})`);
    
    return parts.length 
      ? `## <div align="center">${userName}</div>\n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  }, [contactInfo, user?.fullName]);

  const getCombinedContent = useCallback(() => {
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary.trim()}`,
      skills && `## Skills\n\n${skills.trim()}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }, [getContactMarkdown, summary, skills, experience, education, projects]);

  const handleFieldChange = (setter) => (value) => {
    setter(value);
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    if (activeTab === "edit" || hasUnsavedChanges) {
      setPreviewContent(getCombinedContent());
      setHasUnsavedChanges(false);
    }
  }, [activeTab, hasUnsavedChanges, getCombinedContent]);

  const handleSave = useCallback(async () => {
    if (!previewContent.trim()) {
      toast.error("Cannot save an empty resume.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveResume(previewContent);
      if (result.success) {
        toast.success("Resume saved successfully!");
        setHasUnsavedChanges(false);
      } else {
        toast.error(result.error || "Failed to save resume.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while saving.");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  }, [previewContent]);

  const generatePDF = useCallback(async () => {
    if (!previewContent.trim()) {
      toast.error("Cannot generate PDF for an empty resume.");
      return;
    }

    if (!html2pdf) {
      toast.error("PDF generator is not ready yet. Please try again.");
      return;
    }

    setIsGeneratingPdf(true);
    try {
      const element = document.createElement("div");
      element.className = "p-8 markdown-body";
      element.style.background = "white";
      element.style.color = "black";
      element.style.width = "210mm";
      element.style.minHeight = "297mm";
      
      element.innerHTML = `<div>${previewContent}</div>`;
      document.body.appendChild(element);

      const options = {
        margin: 15,
        filename: `${user?.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          logging: true,
          useCORS: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(options).from(element).save();
      document.body.removeChild(element);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error(`PDF generation failed: ${error.message}`);
      console.error("PDF error:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [previewContent, user?.fullName, html2pdf]);

  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading User Data...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <ActionButtons
          isSaving={isSaving}
          isGeneratingPdf={isGeneratingPdf}
          onSave={handleSave}
          onGeneratePdf={generatePDF}
          hasChanges={hasUnsavedChanges}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-2 w-fit">
          <TabsTrigger value="edit">Edit Form</TabsTrigger>
          <TabsTrigger value="preview">Preview & Edit</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-8 mt-6">
          <ContactInfoForm 
            value={contactInfo} 
            onChange={handleFieldChange(setContactInfo)} 
          />
          
          <TextAreaSection
            title="Professional Summary"
            value={summary}
            onChange={handleFieldChange(setSummary)}
            placeholder="Highlight your professional experience and skills..."
          />
          
          <TextAreaSection
            title="Skills"
            value={skills}
            onChange={handleFieldChange(setSkills)}
            placeholder="List your technical and soft skills..."
          />
          
          <EntryListForm
            type="Experience"
            entries={experience}
            onChange={handleFieldChange(setExperience)}
          />
          
          <EntryListForm
            type="Education"
            entries={education}
            onChange={handleFieldChange(setEducation)}
          />
          
          <EntryListForm
            type="Project"
            entries={projects}
            onChange={handleFieldChange(setProjects)}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <MarkdownPreview
            content={previewContent}
            onContentChange={(value) => {
              setPreviewContent(value || "");
              setHasUnsavedChanges(true);
            }}
            hasFormChanges={hasUnsavedChanges && activeTab === "edit"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}