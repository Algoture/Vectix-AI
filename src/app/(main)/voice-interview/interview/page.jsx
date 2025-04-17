"use client";
import { useEffect, useState } from "react";
import TakeInterview from "./TakeInterview";
import { getVoiceQuestions } from "@/actions/interview";

const page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function voice() {
      const fetchedata = await getVoiceQuestions();
      setData(fetchedata);
    }
    voice();
  }, []);

  return (
    <>
      <TakeInterview />
      {data.length>0 && data.map((ques,i) => {
        return <p key={i}>{ques }</p>
      })}
    </>
  );
};

export default page;
