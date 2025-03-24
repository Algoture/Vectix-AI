const Statistics = () => {
  return (
    <section className="w-full bg-muted/50 py-12 md:py-24 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="cen flex-col space-y-2">
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="text-muted-foreground">Industries Covered</p>
          </div>
          <div className="cen flex-col space-y-2">
            <h3 className="text-4xl font-bold">1000+</h3>
            <p className="text-muted-foreground">Interview Questions</p>
          </div>
          <div className="cen flex-col space-y-2">
            <h3 className="text-4xl font-bold">95%</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
          <div className="cen flex-col space-y-2">
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="text-muted-foreground">AI Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
