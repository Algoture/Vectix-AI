import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 

export function ContactInfoForm({ value, onChange }) {
  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    onChange({ ...value, [name]: inputValue });
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={value.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="+1 234 567 8900"
            value={value.mobile || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            value={value.linkedin || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter/X Profile</Label>
          <Input
            id="twitter"
            name="twitter"
            type="url"
            placeholder="https://twitter.com/your-handle"
            value={value.twitter || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
