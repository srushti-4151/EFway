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

const Cartpage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((item) => item.id === cart?.id);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

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
  };

  return (
    <>
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat overflow-x-hidden"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <div className="w-full max-w-[1410px] mx-auto px-4 mt-10 relative bg-transparent">
          <div className="w-full md:flex hidden border-b border-gray-300 z-50 py-3 bg-white">
            <div className="w-1/2 text-[#000] text-[14px] pl-5">
              New Offers This Weekend only to{" "}
              <span className="text-[#8ba73b]">Get 50%</span> Flate
            </div>
            <div className="w-1/2 flex items-end justify-end pr-5">
              <ul className="flex space-x-6">
                <li className="flex items-center space-x-2">
                  <IoLocationSharp className="text-lg text-gray-700" />
                  <span className="text-gray-800">Store location</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaHeadphones className="text-lg text-gray-700" />
                  <span className="text-gray-800">(+048) - 1800 33 689</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto md:flex flex-row hidden items-center justify-start gap-0 bg-white w-full z-50">
            <div className="w-[30%] h-full flex justify-start border-r border-gray-600">
              <img
                src="/images/logo-black.svg"
                alt="Logo"
                className="h-auto w-[192px] ml-7 mr-7"
              />
            </div>

            <div className="w-full pb-3 pt-7 px-7 flex flex-col gap-4">
              {/* Menu Items */}
              <div className="flex justify-between mb-2">
                <div className="relative w-[700px]">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full py-4 px-4 pr-24 text-sm border rounded-3xl focus:outline-none"
                  />
                  <button className="absolute text-sm font-bold right-1 top-1/2 transform -translate-y-1/2 bg-[#8ba73b] text-white px-5 py-3 rounded-3xl">
                    Search
                  </button>
                </div>
                <div className="w-auto flex items-center justify-center gap-4 text-black">
                  {/* Group container for login with hover to show the form */}
                  <div className="relative group p-2">
                    <Link href="/login" className="group">
                      <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
                        <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
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
                            {/* {cart.length || 0} */} 0
                          </div>
                        </div>
                        <div className="leading-5 text-sm ml-1">
                          {/* ${totalAmount.toFixed(2) || 0} */} 0
                        </div>
                      </div>
                    </Link>

                    {/* Hidden form that appears on hover */}
                    {/* <div className="absolute top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-md w-[330px] transition-opacity duration-500 ease-in-out">
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
                          className="text-black text-sm"
                        >
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
              </div> */}
                  </div>
                </div>
              </div>
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
                    className="text-[#000] p-4 hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
                    className="p-4 text-[#000] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
                    className="p-4 text-[#000] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
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
                    className="p-4 hover:text-[#8ba73b] text-[#000] transition-all duration-300 ease-in-out"
                  >
                    On Sale
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="p-4 hover:text-[#8ba73b] text-black transition-all duration-300 ease-in-out"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="p-4 hover:text-[#8ba73b] text-black transition-all duration-300 ease-in-out"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:hidden top-0 left-0 px-7 py-7 flex items-center justify-between bg-[#fff] w-full z-50">
            <img
              src="/images/logo-black.svg"
              alt="Logo"
              className="h-11 w-auto"
            />
            <div className="md:hidden">
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
              <span className="inline-block mr-2 px-6 py-2 bg-white rounded-3xl">
                <Link href="/">
                  <FaHome className="text-gray-700" />
                </Link>
              </span>
              <span className="inline-block mx-2 px-6 py-2 bg-white rounded-3xl">
                <span className="text-[#8ba73b]">Cart</span>
              </span>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl mt-7 font-bold">Cart</h1>
          </div>
        </div>

        <div className="w-full max-w-[1410px] mx-auto px-4 mt-10 mb-10 relative bg-transparent container p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
            {/* Cart Items */}
            <div className="md:col-span-2 bg-white p-4 rounded-lg py-[30px] px-[35px]">
              {cart.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full hidden md:table border-collapse">
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id} className="border-b">
                          {/* Product Image & Name */}
                          <td className="text-center pt-[41px] pr-[25px] pb-[36px]">
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-black inline-block text-sm"
                            >
                              <RxCross2 />
                            </button>
                          </td>
                          <td className="flex items-center space-x-4 py-4 pt-[41px] pr-[25px] pb-[36px]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg"
                            />
                          </td>
                          <td className="pt-[41px] pr-[25px] pb-[36px]">
                            {item.name}
                          </td>

                          {/* Price */}
                          <td className="text-center pt-[41px] pr-[25px] pb-[36px]">
                            ${item.caloriesPerServing.toFixed(2)}
                          </td>

                          {/* Quantity */}
                          <td className="text-center pt-[41px] pr-[25px] pb-[36px]">
                            <div className="flex items-center justify-center border rounded-3xl px-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2 py-1 text-sm font-bold"
                              >
                                -
                              </button>
                              <span className="mx-4 text-lg text-[#626262]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 text-sm font-bold"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          {/* Subtotal */}
                          <td className="text-right pt-[41px] pr-[25px] pb-[36px]">
                            $
                            {(item.caloriesPerServing * item.quantity).toFixed(
                              2
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="md:hidden">
                    {cart.length > 0 ? (
                      <div className="border-b">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 bg-white border-b mb-5"
                          >
                            {/* Product Image */}
                            <div className="flex justify-center pb-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-right pb-2">
                                <span className="font-semibold">Product</span>
                                <span>{item.name}</span>
                              </div>

                              <div className="flex justify-between pb-2">
                                <span className="font-semibold">Price</span>
                                <span>
                                  ${item.caloriesPerServing.toFixed(2)}
                                </span>
                              </div>

                              <div className="flex justify-between pb-2">
                                <span className="font-semibold">Quantity</span>
                                <div className="flex items-center border rounded-3xl px-2">
                                  <button
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                    className="px-3 py-2 text-sm font-bold"
                                  >
                                    -
                                  </button>
                                  <span className="mx-4 text-lg text-[#626262]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                    className="px-3 py-2 text-sm font-bold"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <span className="font-semibold">Subtotal</span>
                                <span className="font-bold">
                                  $
                                  {(
                                    item.caloriesPerServing * item.quantity
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">
                        Your cart is empty
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              )}
            </div>

            {/* Cart Totals */}
            <div className="py-[30px] px-[35px] bg-white">
              <div className="bg-[#F8F8F8] p-10 rounded-lg shadow">
                <h2 className="text-2xl font-bold pb-6 border-b">
                  Cart Totals
                </h2>

                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-6 text-left">Subtotal:</td>
                      <td className="py-6 text-left">
                        ${totalAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-6 text-left">Total:</td>
                      <td className="py-6 text-left font-bold text-xl">
                        ${totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button className="w-full mt-6 bg-[#8BA73B] text-white py-2 rounded-3xl text-sm">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cartpage;
