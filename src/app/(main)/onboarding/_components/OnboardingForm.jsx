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
import SpecializationSelect from "./SpecializationSelect";
import ExpInput from "./ExpInput";
import SkillsInput from "./SkillsInput";
import BioTextArea from "./BioTextArea";
import { updateUser } from "@/actions/user";
import { industries } from "@/data/industries";

const OnboardingForm = ({
  initialData = null,
  onSuccess,
  isEditing,
  route,
}) => {
  const router = useRouter();
  const [specialization, setSpecialization] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (initialData) {
      const initialSpecialization = initialData.specialization || "";
      setSpecialization(initialSpecialization);
      setExperience(
        initialData.experience != null ? String(initialData.experience) : ""
      );
      setSkills(
        Array.isArray(initialData.skills) ? initialData.skills.join(", ") : ""
      );
      setBio(initialData.bio || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!specialization || experience === "" || !skills) {
      setError(
        "Please fill in all required fields (Specialization, Experience, Skills)."
      );
      return;
    }

    const formData = {
      specialization: specialization,
      experience: parseInt(experience, 10),
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      bio,
    };

    startTransition(async () => {
      const result = await updateUser(formData);
      console.log(formData);
      if (result.success) {
        toast.success("Profile updated successfully!");
        if (onSuccess) {
          onSuccess(result.user);
        } else {
          router.push(route);
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
            {isEditing ? "Edit Your Profile" : "Complete Your Profile"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Update your details."
              : "Provide your details to personalize your experience."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <SpecializationSelect
              specialization={specialization}
              onChange={(value) => setSpecialization(value)}
              subIndustries={industries[0].subIndustries}
            />

            <ExpInput experience={experience} onChange={setExperience} />
            <SkillsInput skills={skills} onChange={setSkills} />
            <BioTextArea bio={bio} onChange={setBio} />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {isEditing ? (
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
            ) : (
              <Button className="w-full" onClick={handleSubmit}>
                Proceed with Profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
