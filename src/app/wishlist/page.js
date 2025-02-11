"use client";
import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { removeCart, updateQuantity } from "../redux/slices/cartSlice";
import { FaHeadphones } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import Footer from "../Footer/page";
import { TbHeartX } from "react-icons/tb";

const WishlistPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [quantities, setQuantities] = useState({});

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.caloriesPerServing * item.quantity,
    0
  );

  const menuItems = [
    { name: "Home", hasSubmenu: true },
    { name: "Shop" },
    { name: "Pages", hasSubmenu: true },
    { name: "Blog", hasSubmenu: true },
    { name: "On Sale" },
    { name: "About Us" },
    { name: "Contact" },
  ];

  const submenus = {
    Home: ["Home2", "Home3", "Home4", "Home5"],
    Pages: ["FAQ", "Privacy Policy", "Terms of Service"],
    Blog: ["Latest News", "Fashion Tips", "Trends"],
  };

  return (
    <>
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-[15px] mt-10 relative bg-transparent">
          {/* first part */}
          <div className="w-full lg:flex hidden border-b border-gray-300 z-50 bg-white">
            <div className="w-1/2 text-[#747474] text-[14px] py-3 pl-5">
              New Offers This Weekend only to{" "}
              <span className="text-[#8ba73b]">Get 50%</span> Flate
            </div>
            <div className="w-1/2 flex items-end justify-end pr-5">
              <ul className="flex space-x-6">
                <li className="flex items-center gap-1 px-2 border-l text-sm">
                  <IoLocationSharp className="text-[#767676]" />
                  <span className="text-[#747474] py-3">Store location</span>
                </li>
                <li className="flex items-center gap-1 px-2 border-l text-sm">
                  <FaHeadphones className="text-[#767676]" />
                  <span className="text-[#747474] py-3">
                    (+048) - 1800 33 689
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* second part */}
          <div className="mx-auto lg:flex flex-row hidden items-center justify-start gap-0 bg-white w-full z-50">
            <div className="w-[21.35%] h-full flex justify-start">
              <Link href="/" className="w-full pl-[30px]">
                <img
                  src="/images/logo-black.svg"
                  alt="Logo"
                  className="h-auto w-[192px]"
                />
              </Link>
            </div>

            <div className="w-[78.65%] pb-3 pt-7 px-[30px] flex flex-col gap-4 border-l border-gray-300">
              {/* Menu Items */}
              <div className="px-[5px] flex 2xl:flex-row 2xl:justify-between lg:gap-2 lg:flex-col lg:items-start">
                <div className="relative w-[680px]">
                  <input
                    type="email"
                    placeholder="Search among 1000,000 products..."
                    className="w-full py-[14px] px-6 text-sm border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#8ba73b] focus:border-transparent"
                  />
                  <button className="absolute text-sm font-bold right-2 top-1/2 transform -translate-y-1/2 bg-[#8ba73b] text-white px-7 py-[9px] rounded-3xl hover:bg-[#7a9732] transition-colors duration-300">
                    Search
                  </button>
                </div>
                <div className="w-auto flex items-center justify-center gap-3 text-[#27272f]">
                  {/* Group container for login with hover to show the form */}
                  <div className="relative group p-2">
                    <Link href="/login" className="group">
                      <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                        <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
                          <GoPerson className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                        </div>
                        <div className="leading-5 text-[14px] font-bold">
                          Login <span className="text-[#8ba73b]">or</span>
                          <br /> Register{" "}
                        </div>
                      </div>
                    </Link>

                    {/* Hidden form that appears on hover */}
                    <div className="absolute z-50 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg p-6 rounded-md w-[300px] transition-opacity duration-500 ease-in-out">
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
                        <Link
                          href={"#"}
                          className="text-[#8ba73b] text-sm mt-2"
                        >
                          Lost you password?
                        </Link>
                      </form>
                    </div>
                  </div>

                  <div className="relative group p-2">
                    <Link href="/wishlist" className="group">
                      <div className="flex items-center gap-3 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                        <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
                          <CiHeart className="text-3xl text-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out" />
                          <div className="absolute top-0 -right-3 w-6 h-6 bg-orange-400 text-white text-xs flex justify-center items-center rounded-full">
                            0
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="relative group p-2">
                    <Link href="/cart" className="group">
                      <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                        <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
                          <IoBagHandleOutline className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                          <div className="absolute top-0 -right-3 w-6 h-6 bg-[#8ba73b] text-white text-xs flex justify-center items-center rounded-full">
                            {/* {cart.length || 0} */}0
                          </div>
                        </div>
                        <div className="leading-5 text-[#27272f] text-sm font-bold ml-2">
                          {/* ${totalAmount.toFixed(2) || 0} */}0
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <ul className="flex text-[16px] mb-2">
                {/* Home  */}
                <li className="relative group">
                  <Link
                    href="#"
                    className="text-[#000] py-[10px] px-[15px] cursor-pointer font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                  >
                    Home
                    <RiArrowDropDownLine className="inline-block" />
                  </Link>
                  <ul className="absolute left-0 top-full -translate-y-1 mt-0 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
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
                    className="text-[#8ba73b] cursor-pointer p-4 py-[10px] px-[15px] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                  >
                    Shop
                    <RiArrowDropDownLine className="inline-block" />
                  </Link>

                  {/* Mega Menu */}
                  <div
                    className="absolute text-[14px] -left-3 mt-2 px-[27px] pt-[29px] pb-[100px] hidden group-hover:flex bg-white text-black shadow-lg w-[660px] h-[290px] transition-all duration-300 ease-in-out"
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
                      <ul className="space-y-1">
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Shop Fullwidth
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Shop left sidebar
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Shop right sidebar
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-[#000] mb-5">
                        PRODUCT SINGLE
                      </h3>
                      <ul className="space-y-1">
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Simple Product
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Variable Product
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Group Product
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Affiliate Product
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/3">
                      <h3 className="font-bold text-[#000] mb-5">
                        PRODUCT PAGE
                      </h3>
                      <ul>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            My Account
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Checkout
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Cart
                          </Link>
                        </li>
                        <li className="text-black text-opacity-75">
                          <Link href="#" className="hover:text-[#8ba73b]">
                            Wishlist
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* pages */}
                <li className="relative group">
                  <Link
                    href="#"
                    className="py-[10px] px-[15px] cursor-pointer font-bold  text-[#27272f] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                  >
                    Page
                    <RiArrowDropDownLine className="inline-block" />
                  </Link>

                  {/* Dropdown Menu */}
                  <ul className="absolute left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
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
                    className="py-[10px] px-[15px] cursor-pointer font-bold text-[#27272f] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
                  >
                    Blog
                    <RiArrowDropDownLine className="inline-block" />
                  </Link>

                  {/* Dropdown Menu */}
                  <ul className="absolute left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
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
                    className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
                  >
                    On Sale
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:hidden top-0 left-0 px-7 py-7 flex items-center justify-between bg-[#fff] w-full z-50">
            <img
              src="/images/logo-black.svg"
              alt="Logo"
              className="h-11 w-auto"
            />
            <div className="lg:hidden">
              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="text-xl text-[#000]"
              >
                <IoMenu />
              </button>

              {/* Sidebar Menu */}
              <div
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform ${
                  menuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 text-lg"
                >
                  <IoClose />
                </button>

                {/* Main Menu */}
                <nav className="mt-12 px-6">
                  {!submenu ? (
                    <ul className="space-y-4 text-lg">
                      {menuItems.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center py-2 border-b"
                        >
                          <span>{item.name}</span>
                          {item.hasSubmenu && (
                            <button onClick={() => setSubmenu(item.name)}>
                              <FaChevronRight size={12} />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    // Submenu Panel
                    <div>
                      {/* Back Button */}
                      <button
                        onClick={() => setSubmenu(null)}
                        className="flex items-center justify-center text-lg mb-4"
                      >
                        <FaChevronLeft size={12} className="mr-2" />
                      </button>
                      <ul className="space-y-4 text-lg">
                        {submenus[submenu]?.map((subItem, index) => (
                          <li key={index} className="py-2 border-b">
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </nav>
              </div>

              {/* Overlay when menu is open */}
              {menuOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setMenuOpen(false)}
                ></div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1410px] mx-auto px-4 mt-10 relative bg-transparent">
          <div className="flex flex-col justify-center items-start">
            <div className="flex mt-6 max-w-lg">
              <div className="flex justify-center items-center mr-2 px-6 py-2 bg-white rounded-3xl">
                <Link href="/">
                  <FaHome className="text-gray-700" />
                </Link>
              </div>
              <div className="flex justify-center items-center mx-2 px-6 py-2 bg-white rounded-3xl">
                <span className="text-[#8ba73b]">Wishlist</span>
              </div>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl mt-7 font-bold">Wishlist</h1>
          </div>
        </div>

        <div className="w-full max-w-[1410px] mx-auto px-4 mt-7 mb-10 relative bg-transparent container p-6">
          <div className="bg-white pt-[27px] px-[30px] pb-[35px] rounded-md shadow ">
            <p className="text-[32px] p-[5px] mt-[20px] font-bold">My wishlist on Efway</p>
            <div className="flex flex-col items-center justify-center bg-white pt-[80px] pb-[35px] px-[15px]">
              <TbHeartX size={200} className="text-[#D7D7D7] mb-12" />
              <p className="text-gray-900 text-[24px] font-medium">
                No products added to the wishlist
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
