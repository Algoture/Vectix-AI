import { steps } from "@/data/howitworks";
function HowItWorks() {
  return (
    <div className=" py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 ">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-semibold sm:text-4xl">
            How Vectix AI Works
          </p>
        </div>
        <div className="mx-auto mt-4 max-w-2xl sm:mt-10 lg:mt-14 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <span className="text-white">{step.id}</span>
                  </div>
                  {step.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
export default HowItWorks;
