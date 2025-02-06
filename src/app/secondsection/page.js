import Link from "next/link";
import React from "react";
import {
  FaGetPocket,
  FaMoneyBill,
  FaShippingFast,
  FaCreditCard,
} from "react-icons/fa";
import { GiKiwiFruit } from "react-icons/gi";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { GiCakeSlice } from "react-icons/gi";
import { GiWineBottle } from "react-icons/gi";
import { RiSeedlingLine } from "react-icons/ri";

const Secondsection = () => {
  const features = [
    {
      icon: <FaGetPocket className="text-[#8ba73b] text-3xl" />,
      title1: "100%",
      title2: "Satisfaction",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      icon: <FaMoneyBill className="text-[#8ba73b] text-3xl" />,
      title1: "Save 20%",
      title2: "when you",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      icon: <FaShippingFast className="text-[#8ba73b] text-3xl" />,
      title1: "Fast Free",
      title2: "Shipment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      icon: <FaCreditCard className="text-[#8ba73b] text-3xl" />,
      title1: "14-Day",
      title2: "Money back",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ];

  const cardData = [
    {
      bgImage: '/images/banner1.jpg',
      icon: <GiKiwiFruit size={30} className="text-[#5c7026]" />,
      title: "Fruits & Veges",
    },
    {
      bgImage: '/images/banner2.jpg',
      icon: <MdOutlineFreeBreakfast size={30} className="text-[#FAA620]" />,
      title: "Breakfast & Cereal",
    },
    {
      bgImage: '/images/banner3.jpg',
      icon: <GiCakeSlice size={30} className="text-[#B75700]" />,
      title: "Bread & Pastries",
    },
    {
      bgImage: '/images/h4banner4.jpg',
      icon: <GiWineBottle size={30} className="text-[#E27E80]" />,
      title: "Beer, Wine & Spirits",
    },
    {
      bgImage: '/images/h4banner5.jpg',
      icon: <RiSeedlingLine size={30} className="text-[#8BA73B]" />,
      title: "Seeds & Nuts",
    }
  ];

  return (
    <>
      <div
        className="w-full h-[780px] bg-top bg-cover"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <div className="max-w-[1410px] w-full mx-auto">
          <div className="py-20 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col justify-start lg:items-start md:items-start items-center"
              >
                <div className="flex lg:flex-row md:flex-row flex-col justify-start items-center lg:gap-4 mg:gap-4 gap-2">
                  <span className="text-[#8ba73b] text-[18px]">
                    {feature.icon}
                  </span>
                  <h3 className="text-gray-800 hover:text-[#8ba73b] lg:text-left md:text-left text-center font-semibold mt-2 text-[18px]">
                    {feature.title1}
                    <br />
                    {feature.title2}
                  </h3>
                </div>
                <p className="text-gray-600 mt-3 lg:text-left md:text-left text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:block md:block hidden lg:-mt-[460px] md:-mt-[200px] mb-[80px] py-5 px-16 z-10">
        <div className="mx-auto relative w-full flex">
          {/* Left Section*/}
          <div
            className="w-[29%] bg-cover relative flex justify-center items-center"
            style={{ backgroundImage: "url('/images/banner1.jpg')" }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 hover:bg-[rgba(0,0,0,0.4)] transition-all duration-300 hover:rounded-md hover:opacity-70"></div>

            {/* Text Content (Centered) */}
            <div className="group relative z-10 p-[35px_27px] bg-white rounded-md shadow-lg text-center">
              <Link href={"#"} className="flex flex-row items-center gap-2">
                <GiKiwiFruit
                  size={30}
                  className="text-[#5c7026] group-hover:text-[#8ba73b] transition-all duration-500"
                />
                <div className="text-gray-800 group-hover:text-[#8ba73b] font-thin text-[20px] transition-all duration-500">
                  Fruits <br /> & Veges
                </div>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[70%] ml-[15px]">
            <div className="relative w-full flex flex-wrap content-start">
              <div className="mb-[30px] mt-0 w-full relative">
                <div className="min-h-[440px] h-full max-w-[1410px] mx-auto flex relative">
                  <div className="w-full flex">
                    <div
                      className="w-[66.66%] h-full mr-[15px] bg-cover relative flex justify-center items-center"
                      style={{
                        backgroundImage: "url('/images/banner2.jpg')",
                      }}
                    >
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 hover:bg-[rgba(0,0,0,0.4)] transition-all duration-300 hover:rounded-md hover:opacity-70"></div>

                      {/* Text Content (Centered) */}
                      <div className="group relative z-10 p-[35px_27px] bg-white rounded-md shadow-lg text-center">
                        <Link
                          href={"#"}
                          className="flex flex-row items-center gap-2"
                        >
                          <MdOutlineFreeBreakfast
                            size={30}
                            className="text-[#FAA620] group-hover:text-[#8ba73b] transition-all duration-500"
                          />
                          <div className="text-gray-800 group-hover:text-[#8ba73b] font-thin text-[20px] transition-all duration-500">
                            Breakfast <br /> & Cereal
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="w-[33.33%] h-full bg-cover ml-[15px] relative flex justify-center items-center"
                      style={{
                        backgroundImage: "url('/images/banner3.jpg')",
                      }}
                    >
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 hover:bg-[rgba(0,0,0,0.4)] transition-all duration-300 hover:rounded-md hover:opacity-70"></div>

                      {/* Text Content (Centered) */}
                      <div className="group relative z-10 p-[35px_27px] bg-white rounded-md shadow-lg text-center">
                        <Link
                          href={"#"}
                          className="flex flex-row items-center gap-2"
                        >
                          <GiCakeSlice
                            size={30}
                            className="text-[#B75700] group-hover:text-[#8ba73b] transition-all duration-500"
                          />
                          <div className="text-gray-800 group-hover:text-[#8ba73b] font-thin text-[20px] transition-all duration-500">
                            Bread <br /> & Pastries
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-0 w-full h-full relative">
                <div className="min-h-[440px] max-w-[1410px] mx-auto flex relative">
                  <div className="w-full flex">
                    <div
                      className="w-[33.33%] h-full mr-[15px] bg-cover relative flex justify-center items-center"
                      style={{
                        backgroundImage: "url('/images/h4banner4.jpg')",
                      }}
                    >
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 hover:bg-[rgba(0,0,0,0.4)] transition-all duration-300 hover:rounded-md hover:opacity-70"></div>

                      {/* Text Content (Centered) */}
                      <div className="group relative z-10 p-[35px_27px] bg-white rounded-md shadow-lg text-center">
                        <Link
                          href={"#"}
                          className="flex flex-row items-center gap-2"
                        >
                          <GiWineBottle
                            size={30}
                            className="text-[#E27E80] group-hover:text-[#8ba73b] transition-all duration-500"
                          />
                          <div className="text-gray-800 group-hover:text-[#8ba73b] font-thin text-[20px] transition-all duration-500">
                            Beer, Wine <br /> & Spirits
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="w-[66.66%] h-full bg-cover ml-[15px] relative flex justify-center items-center"
                      style={{
                        backgroundImage: "url('/images/h4banner5.jpg')",
                      }}
                    >
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 hover:bg-[rgba(0,0,0,0.4)] transition-all duration-300 hover:rounded-md hover:opacity-70"></div>

                      {/* Text Content (Centered) */}
                      <div className="group relative z-10 p-[35px_27px] bg-white rounded-md shadow-lg text-center">
                        <Link
                          href={"#"}
                          className="flex flex-row items-center gap-2"
                        >
                          <RiSeedlingLine
                            size={30}
                            className="text-[#8BA73B] group-hover:text-[#8ba73b] transition-all duration-500"
                          />
                          <div className="text-gray-800 group-hover:text-[#8ba73b] font-thin text-[20px] transition-all duration-500">
                            Seeds <br /> & Nuts
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden md:hidden relative w-full grid grid-cols-1 gap-7 mt-[40px] mb-[80px] py-5 px-4 z-10">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="relative h-[206px] bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${item.bgImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-40 transition-all duration-300"></div>

            {/* Content Box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md shadow-lg flex flex-col gap-4 items-center max-w-[150px] w-full py-[35px] px-[27px] text-center">
                {item.icon}
                <p className="text-gray-800 text-lg font-medium">
                  {item.title} 
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Secondsection;
