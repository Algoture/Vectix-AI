import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const BioTextarea = ({ bio, onChange }) => (
  <div className="space-y-1.5">
    <Label htmlFor="bio">Professional Bio</Label>
    <Textarea
      id="bio"
      placeholder="Tell us about your professional background..."
      className="h-28"
      value={bio}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default BioTextarea;
