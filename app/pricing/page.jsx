import Nav from "../dashboard/_components/Header";
import { Tick } from "../Icons";

export default function page() {
  return (
    <>
      <Nav />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 mb-4">
              Choose your plan
            </h2>
            <p className="text-gray-500 text-center leading-6 mb-9">
              7 Days free trial. No credit card required.
            </p>
            <div className="flex justify-center items-center">
              <label className="min-w-[3.5rem] text-xl relative text-gray-900 mr-4 font-medium">
                Bill Monthly
              </label>
              <input
                type="checkbox"
                id="basic-with-description"
                className="relative shrink-0 w-11 h-6 p-0.5 bg-indigo-100 checked:bg-none checked:bg-indigo-100 rounded-full cursor-pointer transition-colors ease-in-out duration-200  focus:border-blue-600  appearance-none 
                            before:inline-block before:w-5 before:h-5 before:bg-primary checked:before:bg-primary before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform  before:transition before:ease-in-out before:duration-200 "
              />
              <label className="relative min-w-[3.5rem] font-medium text-xl text-gray-500 ml-4 ">
                Bill Yearly
              </label>
            </div>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
            <div className="flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100">
              <h3 className="font-manrope text-2xl font-bold mb-3">Free</h3>
              <div className="flex items-center mb-6">
                <span className="font-manrope mr-2 text-6xl font-semibold">
                  $0
                </span>
                <span className="text-xl text-gray-500 ">/ month</span>
              </div>
              <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>2 auto tracking</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>7 Day transaction clearing </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>24/7 Customer support </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>All widget access</span>
                </li>
              </ul>
              <a
                href="javascript:;"
                className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700">
                Purchase Plan
              </a>
            </div>
            <div className="flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl bg-indigo-50 transition-all duration-500 hover:bg-indigo-100 ">
              <div className="uppercase bg-gradient-to-r from-primary to-violet-600 rounded-t-2xl p-3 text-center text-white">
                MOST POPULAR
              </div>
              <div className="p-6 xl:py-9 xl:px-12">
                <h3 className="font-manrope text-2xl font-bold mb-3">
                  Advanced
                </h3>
                <div className="flex items-center mb-6">
                  <span className="font-manrope mr-2 text-6xl font-semibold text-primary">
                    $150
                  </span>
                  <span className="text-xl text-gray-500 ">/ month</span>
                </div>
                <ul className="mb-12 space-y-6 text-left text-lg ">
                  <li className="flex items-center space-x-4">
                    <Tick/>
                    <span>AI Advisor</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Tick/>
                    <span>Unlimited auto tracking</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Tick/>
                    <span>1 Day transaction clearing </span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Tick/>
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <Tick/>
                    <span>All Widget Access</span>
                  </li>
                </ul>
                <a
                  href="javascript:;"
                  className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit block mx-auto hover:bg-indigo-700">
                  Purchase Plan
                </a>
              </div>
            </div>
            <div className="flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100">
              <h3 className="font-manrope text-2xl font-bold mb-3">Team</h3>
              <div className="flex items-center mb-6">
                <span className="font-manrope mr-2 text-6xl font-semibold">
                  $180
                </span>
                <span className="text-xl text-gray-500 ">/ month</span>
              </div>
              <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>AI Advisor</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>Unlimited auto tracking </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>1 Day transaction clearing </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Tick />
                  <span>All Widget Access</span>
                </li>
              </ul>
              <a
                href="javascript:;"
                className="py-2.5 px-5 bg-primary shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-indigo-700">
                Purchase Plan
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
