import { Textarea } from "@/components/ui/textarea";
export function TextAreaSection({ title, name, value, onChange, placeholder }) {
  const handleChange = (e) => {
    onChange(e.target.value); 
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <Textarea
        name={name}
        value={value}
        onChange={handleChange}
        className="h-32"
        placeholder={placeholder}
      />
    </div>
  );
}
