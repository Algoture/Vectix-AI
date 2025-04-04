"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

import { saveResume } from "@/actions/resume";

import { ContactInfoForm } from "./ContactInfoForm";
import { TextAreaSection } from "./TextAreaSection";
import { EntryListForm } from "./EntryListForm";
import { MarkdownPreview } from "./MarkdownPreview";
import { ActionButtons } from "./ActionButtons";
import { entriesToMarkdown } from "@/app/lib/helper";

const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

export default function ResumeBuilder({ initialContent = "" }) {
  const { user, isLoaded: isUserLoaded } = useUser();

  const [previewContent, setPreviewContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState(
    initialContent ? "preview" : "edit"
  );
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [
    formEditedSinceLastPreviewUpdate,
    setFormEditedSinceLastPreviewUpdate,
  ] = useState(false);

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
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);
    if (!parts.length) return "";
    return `## <div align="center">${userName}</div>\n\n<div align="center">\n\n${parts.join(
      " | "
    )}\n\n</div>`;
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
    setFormEditedSinceLastPreviewUpdate(true);
  };

  const handleContactChange = handleFieldChange(setContactInfo);
  const handleSummaryChange = handleFieldChange(setSummary);
  const handleSkillsChange = handleFieldChange(setSkills);
  const handleExperienceChange = handleFieldChange(setExperience);
  const handleEducationChange = handleFieldChange(setEducation);
  const handleProjectsChange = handleFieldChange(setProjects);

  useEffect(() => {
    if (activeTab === "edit" || formEditedSinceLastPreviewUpdate) {
      const newContent = getCombinedContent();
      setPreviewContent(newContent);
      setFormEditedSinceLastPreviewUpdate(false);
    }
  }, [activeTab, formEditedSinceLastPreviewUpdate, getCombinedContent]);

  const handleSave = useCallback(async () => {
    if (!previewContent.trim()) {
      toast.error("Cannot save an empty resume.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveResume(previewContent);
      if (result.success) {
        toast.success("Resume saved!");
      } else {
        toast.error(result.error || "Failed to save resume.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  }, [previewContent, user?.id]);

  const generatePDF = useCallback(async () => {
    if (!html2pdf) {
      toast.error("PDF generator is not ready yet.");
      return;
    }
    if (!previewContent.trim()) {
      toast.error("Cannot generate PDF for an empty resume.");
      return;
    }
    setIsGeneratingPdf(true);
    toast.info("Generating PDF...");
    try {
      const element = document.getElementById("resume-pdf");
      if (!element) {
        throw new Error("PDF source element not found.");
      }
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save(); 
      toast.success("PDF downloaded!");
    } catch (error) {
      toast.error(`PDF generation failed: ${error.message}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [previewContent, user?.fullName, html2pdf]);

  const handlePreviewContentChange = useCallback((value) => {
    setPreviewContent(value || "");
  }, []);

  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading User...</span>
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
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-2 w-fit">
          <TabsTrigger value="edit">Edit Form</TabsTrigger>
          <TabsTrigger value="preview">Preview & Edit Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-8 mt-6">
          <ContactInfoForm value={contactInfo} onChange={handleContactChange} />
          <TextAreaSection
            title="Professional Summary"
            name="summary"
            value={summary}
            onChange={handleSummaryChange}
            placeholder="Write a compelling professional summary (2-4 sentences)..."
          />
          <TextAreaSection
            title="Skills"
            name="skills"
            value={skills}
            onChange={handleSkillsChange}
            placeholder="List your key skills, separated by commas or new lines (e.g., JavaScript, React, Node.js, Project Management)..."
          />
          <EntryListForm
            type="Experience"
            entries={experience}
            onChange={handleExperienceChange}
          />
          <EntryListForm
            type="Education"
            entries={education}
            onChange={handleEducationChange}
          />
          <EntryListForm
            type="Project"
            entries={projects}
            onChange={handleProjectsChange}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          {typeof html2pdf === "function" ? (
            <MarkdownPreview
              content={previewContent}
              onContentChange={handlePreviewContentChange}
              isFormEdited={
                formEditedSinceLastPreviewUpdate && activeTab === "edit"
              }
            />
          ) : (
            <div className="flex justify-center items-center h-64 border rounded-lg">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-600">
                Loading Preview Editor...
              </span>
            </div>
          )}
          <div className="hidden">
            <div
              id="resume-pdf"
              style={{ background: "white", color: "black"}}>
              <MDEditor.Markdown source={previewContent} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
