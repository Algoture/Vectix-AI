"use client";
import { useState } from "react";
import TakeInterview from "./TakeInterview";
import {
  genAndSaveInterviewQues,
  getVoiceQuestions,
} from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Brackets, Plus } from "lucide-react";
import { toast } from "sonner";

const VoiceInterviewPage = () => {
  const [data, setData] = useState([]);
  async function voice() {
    try {
      const fetchedata = await getVoiceQuestions();
      toast.success("Questions Fetched Successfully!");
      setData(fetchedata);
    } catch (err) {
      console.error(err);
      toast.error("Failed to Fetch Questions");
    }
  }
  async function generateQues() {
    try {
      await genAndSaveInterviewQues();
      toast.success("Questions Generated Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to Generate Questions");
    }
  }

  return (
    <>
      <TakeInterview />
      <div className="mt-4 cen gap-5">
        <Button onClick={() => generateQues()}>
          Generate <Plus />
        </Button>
        <Button onClick={() => voice()}>
          Questions <Brackets />
        </Button>
      </div>
      <div className="mt-5">
        {data &&
          data.map((ques, i) => {
            return <p key={i}>{ques}</p>;
          })}
      </div>
    </>
  );
};

export default VoiceInterviewPage;
