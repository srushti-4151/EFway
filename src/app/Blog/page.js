import React from "react";
import { FaCalendarAlt, FaComments } from "react-icons/fa";
import Link from "next/link"; 
const Blog = () => {
  const blogs = [
    {
        id: 1,
        categories: ["Dried Fruits", "Vegetables"],
        title: "Reverse heart disease without meds",
        date: "June 19, 2020",
        comments: "3 Comments",
        image: "/images/blog1.jpg",
        link: "/blog/reverse-heart-disease",
      },
      {
        id: 2,
        categories: ["Milk & Cream", "Vegetables"],
        title: "Cleansing the Body of Parasites",
        date: "June 19, 2020",
        comments: "3 Comments",
        image: "/images/blog2.jpeg",
        link: "/blog/cleansing-body-parasites",
      },
      {
        id: 3,
        categories: ["Fast Food", "Fresh Meat"],
        title: "Keeping Your Fruits and Veggies",
        date: "June 19, 2020",
        comments: "3 Comments",
        image: "/images/blog13.jpeg",
        link: "/blog/keeping-fruits-veggies",
      },
      {
        id: 4,
        categories: ["Breakfast", "Cereal"],
        title: "Tips for Washing Fresh Fruits – Standard",
        date: "June 19, 2020",
        comments: "3 Comments",
        image: "/images/blog4.jpeg",
        link: "/blog/washing-fresh-fruits",
      },
  ];
  return (
    <>
      <div className="relative mb-[80px]">
        <div className="relative max-w-[1410px] w-full mx-auto mt-0 mb-[70px]">
          <div className="w-full">
            <h2 className="text-3xl font-extrabold text-center text-[#8BA73B] mb-6">
              NEWS <span className="text-black">& BLOGS</span>
            </h2>
            <p className="text-base leading-6 max-w-[600px] mx-auto px-4 text-center mb-[55px]">
              Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
                <div className="py-[30px] px-[35px]">
                  <p className="text-gray-500 text-sm mb-4">{blog.category}</p>
                  <h3 className="text-[20px] font-semibold mt-1 leading-[1.2] mb-4">{blog.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <FaCalendarAlt className="mr-1 text-[#8BA73B]"/>
                    <span>{blog.date}</span>
                    <FaComments className="ml-3 mr-1 text-[#8BA73B]" />
                    <span>{blog.comments}</span>
                  </div>
                  <p className="text-gray-600 text-[14px] mb-4 mt-5">
                    Fusce ac pharetra urna. Duis non lacus sit amet lacus
                    interdum facilisis sed non est. Ut mi metus, semper eu …
                  </p>
                  <button className="mt-8 mb-3 px-6 py-2 text-sm font-semibold border border-slate-300 text-[#000] bg-[#fff] rounded-3xl hover:text-[#fff] hover:bg-[#6f8e2e] transition-all duration-300">
                    READ MORE
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Image as Link */}
                <Link href={blog.link}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto object-cover cursor-pointer"
                  />
                </Link>

                <div className="py-[30px] px-[35px]">
                  {/* Categories */}
                  <div className="flex space-x-2 mb-4">
                    {blog.categories.map((category, index) => (
                      <span
                        key={index}
                        className="text-gray-500 text-sm cursor-pointer transition-all duration-300 hover:text-[#8BA73B]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Title as Link */}
                  <Link href={blog.link}>
                    <h3 className="text-[20px] font-semibold mt-1 leading-[1.2] mb-4 cursor-pointer transition-all duration-300 hover:text-[#8BA73B]">
                      {blog.title}
                    </h3>
                  </Link>

                  {/* Date & Comments */}
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <FaCalendarAlt className="mr-1 text-[#8BA73B]" />
                    <Link
                      href={blog.link}
                      className="transition-all duration-300 hover:text-[#8BA73B]"
                    >
                      {blog.date}
                    </Link>
                    <FaComments className="ml-3 mr-1 text-[#8BA73B]" />
                    <span>{blog.comments}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-[14px] mb-4 mt-5">
                    Fusce ac pharetra urna. Duis non lacus sit amet lacus
                    interdum facilisis sed non est. Ut mi metus, semper eu …
                  </p>

                  {/* Read More Button */}
                  <Link href={blog.link}>
                    <button className="mt-8 mb-3 px-6 py-2 text-sm font-semibold border border-slate-300 text-[#000] bg-[#fff] rounded-3xl hover:text-[#fff] hover:bg-[#6f8e2e] transition-all duration-300">
                      READ MORE
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
