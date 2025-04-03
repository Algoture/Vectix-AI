import { voiceInterviewQue } from "@/actions/interview";

const page = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await voiceInterviewQue(jobPosition, jobDesc, jobExp);
    console.log(data);
  };
  return <div>Voice Interview Page</div>;
};

export default page;
