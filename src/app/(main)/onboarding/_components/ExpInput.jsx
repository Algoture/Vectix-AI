import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ExpInput = ({ experience, onChange }) => (
  <div className="space-y-1.5">
    <Label htmlFor="experience">
      Years of Experience <span className="text-red-500">*</span>
    </Label>
    <Input
      id="experience"
      type="number"
      min="0"
      max="50"
      placeholder="e.g., 5"
      value={experience}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

export default ExpInput;
