import { voiceInterviewQue } from "@/actions/interview";

const page = () => {
  print();
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return <div>Voice Interview Page</div>;
};


async function print(){
// const res =await voiceInterviewQue();
// console.log(JSON.parse(res));

}


export default page;
