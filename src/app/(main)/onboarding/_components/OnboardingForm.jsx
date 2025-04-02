"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries = [], initialData = null, onSuccess }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const [industry, setIndustry] = useState("");
  const [subIndustry, setSubIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const [selectedIndustryObject, setSelectedIndustryObject] = useState(null);

  useEffect(() => {
    if (initialData) {
      const initialIndustryName = initialData.industry || "";
      const initialSubIndustryName = initialData.subIndustry || "";
      setIndustry(initialIndustryName);
      setSubIndustry(initialSubIndustryName);
      setExperience(
        initialData.experience != null ? String(initialData.experience) : ""
      );
      setSkills(
        Array.isArray(initialData.skills) ? initialData.skills.join(", ") : ""
      );
      setBio(initialData.bio || "");
      const matchingIndustry = industries.find(
        (ind) => ind.name === initialIndustryName
      );
      setSelectedIndustryObject(matchingIndustry || null);
    }
  }, [initialData, industries]);

  const handleIndustryChange = (value) => {
    setIndustry(value);
    const selectedObj = industries.find((ind) => ind.name === value);
    setSelectedIndustryObject(selectedObj || null);
    setSubIndustry("");
  };

  const handleSubIndustryChange = (value) => {
    setSubIndustry(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!industry || !subIndustry || experience === "" || !skills) {
      setError(
        "Please fill in all required fields (Industry, Specialization, Experience, Skills)."
      );
      return;
    }

    const formData = {
      industry,
      subIndustry,
      experience: parseInt(experience, 10),
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      bio,
    };

    startTransition(async () => {
      const result = await updateUser(formData);
      if (result.success) {
        toast.success("Profile updated successfully!");
        if (onSuccess) {
          onSuccess(result.user);
        } else {
          router.push("/dashboard");
        }
      } else {
        console.error("Onboarding failed:", result.message);
        setError(result.message || "An error occurred while saving.");
        toast.error(result.message || "Failed to update profile.");
      }
    });
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-semibold">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Provide your details to personalize your experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              {" "}
              <Label htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Select value={industry} onValueChange={handleIndustryChange}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id || ind.name} value={ind.name}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {industry && selectedIndustryObject && (
              <div className="space-y-1.5">
                <Label htmlFor="subIndustry">
                  Specialization <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={subIndustry}
                  onValueChange={handleSubIndustryChange}
                  disabled={!selectedIndustryObject?.subIndustries?.length} // Disable if no sub-industries
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustryObject?.subIndustries?.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
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
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="skills">
                Skills <span className="text-red-500">*</span>
              </Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-28"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
