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
    },
    {
      id: 2,
      title: "Fresh Bread Everyday",
      description: "Order today and receive your package tomorrow by efway",
      img: "/images/greenslide.jpg",
    },
  ];

  return (
    <div
      className="relative z-10 w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/herobg.jpg')" }}
    >
      <Header />
      <div className="pt-[100px] z-20">
        <div className="max-w-[1940px] mx-auto min-h-[650px] relative overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-full !flex !flex-row !items-start"
              >
                {/* Left Side Text */}
                <div className="w-1/2 px-8 pt-5 relative z-50">
                  <div className="max-w-[470px] absolute right-40">
                    <div className="relative">
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
                      {/* Navigation Buttons */}
                      <div className="absolute translate-y-40 left-0 flex gap-3">
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

                {/* Right Side Image */}
                <div className="w-1/2 relative bg-[#7B9A23] max-h-[650px]">
                  <motion.img
                    src={slide.img}
                    alt="Slide Image"
                    className="w-[946px] h-[650px] object-contain"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
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
    </div>
  );
};

export default Homepage;

// "use client";
// import React, { useState, useRef } from "react";
// import Slider from "react-slick";
// import { motion } from "framer-motion";
// import Header from "../Header/page";
// import { RiArrowDropLeftLine } from "react-icons/ri";
// import { RiArrowDropRightLine } from "react-icons/ri";

// const Homepage = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const sliderRef = useRef(null); // Reference for slider control

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     fade: true,
//     arrows: false,
//     beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex), // Track active slide
//   };

//   const slides = [
//     {
//       id: 1,
//       title: "Fresh Bread Everyday",
//       description: "Order today and recieve your package tomorrow by efway",
//       img: "/images/greenslide.jpg",
//     },
//     {
//       id: 2,
//       title: "Fresh Bread Everyday",
//       description: "Order today and recieve your package tomorrow by efway",
//       img: "/images/greenslide.jpg",
//     },
//   ];

//   return (
//     <div
//       className="relative z-40 w-full bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/herobg.jpg')" }}
//     >
//       <Header />
//       <div className="pt-[100px]">
//         {/* Slider Section */}
//         <div className="w-full h-full relative mx-auto min-h-[650px] max-w-[1940px] z-20">
//           <Slider
//             ref={sliderRef}
//             {...settings}
//             className="relative w-full overflow-x-visible"
//           >
//             {slides.map((slide) => (
//               <div
//                 key={slide.id}
//                 className="w-full !flex !flex-row !items-start"
//               >
//                 {/* Left Side Text */}
//                 <div className="w-1/2 px-8 !flex !flex-col !items-start pt-5">
//                   <span className="font-[Satisfy] text-[#8BA73B] block text-[32px] font-normal capitalize italic py-4">
//                     Delivery in 24h
//                   </span>
//                   <h2 className="text-6xl font-extrabold text-white">
//                     {slide.title}
//                   </h2>
//                   <p className="text-lg font-bold text-white w-[400px] py-9">
//                     {slide.description}
//                   </p>
//                   <button className="mt-3 bg-[#8BA73B] rounded-3xl font-bold text-sm px-8 py-3 text-white">
//                     Purchase Now
//                   </button>
//                 </div>

// <div className="w-1/2 h-full relative">
//   <motion.img
//     src={slide.img}
//     alt={slide.subtitle}
//     className="w-full h-full object-contain"
//     // initial={{ x: 100 }} // Start from the right
//     // animate={{ x: 50 }} // Move to center
//     // transition={{
//     //   duration: 1.5,
//     //   ease: "easeInOut",
//     // }}
//   />
// </div>
//               </div>
//             ))}
//           </Slider>

//           {/* Custom Slider Buttons */}
//           <div className="absolute left-10 translate-y-10 flex gap-4">
//             <button
//               onClick={() => sliderRef.current.slickPrev()}
//               className="transform w-[70px] h-[70px] bg-transparent border border-white rounded-full shadow-lg flex items-center justify-center"
//             >
//               <RiArrowDropLeftLine size={60} className="text-white" />
//             </button>

//             <button
//               onClick={() => sliderRef.current.slickNext()}
//               className="transform w-[70px] h-[70px] bg-transparent border border-white rounded-full shadow-lg flex items-center justify-center"
//             >
//               <RiArrowDropRightLine size={60} className="text-white" />
//             </button>
//           </div>
//         </div>

//         {/* French Fries Image - Positioned Absolutely */}
//         <motion.img
//           key={activeSlide} // Key change triggers animation
//           src="/images/re_frenchf.png"
//           alt="French Fries"
//           className="absolute bottom-[90px] left-[-100px] w-[245px] h-[230px]"
//           initial={{ y: 100, opacity: 0 }} // Start from bottom and invisible
//           animate={{
//             y: 0, // Move up to final position
//             opacity: 1, // Fade in
//             scale: [0.9, 1, 0.9], // Zoom in-out effect
//           }}
//           transition={{
//             y: { duration: 1, ease: "easeOut" }, // Transition for y (down to up)
//             opacity: { duration: 1, ease: "easeOut" }, // Transition for opacity
//             scale: {
//               duration: 4,
//               ease: "easeInOut",
//               repeat: Infinity, // Infinite zoom animation
//               delay: 1, // Delay zoom animation until after the initial transition
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Homepage;
