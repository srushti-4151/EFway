import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <>
      <div className="w-full mb-[100px] max-w-[1770px] mx-auto">
        <div className="min-h-[580px] w-full">
          <div className="relative flex">
            <div
              className="relative z-40 w-full h-full bg-cover bg-center transition-[background,border,border-radius,box-shadow] duration-300"
              style={{ backgroundImage: "url('/images/bgbanner.jpg')" }}
            >
              <div className="p-8 w-full relative">
                <div className="relative max-w-[1410px] w-full mx-auto min-h-[520px]">
                  <div className="w-full flex flex-row">
                    <div className="l:w-1/2 md:w-1/2 w-full">
                      <div className="w-full text-left">
                        <div className="max-w-[322px] w-full py-[22px]">
                          <span className="text-[#f6a64d] block font-[Satisfy] text-[26px] font-normal capitalize italic py-5">
                            Deal of the day
                          </span>
                          <p className="text-white font-[Poppins] md:text-[50px] text-[40px] font-extrabold tracking-[-1px]">
                            Oars Store Offer 50% Off
                          </p>
                        </div>
                        <div className="pb-[22px]">
                          <span className="text-[#f6a64d] mr-3 text-[20px] font-semibold w-auto">
                            $17.99
                          </span>
                          <span className="text-[#fff] text-[20px] font-semibold w-auto">
                            $17.99
                          </span>
                        </div>
                        <div className="flex flex-col lg:flex-row md:flex-row gap-4 pb-[22px] items-start justify-start">
                          <p className="text-white font-poppins text-base font-medium leading-6 max-w-full text-start">
                            Fresh deal everyday. Get it <br /> before time runs
                            out!
                          </p>
                          <div className="flex flex-wrap flex-row justify-start">
                            <div className="w-14 flex-none h-12 text-center flex flex-col justify-center relative">
                              <span className="text-[#fff] text-[36px]">
                                00
                              </span>
                              <span className="text-[#fff] text-[12px] font-bold">
                                Days
                              </span>
                            </div>
                            <div className="w-14 flex-none h-12 text-center flex flex-col justify-center relative">
                              <span className="text-[#fff] text-[36px]">
                                00
                              </span>
                              <span className="text-[#fff] text-[12px] font-bold">
                                Hours
                              </span>
                            </div>
                            <div className="w-14 flex-none h-12 text-center flex flex-col justify-center relative">
                              <span className="text-[#fff] text-[36px]">
                                00
                              </span>
                              <span className="text-[#fff] text-[12px] font-bold">
                                Mins
                              </span>
                            </div>
                            <div className="w-14 flex-none h-12 text-center flex flex-col justify-center relative">
                              <span className="text-[#fff] text-[36px]">
                                00
                              </span>
                              <span className="text-[#fff] text-[12px] font-bold">
                                Secs
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link
                          href={"#"}
                          className="bg-[#8BA73B] inline-block text-[#fff] border border-[#8BA73B] text-lg px-10 rounded-3xl py-3 mt-[22px]"
                        >
                          <span className="leading-none">Shop now</span>
                        </Link>
                      </div>
                    </div>
                    <div className="lg:block md:block hidden w-1/2 relative">
                      <div className="absolute top-0 right-0 -mb-[150px]">
                        <img
                          src="images/icecream.png"
                          alt="image"
                          className="w-[568px] h-[655px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
