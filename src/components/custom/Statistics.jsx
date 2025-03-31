const Statistics = () => {
  return (
    <section className="w-full bg-accent py-12 md:py-24 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {[
            { value: "50+", label: "Industries Covered" },
            { value: "1000+", label: "Interview Questions" },
            { value: "95%", label: "Success Rate" },
            { value: "24/7", label: "AI Support" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <h3 className="text-4xl font-bold">{item.value}</h3>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
