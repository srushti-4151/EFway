"use client";
import React, { useState } from "react";
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
import { removeCart } from "../redux/slices/cartSlice";
import Swal from "sweetalert2";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
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

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this product from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCart(id));
        Swal.fire("Removed!", "The product has been removed.", "success");
      }
    });
  }

  return (
    <>
      <div className="absolute top-0 left-0 px-7 py-4 md:flex lg:flex hidden items-center justify-between bg-transparent w-full z-50">
        <img src="/images/logo-white.svg" alt="Logo" className="h-11 w-auto" />

        {/* Menu Items */}
        <ul className="flex text-[16px]">
          {/* Home  */}
          <li className="relative group">
            <Link
              href="#"
              className="text-[#8ba73b] p-4 font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
              className="text-[#fff] p-4 font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
                <h3 className="font-bold text-[#000] mb-5">SHOP LAYOUT</h3>
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
                <h3 className="font-bold text-[#000] mb-5">PRODUCT SINGLE</h3>
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
                <h3 className="font-bold text-[#000] mb-5">PRODUCT PAGE</h3>
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
              className="p-4 text-[#fff] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
              className="p-4 text-[#fff] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
              className="p-4 hover:text-[#8ba73b] font-bold text-white transition-all duration-300 ease-in-out"
            >
              On Sale
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="p-4 hover:text-[#8ba73b] font-bold text-white transition-all duration-300 ease-in-out"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="p-4 hover:text-[#8ba73b] font-bold text-white transition-all duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-center gap-1 text-white">
          {/* Group container for login with hover to show the form */}
          <div className="relative group p-2">
            <Link href="/login" className="group">
              <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                  <GoPerson className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
                <div className="leading-5 text-base">
                  Login <span className="text-[#8ba73b]">or</span>
                  <br /> Register{" "}
                </div>
              </div>
            </Link>

            {/* Hidden form that appears on hover */}
            <div className="absolute top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg p-6 rounded-md w-[300px] transition-opacity duration-500 ease-in-out">
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

          <div className="relative group p-2">
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
          </div>

          <div className="relative group p-2">
            <Link href="/login" className="group">
              <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                  <IoBagHandleOutline className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute top-0 -right-3 w-6 h-6 bg-[#8ba73b] text-white text-xs flex justify-center items-center rounded-full">
                    {cart.length || 0}
                  </div>
                </div>
                <div className="leading-5 text-sm ml-1">
                  ${totalAmount.toFixed(2) || 0}
                </div>
              </div>
            </Link>

            {/* Hidden form that appears on hover */}
            <div className="absolute top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-md w-[330px] transition-opacity duration-500 ease-in-out">
              <h3 className="text-[16px] text-[#000] border-b flex items-center justify-end px-5 py-4">
                Subtotal:{" "}
                <span className="text-[#000] font-semibold">
                  ${totalAmount.toFixed(2)}
                </span>
              </h3>
              <div className="mt-2 space-y-3">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b text-[#000] px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-[15px] font-semibold pb-1">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-[15px]">
                            {item.quantity}{" "}
                            <RxCross2 size={13} className="inline-block" />
                            <span className="text-[#D48D3D]">
                              {" "}
                              ${item.caloriesPerServing.toFixed(2) || 0}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                      onClick={() => handleRemove(item.id)}
                      className="text-black text-sm">
                        <RxCross2 />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    Your cart is empty
                  </p>
                )}
              </div>
              <div className="flex justify-between px-5 py-4">
                <Link
                  href="/cart"
                  className="px-4 py-2 border bg-[#fff] text-[#8ba73b] hover:bg-[#728a31] hover:text-[#fff] rounded-3xl text-sm transition-all duration-500"
                >
                  View Cart
                </Link>
                <button className="px-4 py-2 bg-[#8ba73b] text-white hover:bg-[#728a31] rounded-3xl text-sm">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden absolute top-0 left-0 px-7 py-7 flex items-center justify-between bg-[#F2F4EC] w-full z-50">
        <img src="/images/logo-black.svg" alt="Logo" className="h-11 w-auto" />
        <div className="md:hidden">
          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-3xl text-[#000]"
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
              className="absolute top-4 right-4 text-2xl"
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
                          <FaChevronRight />
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
                    <FaChevronLeft className="mr-2" />
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
    </>
  );
};

export default Header;
