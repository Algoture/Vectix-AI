const page = async ({ params }) => {
  const id = await params.id;
  return <div>Cover Letter ID is {id}</div>;
};

export default page;
