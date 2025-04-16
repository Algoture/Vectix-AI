"use client";
import { useEffect, useState } from "react";
import TakeInterview from "./TakeInterview";
import { voiceInterviewQue } from "@/actions/interview";

const page = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    // async function voice() {
    //   const fetchedata = await voiceInterviewQue();
    //   console.log(fetchedata)
    //   setData(fetchedata);
    // }
    // voice();
  }, []);

  return (
    <>
      <TakeInterview />
      {/* {data.length>0 && data.map((ques,i) => {
        return <p key={i}>{ques }</p>
      })} */}
    </>
  );
};

export default page;
