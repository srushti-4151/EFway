import React from "react";
import { GoPerson } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  return (
    <>
      <div className="absolute top-0 left-0 px-7 py-7 flex items-center justify-between bg-transparent w-full z-50">
        <img src="/images/logo-white.svg" alt="Logo" className="h-11 w-auto" />

        {/* Menu Items */}
        <ul className="flex space-x-6 text-lg">

          {/* Home  */}
          <li className="relative group">
            <Link
              href="#"
              className="text-[#8ba73b] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
            >
              Home
              <RiArrowDropDownLine className="inline-block" />
            </Link>
            <ul className="absolute left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-black shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">Home 2</Link>
              </li>
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">Home 3</Link>
              </li>
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">Home 4</Link>
              </li>
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">Home 5</Link>
              </li>
            </ul>
          </li>

          {/* Shop */}
          <li className="relative group">
            <Link
              href="#"
              className="text-[#fff] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
            >
              Shop<RiArrowDropDownLine className="inline-block" />
            </Link>

            {/* Mega Menu */}
            <div
              className="absolute -left-3 mt-2 hidden text-base px-[15px] pt-[19px] pb-[100px] group-hover:flex bg-white text-black shadow-lg w-[660px] h-[290px] transition-all duration-300 ease-in-out"
              style={{
                backgroundImage: "url('/images/shophover.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-1/3">
                <h3 className="font-bold text-[#000] mb-5">
                  SHOP LAYOUT
                </h3>
                <ul>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Shop Fullwidth</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Shop left sidebar</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Shop right sidebar</Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/3">
                <h3 className="font-bold text-[#000] mb-5">
                  PRODUCT SINGLE
                </h3>
                <ul>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Simple Product</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Variable Product</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Group Product</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Affiliate Product</Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/3">
                <h3 className="font-bold text-[#000] mb-5">
                  PRODUCT PAGE
                </h3>
                <ul>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">My Account</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Checkout</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Cart</Link>
                  </li>
                  <li className="py-1 hover:text-[#8ba73b] text-black text-opacity-75">
                    <Link href="#">Wishlist</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* pages */}
          <li className="relative group">
            <Link
              href="#"
              className="text-[#fff] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
            >
              Page
              <RiArrowDropDownLine className="inline-block" />
            </Link>

            {/* Dropdown Menu */}
            <ul className="absolute left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-black shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">About Us</Link>
              </li>
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">FAQ</Link>
              </li>
              <li className="px-4 py-2 hover:text-[#8ba73b]">
                <Link href="#">404 page</Link>
              </li>
            </ul>
          </li>

          {/* blog */}
          <li className="relative group">
            <Link
              href="#"
              className="text-[#fff] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
            >
              Blog
              <RiArrowDropDownLine className="inline-block" />
            </Link>

            {/* Dropdown Menu */}
            <ul className="absolute left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-black shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
              <li className="px-4 py-1 hover:text-[#8ba73b]">
                <Link href="#">Blog left sidebar</Link>
              </li>
              <li className="px-4 py-1 hover:text-[#8ba73b]">
                <Link href="#">Blog right sidebar</Link>
              </li>
              <li className="px-4 py-1 hover:text-[#8ba73b]">
                <Link href="#">single sidebar</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-[#8ba73b] font-bold text-white transition-all duration-300 ease-in-out"
            >
              On Sale
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-[#8ba73b] font-bold text-white transition-all duration-300 ease-in-out"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-[#8ba73b] font-bold text-white transition-all duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-5 text-white">
          {/* Group container for login with hover to show the form */}
          <div className="relative group">
            <Link href="/login" className="group">
              <div className="flex items-center gap-3 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                  <GoPerson className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
                <div className="leading-5 text-base">
                  Login or
                  <br /> Register{" "}
                </div>
              </div>
            </Link>

            {/* Hidden form that appears on hover */}
            <div className="absolute top-full right-0 hidden group-hover:block bg-white shadow-lg p-6 rounded-md mt-2 w-[300px]">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[#000] text-2xl">Signin</span>
                <span className="text-[#8ba73b] text-sm">
                  create and account
                </span>
              </div>
              <hr className="bg-black h-[2px] mb-4" />
              <form className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="username"
                  className="text-sm text-gray-700 w-full"
                >
                  Username or Email
                  <input
                    type="text"
                    placeholder="Username or email"
                    className="px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:outline-none w-full"
                  />
                </label>
                <label
                  htmlFor="password"
                  className="text-sm text-gray-700 w-full"
                >
                  password
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:outline-none"
                  />
                </label>
                <button className="bg-[#8ba73b] mt-2 text-white px-4 py-3 rounded-3xl transition-all duration-300 ease-in-out">
                  Login
                </button>
                <Link href={"#"} className="text-[#8ba73b] text-sm mt-2">
                  Lost you password?
                </Link>
              </form>
            </div>
          </div>

          <Link href="/wishlist" className="group">
            <div className="flex items-center gap-3 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
              <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                <CiHeart className="text-3xl text-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out" />
                <div className="absolute top-0 -right-3 w-6 h-6 bg-orange-400 text-white text-xs flex justify-center items-center rounded-full">
                  0
                </div>
              </div>
            </div>
          </Link>

          <Link href="/cart" className="group ml-1">
            <div className="flex items-center gap-3 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
              <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                <IoBagHandleOutline className="text-2xl text-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out" />
                <div className="absolute top-0 -right-3 w-6 h-6 bg-[#8ba73b] text-white text-xs flex justify-center items-center rounded-full">
                  0
                </div>
              </div>
              <span className="text-sm ml-1">$0.00</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
