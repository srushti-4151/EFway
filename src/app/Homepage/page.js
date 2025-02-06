"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import Header from "../Header/page";

const Homepage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
  };

  const slides = [
    {
      id: 1,
      title: "Fresh Bread Everyday",
      description: "Order today and receive your package tomorrow by efway",
      img: "/images/greenslide.jpg",
      bgColor: "#7B9A23", // Green
    },
    {
      id: 2,
      title: "Fresh Bread Everyday",
      description: "Order today and receive your package tomorrow by efway",
      img: "/images/burger.jpeg",
      bgColor: "#D48D3D", // orange
    },
    {
      id: 3,
      title: "Fresh Bread Everyday",
      description: "Order today and receive your package tomorrow by efway",
      img: "/images/green2.jpeg",
      bgColor: "#7DAE38", // Green2
    },
  ];

  return (
    <div
      className="relative z-10 w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/herobg.jpg')" }}
    >
      <Header />
      <div className="md:block lg:block hidden pt-[100px] z-20">
        <div className="max-w-[1940px] mx-auto lg:min-h-[650px] md:h-[550px] relative overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-full !flex !flex-row !items-start"
              >
                {/* Left Side Text */}
                <div className="w-1/2 px-8 pt-5 relative z-50">
                  <div className="lg:max-w-[470px] md:max-w-[290px] absolute lg:right-40 md:right-20">
                    <div className="relative">
                      <motion.div
                        key={activeSlide} // key prop ensures the animation restarts on slide change
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <motion.span
                          key={`span-${activeSlide}`} // key added for individual elements
                          className="font-[Satisfy] text-[#8BA73B] block lg:text-[32px] md:text[22px] font-normal capitalize italic py-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        >
                          Delivery in 24h
                        </motion.span>

                        <motion.h2
                          key={`h2-${activeSlide}`} // key added for individual elements
                          className="lg:text-6xl md:text-4xl font-extrabold text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.4,
                          }}
                        >
                          {slide.title}
                        </motion.h2>

                        <motion.p
                          key={`p-${activeSlide}`} // key added for individual elements
                          className="lg:text-lg md:text-base font-bold text-white py-9"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.6,
                          }}
                        >
                          {slide.description}
                        </motion.p>

                        <motion.button
                          key={`button-${activeSlide}`} // key added for individual elements
                          className="mt-3 bg-[#8BA73B] rounded-3xl font-bold text-sm px-8 py-3 text-white z-50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.8,
                          }}
                        >
                          Purchase Now
                        </motion.button>
                      </motion.div>

                      {/* Navigation Buttons */}
                      <div className="absolute lg:translate-y-40 md:translate-y-20 left-0 flex gap-3">
                        <button
                          onClick={() => sliderRef.current.slickPrev()}
                          className="w-[60px] h-[60px] border border-white hover:bg-[#8BA73B] transition-all duration-300 rounded-full flex items-center justify-center"
                        >
                          <RiArrowDropLeftLine
                            size={50}
                            className="text-white"
                          />
                        </button>
                        <button
                          onClick={() => sliderRef.current.slickNext()}
                          className="w-[60px] h-[60px] border border-white hover:bg-[#8BA73B] rounded-full transition-all duration-300 flex items-center justify-center"
                        >
                          <RiArrowDropRightLine
                            size={50}
                            className="text-white"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Image with Animation */}
                <motion.div
                  key={activeSlide}
                  className="w-1/2 relative max-h-[650px]"
                  style={{ backgroundColor: slides[activeSlide].bgColor }}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    x: { duration: 1.5, ease: "easeOut" },
                    opacity: { duration: 1.5, ease: "easeInOut" },
                  }}
                >
                  <motion.img
                    src={slide.img}
                    alt="Slide Image"
                    className="w-[946px] h-[650px] object-contain"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{
                      x: { duration: 1.5, ease: "easeOut" },
                      opacity: { duration: 1.5, ease: "easeInOut" },
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
        {/* French Fries Image - Positioned Absolutely */}
        <motion.img
          key={activeSlide}
          src="/images/re_frenchf.png"
          alt="French Fries"
          className="absolute bottom-[90px] -z-10 left-[-100px] w-[245px] h-[230px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            y: { duration: 1, ease: "easeOut" },
            opacity: { duration: 1, ease: "easeOut" },
            scale: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            },
          }}
        />
      </div>

      <div className="md:hidden lg:hidden block pt-[100px] z-20">
        <div className="max-w-[1940px] mx-auto lg:min-h-[650px] md:h-[550px] relative overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-full !flex !flex-row !items-start"
              >
                {/* Image with Animation */}
                <motion.div
                  key={activeSlide}
                  className="w-full relative max-h-[450px]"
                  style={{ backgroundColor: slides[activeSlide].bgColor }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{
                    x: { duration: 1.5, ease: "easeOut" },
                    opacity: { duration: 1.5, ease: "easeInOut" },
                  }}
                >
                  <motion.div
                    style={{
                      backgroundImage: `url(${slide.img})`,
                      backgroundSize: "cover", // Equivalent to object-cover
                      backgroundPosition: "center", // Centers the background image
                      backgroundRepeat: "no-repeat", // Ensures no repeating
                      height: "450px",
                      width: "450px",
                    }}
                    alt="Slide Image"
                    className="relative w-[946px] h-[450px] object-cover"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{
                      x: { duration: 1.5, ease: "easeOut" },
                      opacity: { duration: 1.5, ease: "easeInOut" },
                    }}
                  />
                  <div className="absolute w-[75%] h-[65%] bg-black bg-opacity-70 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col text-center px-6">
                    <motion.span
                      key={`span-${activeSlide}`}
                      className="font-[Satisfy] text-[#8BA73B] block text-[22px] font-normal capitalize italic py-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    >
                      Delivery in 24h
                    </motion.span>

                    <motion.h2
                      key={`h2-${activeSlide}`}
                      className="text-4xl font-extrabold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                    >
                      {slide.title}
                    </motion.h2>

                    <motion.p
                      key={`p-${activeSlide}`}
                      className="text-sm font-bold text-white py-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.6,
                      }}
                    >
                      {slide.description}
                    </motion.p>

                    <motion.button
                      key={`button-${activeSlide}`}
                      className="mt-2 bg-[#8BA73B] rounded-3xl font-bold text-xs px-7 py-3 text-white z-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.8,
                      }}
                    >
                      Purchase Now
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

{
  /* <div>
                        <span className="font-[Satisfy] text-[#8BA73B] block text-[32px] font-normal capitalize italic py-4">
                          Delivery in 24h
                        </span>
                        <h2 className="text-6xl font-extrabold text-white">
                          {slide.title}
                        </h2>
                        <p className="text-lg font-bold text-white w-[400px] py-9">
                          {slide.description}
                        </p>
                        <button className="mt-3 bg-[#8BA73B] rounded-3xl font-bold text-sm px-8 py-3 text-white z-50">
                          Purchase Now
                        </button>
                      </div> */
}

{
  /* Right Side Image */
}
{
  /* <div className="w-1/2 relative max-h-[650px]"
                style={{ backgroundColor: slides[activeSlide].bgColor }}
                >
                  <motion.img
                    src={slide.img}
                    alt="Slide Image"
                    className="w-[946px] h-[650px] object-contain"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div> */
}
