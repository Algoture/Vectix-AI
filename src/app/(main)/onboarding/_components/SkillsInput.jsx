import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SkillsInput = ({ skills, onChange }) => (
  <div className="space-y-1.5">
    <Label htmlFor="skills">
      Skills <span className="text-red-500">*</span>
    </Label>
    <Input
      id="skills"
      placeholder="e.g., Python, JavaScript, Project Management"
      value={skills}
      onChange={(e) => onChange(e.target.value)}
      required
    />
    <p className="text-sm text-muted-foreground">
      Separate multiple skills with commas
    </p>
  </div>
);

export default SkillsInput;
