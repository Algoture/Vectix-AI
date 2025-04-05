import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

function EntryItem({ entry, index, type, onChange, onRemove }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...entry, [name]: value });
  };

  return (
    <div className="p-4 border rounded-lg space-y-3 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={() => onRemove(index)}
        aria-label={`Remove ${type} ${index + 1}`}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`${type}-title-${index}`}>
            {type === "Experience"
              ? "Job Title"
              : type === "Education"
              ? "Degree / Certificate"
              : "Project Name"}
          </Label>
          <Input
            id={`${type}-title-${index}`}
            name="title"
            value={entry.title || ""}
            onChange={handleChange}
            placeholder={
              type === "Experience"
                ? "Software Engineer"
                : type === "Education"
                ? "B.Sc. Computer Science"
                : "My Awesome App"
            }
          />
        </div>
        <div>
          <Label htmlFor={`${type}-subtitle-${index}`}>
            {type === "Experience"
              ? "Company"
              : type === "Education"
              ? "Institution"
              : "Link (Optional)"}
          </Label>
          <Input
            id={`${type}-subtitle-${index}`}
            name="subtitle"
            value={entry.subtitle || ""}
            onChange={handleChange}
            placeholder={
              type === "Experience"
                ? "Tech Corp"
                : type === "Education"
                ? "University of Example"
                : "https://github.com/user/repo"
            }
            type={type === "Project" ? "url" : "text"}
          />
        </div>
        <div>
          <Label htmlFor={`${type}-startDate-${index}`}>Start Date</Label>
          <Input
            id={`${type}-startDate-${index}`}
            name="startDate"
            type="text"
            value={entry.startDate || ""}
            onChange={handleChange}
            placeholder="e.g., Jan 2020"
          />
        </div>
        <div>
          <Label htmlFor={`${type}-endDate-${index}`}>End Date</Label>
          <Input
            id={`${type}-endDate-${index}`}
            name="endDate"
            type="text"
            value={entry.endDate || ""}
            onChange={handleChange}
            placeholder="e.g., Present or Dec 2022"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${type}-description-${index}`}>
          Description / Responsibilities
        </Label>
        <Textarea
          id={`${type}-description-${index}`}
          name="description"
          value={entry.description || ""}
          onChange={handleChange}
          placeholder="Describe your role, achievements, or project details using bullet points (use Markdown!)..."
          rows={4}
        />
      </div>
    </div>
  );
}

export function EntryListForm({ type, entries = [], onChange }) {
  const handleAddEntry = () => {
    onChange([
      ...entries,
      { title: "", subtitle: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const handleRemoveEntry = (index) => {
    onChange(entries.filter((_, i) => i !== index));
  };

  const handleEntryChange = (index, updatedEntry) => {
    const newEntries = [...entries];
    newEntries[index] = updatedEntry;
    onChange(newEntries);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {type === "Experience" ? "Work Experience" : type}
      </h3>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <EntryItem
            key={index}
            entry={entry}
            index={index}
            type={type}
            onChange={handleEntryChange}
            onRemove={handleRemoveEntry}
          />
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={handleAddEntry}
        className={"w-full"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add {type}
      </Button>
    </div>
  );
}
