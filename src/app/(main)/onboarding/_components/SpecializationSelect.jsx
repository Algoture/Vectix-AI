import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SpecializationSelect = ({
  subIndustries,
  selectedSubIndustry,
  onChange,
}) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="subIndustry">
        Specialization <span className="text-red-500">*</span>
      </Label>
      <Select value={selectedSubIndustry} onValueChange={onChange}>
        <SelectTrigger id="subIndustry">
          <SelectValue placeholder="Select your specialization" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Specializations</SelectLabel>
            {subIndustries.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SpecializationSelect;
