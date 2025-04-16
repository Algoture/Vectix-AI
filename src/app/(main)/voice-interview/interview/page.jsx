import { voiceInterviewQue } from "@/actions/interview";
import TakeInterview from "./TakeInterview";

const page = () => {
  print();
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return <>
    <TakeInterview />
    
  </>;
};


async function print(){
// const res =await voiceInterviewQue();
// console.log(JSON.parse(res));

}


export default page;
