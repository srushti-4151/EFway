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
import { FaHeadphones } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { GoGitCompare } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import Footer from "@/app/Footer/page";
import {
  addCart,
  removeCart,
  updateQuantity,
} from "@/app/redux/slices/cartSlice";
import { useParams } from "next/navigation";
import { BiHeart } from "react-icons/bi";
import { PiBagBold } from "react-icons/pi";
import { LiaFireAltSolid } from "react-icons/lia";
import { TbClockHour2 } from "react-icons/tb";
import { FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { BsPinterest } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProductDetailsClient = ({ productData, tagsData, moreRecData, recipesData, activeTag: initialActiveTag }) => {
  const [product, setProduct] = useState(productData);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((item) => item.id === product?.id);

  const params = useParams();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const [tags, setTags] = useState(tagsData);
  //   const [activeTag, setActiveTag] = useState("");
  //   const [recipes, setRecipes] = useState([]);
  const [activeTag, setActiveTag] = useState(initialActiveTag);
  const [recipes, setRecipes] = useState(recipesData);
  const [MoreRec, setMoreRec] = useState(moreRecData);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    router.push(`/product-details/${params.name}?tag=${tag}`);
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.caloriesPerServing * item.quantity,
    0
  );

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1); // Reset quantity if the item is not in the cart
    }
  }, [cartItem]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (!item) return;

    const cartItem = cart.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
      // Update quantity if the item is already in the cart
      dispatch(
        updateQuantity({ id: item.id, quantity: cartItem.quantity + 1 })
      );
      toast.success("Cart updated!");
    } else {
      // Add new item to the cart
      dispatch(addCart({ ...item, quantity: 1 }));
      toast.success("Added to Cart!");
    }
  };

  const menuItems = [
    { name: "Home", hasSubmenu: true, href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Pages", hasSubmenu: true, href: "/" },
    { name: "Blog", hasSubmenu: true, href: "/" },
    { name: "On Sale", href: "/" },
    { name: "About Us", href: "/" },
    { name: "Contact", href: "/" },
  ];
  const submenus = {
    Home: [
      { name: "Home2", href: "/" },
      { name: "Home3", href: "/" },
      { name: "Home4", href: "/" },
      { name: "Home5", href: "/" },
    ],
    Pages: [
      { name: "FAQ", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
    ],
    Blog: [
      { name: "Latest News", href: "/" },
      { name: "Fashion Tips", href: "/" },
      { name: "Trends", href: "/" },
    ],
  };

  useEffect(() => {
    setProduct(productData);
    setTags(tagsData);
    setMoreRec(moreRecData);
    setRecipes(recipesData); // Add this if recipesData is used
  }, [productData, tagsData, moreRecData, recipesData]);

  const formatProductNameForURL = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/-/g, "~");
  };

  const handleProductClick = (recipe) => {
    setProduct(recipe); // Set the clicked recipe's data into the product state
    const encodedName = formatProductNameForURL(recipe.name); // Format the recipe name for URL
    router.push(`/product-details/${encodedName}`); // Update the URL
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

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-[15px] pt-10 relative bg-transparent">
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
                        <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
                          <IoBagHandleOutline className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                          <div className="absolute top-0 -right-3 w-6 h-6 bg-[#8ba73b] text-white text-xs flex justify-center items-center rounded-full">
                            {/* {cart.length || 0} */}
                            {cart?.length ?? 0}
                          </div>
                        </div>
                        <div className="leading-5 text-sm ml-1">
                          {/* ${totalAmount.toFixed(2) || 0} */}$
                          {totalAmount?.toFixed(2) ?? "0.00"}
                        </div>
                      </div>
                    </Link>

                    {/* Hidden form that appears on hover */}
                    <div className="absolute z-50 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-md w-[330px] transition-opacity duration-500 ease-in-out">
                      <h3 className="text-[16px] text-[#000] border-b flex items-center justify-end px-5 py-4">
                        <span className="mr-2">Subtotal:</span>
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
                                    <RxCross2
                                      size={13}
                                      className="inline-block"
                                    />
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
                    </div>
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
                  <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-0 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
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
                    className="absolute z-50 text-[14px] -left-3 mt-2 px-[27px] pt-[29px] pb-[100px] hidden group-hover:flex bg-white text-black shadow-lg w-[660px] h-[290px] transition-all duration-300 ease-in-out"
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
                  <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
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
                  <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
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
            <Link href="/" className="w-full">
              <img
                src="/images/logo-black.svg"
                alt="Logo"
                className="h-11 w-auto"
              />
            </Link>
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
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex-1"
                          >
                            {item.name}
                          </Link>
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
                            <Link
                              href={subItem.href}
                              onClick={() => setMenuOpen(false)}
                              className="block"
                            >
                              {subItem.name}
                            </Link>
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

        <div className="w-full max-w-[1440px] mx-auto px-4 mt-10 relative bg-transparent">
          <div className="flex flex-col justify-center items-start">
            <div className="flex mt-6 max-w-lg">
              <div className="flex justify-center items-center mr-2 px-6 py-1 bg-white rounded-3xl">
                <Link href="/">
                  <FaHome className="text-gray-700" />
                </Link>
              </div>
              <div className="flex justify-center items-center mx-2 px-6 py-1 bg-white rounded-3xl">
                <button
                  onClick={() => {
                    setActiveTag("");
                  }}
                  className="text-gray-700 hover:text-[#8ba73b]"
                >
                  Products{" "}
                </button>
              </div>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl mt-7 font-bold">Product Details</h1>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto md:px-4 px-0 mt-10 pb-20 relative bg-transparent min-h-screen">
          <div className="lg:flex block items-start gap-4 relative">
            {/* Sidebar - Visible only on lg screens */}
            <aside className="hidden lg:block w-1/4 sticky self-start top-5 h-fit">
              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  PRODUCT CATEGORIES
                </h2>
                <ul className="text-gray-600">
                  {tags.slice(20, 30).map((tag) => (
                    <li
                      key={tag}
                      className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
                        activeTag === tag ? "text-[#8ba73b] font-bold" : ""
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products on sale */}
              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  Products on sale
                </h2>
                {loading ? (
                  <div className="text-center py-10 w-full">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {recipes.slice(0, 4).map((recipe) => (
                      <div
                        key={recipe.id}
                        className="group p-2 relative transition-all ease-out duration-300 h-full flex bg-white rounded-md shadow-lg overflow-hidden mb-0"
                      >
                        <button onClick={() => handleProductClick(recipe)}>
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </button>

                        <div className="px-2">
                          <div>
                            <h3 className="text-[14px] mb-3 text-gray-800 hover:text-[#8BA73B] leading-[1.4] overflow-hidden transition-all duration-300">
                              <button
                                onClick={() => handleProductClick(recipe)}
                              >
                                {recipe.name}
                              </button>
                            </h3>
                            <div className="flex items-center mb-1 text-[#8BA73B] text-sm">
                              {product?.rating &&
                                [...Array(Math.floor(product.rating))].map(
                                  (_, i) => (
                                    <span key={i}>
                                      <FaStar />
                                    </span>
                                  )
                                )}
                              {product?.rating % 1 !== 0 && (
                                <span>
                                  <FaStar />
                                </span>
                              )}
                              <span className="ml-2 flex items-center text-[#F6A64D] text-sm">
                                {recipe.rating}
                              </span>
                            </div>
                            <p className="text-gray-800 font-bold text-[18px]">
                              ${recipe.caloriesPerServing}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            <div className="flex-1 p-4 pt-0">
              {/* Product Details */}
              <div className="bg-white pt-[27px] px-[30px] pb-[35px] mb-[50px]">
                {loading || !product ? (
                  <div className="text-center py-10 w-full">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                      <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap ">
                    <div className="px-[15px] md:sticky top-5 h-fit md:flex-none md:basis-[41.6666%] md:max-w-[41.6666%]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className=""
                      />
                    </div>

                    <div className="px-[15px] md:flex-none md:basis-[58.3333%] md:max-w-[58.3333%] text-[#27272f]">
                      <h1 className="text-[30px] font-semibold mb-2">
                        {product.name}
                      </h1>

                      <div className="flex items-center mt-3 text-[#8BA73B] text-xl">
                        {product?.rating &&
                          [...Array(Math.floor(product.rating))].map((_, i) => (
                            <span key={i}>
                              <FaStar />
                            </span>
                          ))}
                        {product?.rating % 1 !== 0 && (
                          <span>
                            <FaStar />
                          </span>
                        )}
                      </div>
                      <p className="text-[#F6A64D] font-bold text-2xl mt-3">
                        ${product.caloriesPerServing}
                      </p>
                      <h2 className="text-xl mt-3 mb-2">Ingredients :</h2>
                      <ul className="list-disc list-inside text-gray-700">
                        {product.ingredients?.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>

                      <div className="mt-2 text-sm text-gray-600">
                        <p className="flex items-center justify-start gap-1 my-1">
                          <TbClockHour2
                            className="text-gray-900 inline-block"
                            size={22}
                          />
                          Prep Time:
                          <span className="font-semibold ml-1">
                            {product.prepTimeMinutes} mins
                          </span>
                        </p>
                        <p className="flex items-center justify-start gap-[2px] my-1">
                          <LiaFireAltSolid
                            className="text-orange-500 inline-block"
                            size={25}
                          />
                          Cook Time:
                          <span className="font-semibold ml-1">
                            {product.cookTimeMinutes} mins
                          </span>
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-xl mt-3 mb-2">Instructions:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-900">
                          {product.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-row flex-wrap mt-7 justify-start items-center gap-2">
                        {cartItem ? (
                          <Link
                            href="/cart"
                            className="bg-[#8BA73B] mb-1 text-white text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6c832e] transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <PiBagBold
                              size={20}
                              className="inline-block font-bold"
                            />
                            <span className="leading-none">
                              Already in Cart
                            </span>
                          </Link>
                        ) : (
                          <>
                            <div className="flex items-center border-2 rounded-3xl px-1">
                              <button
                                onClick={decreaseQuantity}
                                className="px-3 py-3 text-sm font-bold"
                              >
                                -
                              </button>
                              <span className="mx-4 text-lg text-[#626262]">
                                {quantity}
                              </span>
                              <button
                                onClick={increaseQuantity}
                                className="px-3 py-3 text-sm font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="bg-[#8BA73B] text-[#fff] text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6A802D] transition-all duration-300 flex items-center justify-center gap-2"
                              onClick={() => handleAddToCart(product)}
                            >
                              <PiBagBold
                                size={20}
                                className="inline-block font-bold"
                              />
                              <span className="leading-none">ADD TO CART</span>
                            </button>
                            <button className="w-10 h-10 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                              <BiHeart size={25} />
                            </button>
                          </>
                        )}
                      </div>
                      <p className="text-black mt-4">
                        <span className="font-medium text-[17px]">Tags:</span>{" "}
                        <span className="text-[#6A802D]">
                          {" "}
                          {product.tags.join(", ")}
                        </span>
                      </p>
                      <p className="text-black mt-2">
                        <span className="font-medium text-[17px]">
                          mealType:
                        </span>{" "}
                        <span className="text-[#6A802D]">
                          {" "}
                          {product.mealType.join(", ")}
                        </span>
                      </p>
                      <div className="mt-7 flex flex-row flex-wrap items-center justify-start">
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#3B5998] bg-[#3B5998]">
                          <TiSocialFacebook
                            className="text-[#fff] cursor-pointer"
                            size={22}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#00A8E8] bg-[#00A8E8]">
                          <FaTwitter
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#0377AE] bg-[#0377AE]">
                          <FaLinkedinIn
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#32506D] bg-[#32506D]">
                          <FaInstagram
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#88A33B] bg-[#88A33B]">
                          <FaGoogle
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />{" "}
                          <span className="text-[10px] text-[#fff] group-hover:text-[#8BA73B]">
                            +
                          </span>
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#CB2027] bg-[#CB2027]">
                          <BsPinterest
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                        <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#8BA73B] bg-[#8BA73B]">
                          <IoMdMail
                            className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
                            size={15}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* You may also like */}
              {loading ? (
                <div className="text-center py-10 w-full">loading.....</div>
              ) : (
                <div>
                  <h1 className="mb-[30px] pb-[19px] text-[22px] text-[#27272f] font-bold border-b border-[#e3e3d9] border-1">
                    You may also like
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {MoreRec.slice(30, 33).map((recipe) => (
                      <div
                        key={recipe.id}
                        className="group p-6 relative transition-all ease-out duration-300 h-full flex flex-col bg-white rounded-md shadow-lg overflow-hidden mb-0"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full cursor-pointer object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent interference
                              handleProductClick(recipe);
                            }}
                          />

                          <Link
                            href={`/product/${formatProductNameForURL(
                              recipe.name
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e]">
                              <CiSearch size={20} />
                            </div>
                          </Link>
                        </div>

                        <div className="mt-5 mb-1">
                          <div>
                            <Link
                              href={"#"}
                              className="text-[13px] font-semibold leading-[28px] text-[#8BA73B] mt-4 italic"
                            >
                              {recipe.cuisine}
                            </Link>
                            <h3 className="text-[15px] font-bold text-gray-800 leading-[1.4] overflow-hidden max-h-[3em] h-[3em] hover:underline">
                              <button
                                onClick={() => handleProductClick(recipe)}
                              >
                                {recipe.name}
                              </button>
                            </h3>
                            <p className="text-[#8BA73B] font-bold text-xl mt-1">
                              ${recipe.caloriesPerServing}
                            </p>
                          </div>

                          <div className="flex items-center mt-3 text-[#F6A64D] text-lg">
                            Rating : {recipe.rating}
                          </div>

                          <div className="flex flex-row mt-5 justify-between">
                            {cart.some((item) => item.id === recipe.id) ? (
                              <Link
                                href="/cart"
                                className="bg-[#8BA73B] mb-1 text-white text-[14px] px-5 rounded-3xl py-2 hover:bg-[#6c832e] transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                <PiBagBold
                                  size={20}
                                  className="inline-block font-bold"
                                />
                                <span className="leading-none">
                                  Already in Cart
                                </span>
                              </Link>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleAddToCart(recipe)}
                                  className="bg-[#fff] text-gray-800 border border-gray-400 hover:text-[#fff] text-xs px-5 rounded-3xl py-2 hover:bg-[#8BA73B] transition-all duration-300 flex items-center justify-center gap-1"
                                >
                                  <CiShoppingCart
                                    size={16}
                                    className="inline-block"
                                  />
                                  <span className="leading-none lg:inline-block hidden">
                                    ADD TO CART
                                  </span>
                                </button>
                                <div className="flex items-center text-gray-800">
                                  <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                                    <CiHeart size={25} />
                                  </button>
                                  <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                                    <GoGitCompare size={19} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Sidebar - Visible only on meduim and mobile*/}
              <aside className="lg:hidden block w-full mt-10">
                <div className="py-5 px-7 mb-[30px] shadow bg-white">
                  <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                    PRODUCT CATEGORIES
                  </h2>
                  <ul className="text-gray-600">
                    {tags.slice(0, 10).map((tag) => (
                      <li
                        key={tag}
                        className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
                          activeTag === tag ? "text-[#8ba73b] font-bold" : ""
                        }`}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="py-5 px-7 mb-[30px] shadow bg-white">
                  <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                    Products on sale
                  </h2>
                  {loading ? (
                    <div className="text-center py-10 w-full">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                        <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {recipes.slice(0, 4).map((recipe) => (
                        <div
                          key={recipe.id}
                          className="group p-2 relative transition-all ease-out duration-300 h-full flex bg-white rounded-md shadow-lg overflow-hidden mb-0"
                        >
                          <button onClick={() => handleProductClick(recipe)}>
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </button>

                          <div className="px-2">
                            <div>
                              <h3 className="text-[14px] mb-3 text-gray-800 hover:text-[#8BA73B] leading-[1.4] overflow-hidden transition-all duration-300">
                                <button
                                  onClick={() => handleProductClick(recipe)}
                                >
                                  {recipe.name}
                                </button>
                              </h3>
                              <div className="flex items-center mb-1 text-[#8BA73B] text-sm">
                                {product?.rating &&
                                  [...Array(Math.floor(product.rating))].map(
                                    (_, i) => (
                                      <span key={i}>
                                        <FaStar />
                                      </span>
                                    )
                                  )}
                                {product?.rating % 1 !== 0 && (
                                  <span>
                                    <FaStar />
                                  </span>
                                )}
                                <span className="ml-2 flex items-center text-[#F6A64D] text-sm">
                                  {recipe.rating}
                                </span>
                              </div>
                              <p className="text-gray-800 font-bold text-[18px]">
                                ${recipe.caloriesPerServing}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsClient;

// "use client";
// import React, { useEffect, useState } from "react";
// import { GoPerson } from "react-icons/go";
// import { CiHeart } from "react-icons/ci";
// import { IoBagHandleOutline } from "react-icons/io5";
// import Link from "next/link";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { IoClose } from "react-icons/io5";
// import { IoMenu } from "react-icons/io5";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import { FaHeadphones } from "react-icons/fa";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";
// import { CiShoppingCart } from "react-icons/ci";
// import { useDispatch, useSelector } from "react-redux";
// import { GoGitCompare } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { RxCross2 } from "react-icons/rx";
// import { HiMiniMinusSmall } from "react-icons/hi2";
// import { FaStar } from "react-icons/fa";
// import Footer from "@/app/Footer/page";
// import {
//   addCart,
//   removeCart,
//   updateQuantity,
// } from "@/app/redux/slices/cartSlice";
// import { useParams } from "next/navigation";
// import { BiHeart } from "react-icons/bi";
// import { PiBagBold } from "react-icons/pi";
// import { LiaFireAltSolid } from "react-icons/lia";
// import { TbClockHour2 } from "react-icons/tb";
// import { FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { TiSocialFacebook } from "react-icons/ti";
// import { BsPinterest } from "react-icons/bs";
// import { IoMdMail } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function ProductDetailsClient({ product, tags, recipes, MoreRec }) {

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [submenu, setSubmenu] = useState(null);

//     const [quantity, setQuantity] = useState(1);
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.cart.cart);
//     const cartItem = cart.find((item) => item.id === product?.id);

//     useEffect(() => {
//       if (cartItem) setQuantity(cartItem.quantity);
//     }, [cartItem]);

//     const totalAmount = cart.reduce(
//         (acc, item) => acc + item.caloriesPerServing * item.quantity,
//         0
//     );

//     const handleAddToCart = (item) => {
//       if (!item) return;
//       const cartItem = cart.find((cartItem) => cartItem.id === item.id);
//       if (cartItem) {
//         dispatch(updateQuantity({ id: item.id, quantity: cartItem.quantity + 1 }));
//       } else {
//         dispatch(addCart({ ...item, quantity: 1 }));
//       }
//     };

//     const handleRemove = (id) => {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "Do you really want to remove this product from your cart?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, remove it!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           dispatch(removeCart(id));
//         }
//       });
//     };
//     const menuItems = [
//         { name: "Home", hasSubmenu: true, href: "/" },
//         { name: "Shop", href: "/shop" },
//         { name: "Pages", hasSubmenu: true, href: "/" },
//         { name: "Blog", hasSubmenu: true, href: "/" },
//         { name: "On Sale", href: "/" },
//         { name: "About Us", href: "/" },
//         { name: "Contact", href: "/" },
//     ];
//     const submenus = {
//         Home: [
//           { name: "Home2", href: "/" },
//           { name: "Home3", href: "/" },
//           { name: "Home4", href: "/" },
//           { name: "Home5", href: "/" },
//         ],
//         Pages: [
//           { name: "FAQ", href: "/" },
//           { name: "Privacy Policy", href: "/" },
//           { name: "Terms of Service", href: "/" },
//         ],
//         Blog: [
//           { name: "Latest News", href: "/" },
//           { name: "Fashion Tips", href: "/" },
//           { name: "Trends", href: "/" },
//         ],
//     };
//   return (
//     <>
//       <div
//         className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat"
//         style={{ backgroundImage: "url('/images/bg-body.png')" }}
//       >
//         <div className="w-full max-w-[1440px] mx-auto px-[15px] pt-10 relative bg-transparent">
//           {/* first part */}
//           <div className="w-full lg:flex hidden border-b border-gray-300 z-50 bg-white">
//             <div className="w-1/2 text-[#747474] text-[14px] py-3 pl-5">
//               New Offers This Weekend only to{" "}
//               <span className="text-[#8ba73b]">Get 50%</span> Flate
//             </div>
//             <div className="w-1/2 flex items-end justify-end pr-5">
//               <ul className="flex space-x-6">
//                 <li className="flex items-center gap-1 px-2 border-l text-sm">
//                   <IoLocationSharp className="text-[#767676]" />
//                   <span className="text-[#747474] py-3">Store location</span>
//                 </li>
//                 <li className="flex items-center gap-1 px-2 border-l text-sm">
//                   <FaHeadphones className="text-[#767676]" />
//                   <span className="text-[#747474] py-3">
//                     (+048) - 1800 33 689
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           {/* second part */}
//           <div className="mx-auto lg:flex flex-row hidden items-center justify-start gap-0 bg-white w-full z-50">
//             <div className="w-[21.35%] h-full flex justify-start">
//               <Link href="/" className="w-full pl-[30px]">
//                 <img
//                   src="/images/logo-black.svg"
//                   alt="Logo"
//                   className="h-auto w-[192px]"
//                 />
//               </Link>
//             </div>

//             <div className="w-[78.65%] pb-3 pt-7 px-[30px] flex flex-col gap-4 border-l border-gray-300">
//               {/* Menu Items */}
//               <div className="px-[5px] flex 2xl:flex-row 2xl:justify-between lg:gap-2 lg:flex-col lg:items-start">
//                 <div className="relative w-[680px]">
//                   <input
//                     type="email"
//                     placeholder="Search among 1000,000 products..."
//                     className="w-full py-[14px] px-6 text-sm border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#8ba73b] focus:border-transparent"
//                   />
//                   <button className="absolute text-sm font-bold right-2 top-1/2 transform -translate-y-1/2 bg-[#8ba73b] text-white px-7 py-[9px] rounded-3xl hover:bg-[#7a9732] transition-colors duration-300">
//                     Search
//                   </button>
//                 </div>
//                 <div className="w-auto flex items-center justify-center gap-3 text-[#27272f]">
//                   {/* Group container for login with hover to show the form */}
//                   <div className="relative group p-2">
//                     <Link href="/login" className="group">
//                       <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
//                         <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
//                           <GoPerson className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
//                         </div>
//                         <div className="leading-5 text-[14px] font-bold">
//                           Login <span className="text-[#8ba73b]">or</span>
//                           <br /> Register{" "}
//                         </div>
//                       </div>
//                     </Link>

//                     {/* Hidden form that appears on hover */}
//                     <div className="absolute z-50 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg p-6 rounded-md w-[300px] transition-opacity duration-500 ease-in-out">
//                       <div className="flex justify-between items-end mb-1">
//                         <span className="text-[#000] text-2xl">Signin</span>
//                         <span className="text-[#8ba73b] text-sm">
//                           create and account
//                         </span>
//                       </div>
//                       <hr className="bg-black h-[2px] mb-4" />
//                       <form className="flex flex-col gap-2 w-full">
//                         <label
//                           htmlFor="username"
//                           className="text-sm text-gray-700 w-full"
//                         >
//                           Username or Email
//                           <input
//                             type="text"
//                             placeholder="Username or email"
//                             className="px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:outline-none w-full"
//                           />
//                         </label>
//                         <label
//                           htmlFor="password"
//                           className="text-sm text-gray-700 w-full"
//                         >
//                           password
//                           <input
//                             type="password"
//                             placeholder="Password"
//                             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:outline-none"
//                           />
//                         </label>
//                         <button className="bg-[#8ba73b] mt-2 text-white px-4 py-3 rounded-3xl transition-all duration-300 ease-in-out">
//                           Login
//                         </button>
//                         <Link
//                           href={"#"}
//                           className="text-[#8ba73b] text-sm mt-2"
//                         >
//                           Lost you password?
//                         </Link>
//                       </form>
//                     </div>
//                   </div>

//                   <div className="relative group p-2">
//                     <Link href="/wishlist" className="group">
//                       <div className="flex items-center gap-3 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
//                         <div className="w-10 h-10 bg-[#F2F4EC] relative rounded-full flex justify-center items-start">
//                           <CiHeart className="text-3xl text-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out" />
//                           <div className="absolute top-0 -right-3 w-6 h-6 bg-orange-400 text-white text-xs flex justify-center items-center rounded-full">
//                             0
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>

//                   <div className="relative group p-2">
//                     <Link href="/cart" className="group">
//                       <div className="flex items-center gap-2 group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out">
//                         <div className="w-10 h-10 bg-white relative rounded-full flex justify-center items-start">
//                           <IoBagHandleOutline className="text-2xl text-black group-hover:text-[#8ba73b] transition-all duration-300 ease-in-out absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
//                           <div className="absolute top-0 -right-3 w-6 h-6 bg-[#8ba73b] text-white text-xs flex justify-center items-center rounded-full">
//                             {/* {cart.length || 0} */}
//                             {cart?.length ?? 0}
//                           </div>
//                         </div>
//                         <div className="leading-5 text-sm ml-1">
//                           {/* ${totalAmount.toFixed(2) || 0} */}
//                           ${totalAmount?.toFixed(2) ?? "0.00"}
//                         </div>
//                       </div>
//                     </Link>

//                     {/* Hidden form that appears on hover */}
//                     <div className="absolute z-50 top-full right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-md w-[330px] transition-opacity duration-500 ease-in-out">
//                       <h3 className="text-[16px] text-[#000] border-b flex items-center justify-end px-5 py-4">
//                         <span className="mr-2">Subtotal:</span>
//                         <span className="text-[#000] font-semibold">
//                           ${totalAmount.toFixed(2)}
//                         </span>
//                       </h3>
//                       <div className="mt-2 space-y-3">
//                         {cart.length > 0 ? (
//                           cart.map((item) => (
//                             <div
//                               key={item.id}
//                               className="flex items-center justify-between border-b text-[#000] px-5 py-4"
//                             >
//                               <div className="flex items-center gap-3">
//                                 <img
//                                   src={item.image}
//                                   alt={item.name}
//                                   className="w-10 h-10 object-cover rounded-md"
//                                 />
//                                 <div>
//                                   <p className="text-[15px] font-semibold pb-1">
//                                     {item.name}
//                                   </p>
//                                   <p className="text-gray-500 text-[15px]">
//                                     {item.quantity}{" "}
//                                     <RxCross2
//                                       size={13}
//                                       className="inline-block"
//                                     />
//                                     <span className="text-[#D48D3D]">
//                                       {" "}
//                                       ${item.caloriesPerServing.toFixed(2) || 0}
//                                     </span>
//                                   </p>
//                                 </div>
//                               </div>
//                               <button
//                                 onClick={() => handleRemove(item.id)}
//                                 className="text-black text-sm"
//                               >
//                                 <RxCross2 />
//                               </button>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-center text-gray-500">
//                             Your cart is empty
//                           </p>
//                         )}
//                       </div>
//                       <div className="flex justify-between px-5 py-4">
//                         <Link
//                           href="/cart"
//                           className="px-4 py-2 border bg-[#fff] text-[#8ba73b] hover:bg-[#728a31] hover:text-[#fff] rounded-3xl text-sm transition-all duration-500"
//                         >
//                           View Cart
//                         </Link>
//                         <button className="px-4 py-2 bg-[#8ba73b] text-white hover:bg-[#728a31] rounded-3xl text-sm">
//                           Checkout
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <ul className="flex text-[16px] mb-2">
//                 {/* Home  */}
//                 <li className="relative group">
//                   <Link
//                     href="#"
//                     className="text-[#000] py-[10px] px-[15px] cursor-pointer font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
//                   >
//                     Home
//                     <RiArrowDropDownLine className="inline-block" />
//                   </Link>
//                   <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-0 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">Home 2</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">Home 3</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">Home 4</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">Home 5</Link>
//                     </li>
//                   </ul>
//                 </li>

//                 {/* Shop */}
//                 <li className="relative group">
//                   <Link
//                     href="#"
//                     className="text-[#8ba73b] cursor-pointer p-4 py-[10px] px-[15px] font-bold hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
//                   >
//                     Shop
//                     <RiArrowDropDownLine className="inline-block" />
//                   </Link>

//                   {/* Mega Menu */}
//                   <div
//                     className="absolute z-50 text-[14px] -left-3 mt-2 px-[27px] pt-[29px] pb-[100px] hidden group-hover:flex bg-white text-black shadow-lg w-[660px] h-[290px] transition-all duration-300 ease-in-out"
//                     style={{
//                       backgroundImage: "url('/images/shophover.jpg')",
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                     }}
//                   >
//                     <div className="w-1/3">
//                       <h3 className="font-bold text-[#000] mb-5">
//                         SHOP LAYOUT
//                       </h3>
//                       <ul className="space-y-1">
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Shop Fullwidth
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Shop left sidebar
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Shop right sidebar
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="w-1/3">
//                       <h3 className="font-bold text-[#000] mb-5">
//                         PRODUCT SINGLE
//                       </h3>
//                       <ul className="space-y-1">
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Simple Product
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Variable Product
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Group Product
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Affiliate Product
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="w-1/3">
//                       <h3 className="font-bold text-[#000] mb-5">
//                         PRODUCT PAGE
//                       </h3>
//                       <ul>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             My Account
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Checkout
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Cart
//                           </Link>
//                         </li>
//                         <li className="text-black text-opacity-75">
//                           <Link href="#" className="hover:text-[#8ba73b]">
//                             Wishlist
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </li>

//                 {/* pages */}
//                 <li className="relative group">
//                   <Link
//                     href="#"
//                     className="py-[10px] px-[15px] cursor-pointer font-bold  text-[#27272f] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
//                   >
//                     Page
//                     <RiArrowDropDownLine className="inline-block" />
//                   </Link>

//                   {/* Dropdown Menu */}
//                   <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">About Us</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">FAQ</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:text-[#8ba73b]">
//                       <Link href="#">404 page</Link>
//                     </li>
//                   </ul>
//                 </li>

//                 {/* blog */}
//                 <li className="relative group">
//                   <Link
//                     href="#"
//                     className="py-[10px] px-[15px] cursor-pointer font-bold text-[#27272f] hover:text-[#8ba73b] transition-all duration-500 ease-in-out"
//                   >
//                     Blog
//                     <RiArrowDropDownLine className="inline-block" />
//                   </Link>

//                   {/* Dropdown Menu */}
//                   <ul className="absolute z-50 left-0 top-full -translate-y-1 mt-2 hidden group-hover:block bg-white text-[#27272f] shadow-lg w-60 transition-all duration-500 ease-in-out py-4">
//                     <li className="px-4 py-1 hover:text-[#8ba73b]">
//                       <Link href="#">Blog left sidebar</Link>
//                     </li>
//                     <li className="px-4 py-1 hover:text-[#8ba73b]">
//                       <Link href="#">Blog right sidebar</Link>
//                     </li>
//                     <li className="px-4 py-1 hover:text-[#8ba73b]">
//                       <Link href="#">single sidebar</Link>
//                     </li>
//                   </ul>
//                 </li>

//                 <li>
//                   <Link
//                     href="#"
//                     className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
//                   >
//                     On Sale
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="#"
//                     className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
//                   >
//                     About Us
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="#"
//                     className="py-[10px] px-[15px] font-bold  hover:text-[#8ba73b] text-[#27272f] transition-all duration-300 ease-in-out"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="lg:hidden top-0 left-0 px-7 py-7 flex items-center justify-between bg-[#fff] w-full z-50">
//             <Link href="/" className="w-full">
//               <img
//                 src="/images/logo-black.svg"
//                 alt="Logo"
//                 className="h-11 w-auto"
//               />
//             </Link>
//             <div className="lg:hidden">
//               {/* Hamburger Button */}
//               <button
//                 onClick={() => setMenuOpen(true)}
//                 className="text-xl text-[#000]"
//               >
//                 <IoMenu />
//               </button>

//               {/* Sidebar Menu */}
//               <div
//                 className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform ${
//                   menuOpen ? "translate-x-0" : "-translate-x-full"
//                 } transition-transform duration-300`}
//               >
//                 {/* Close Button */}
//                 <button
//                   onClick={() => setMenuOpen(false)}
//                   className="absolute top-4 right-4 text-lg"
//                 >
//                   <IoClose />
//                 </button>

//                 {/* Main Menu */}
//                 <nav className="mt-12 px-6">
//                   {!submenu ? (
//                     <ul className="space-y-4 text-lg">
//                       {menuItems.map((item, index) => (
//                         <li
//                           key={index}
//                           className="flex justify-between items-center py-2 border-b"
//                         >
//                           <Link
//                             href={item.href}
//                             onClick={() => setMenuOpen(false)}
//                             className="flex-1"
//                           >
//                             {item.name}
//                           </Link>
//                           {item.hasSubmenu && (
//                             <button onClick={() => setSubmenu(item.name)}>
//                               <FaChevronRight size={12} />
//                             </button>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     // Submenu Panel
//                     <div>
//                       {/* Back Button */}
//                       <button
//                         onClick={() => setSubmenu(null)}
//                         className="flex items-center justify-center text-lg mb-4"
//                       >
//                         <FaChevronLeft size={12} className="mr-2" />
//                       </button>
//                       <ul className="space-y-4 text-lg">
//                         {submenus[submenu]?.map((subItem, index) => (
//                           <li key={index} className="py-2 border-b">
//                             <Link
//                               href={subItem.href}
//                               onClick={() => setMenuOpen(false)}
//                               className="block"
//                             >
//                               {subItem.name}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </nav>
//               </div>

//               {/* Overlay when menu is open */}
//               {menuOpen && (
//                 <div
//                   className="fixed inset-0 bg-black bg-opacity-50 z-40"
//                   onClick={() => setMenuOpen(false)}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-[1440px] mx-auto px-4 mt-10 relative bg-transparent">
//           <div className="flex flex-col justify-center items-start">
//             <div className="flex mt-6 max-w-lg">
//               <div className="flex justify-center items-center mr-2 px-6 py-1 bg-white rounded-3xl">
//                 <Link href="/">
//                   <FaHome className="text-gray-700" />
//                 </Link>
//               </div>
//               <div className="flex justify-center items-center mx-2 px-6 py-1 bg-white rounded-3xl">
//                 <button
//                   onClick={() => {
//                     setActiveTag("");
//                   }}
//                   className="text-gray-700 hover:text-[#8ba73b]"
//                 >
//                   Products{" "}
//                 </button>
//               </div>
//             </div>

//             {/* Page Header */}
//             <h1 className="text-4xl mt-7 font-bold">Product Details</h1>
//           </div>
//         </div>

//         <div className="w-full max-w-[1440px] mx-auto md:px-4 px-0 mt-10 pb-20 relative bg-transparent min-h-screen">
//           <div className="lg:flex block items-start gap-4 relative">
//             {/* Sidebar - Visible only on lg screens */}
//             <aside className="hidden lg:block w-1/4 sticky self-start top-5 h-fit">
//               <div className="py-5 px-7 mb-[30px] shadow bg-white">
//                 <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
//                   PRODUCT CATEGORIES
//                 </h2>
//                 <ul className="text-gray-600">
//                   {tags.slice(20, 30).map((tag) => (
//                     <li
//                       key={tag}
//                       className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
//                         activeTag === tag ? "text-[#8ba73b] font-bold" : ""
//                       }`}
//                       onClick={() => setActiveTag(tag)}
//                     >
//                       {tag}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Products on sale */}
//               <div className="py-5 px-7 mb-[30px] shadow bg-white">
//                 <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
//                   Products on sale
//                 </h2>
//                 {loading ? (
//                   <div className="text-center py-10 w-full">
//                     <div className="flex justify-center items-center space-x-2">
//                       <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
//                       <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
//                       <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 gap-6">
//                     {recipes.slice(0, 4).map((recipe) => (
//                       <div
//                         key={recipe.id}
//                         className="group p-2 relative transition-all ease-out duration-300 h-full flex bg-white rounded-md shadow-lg overflow-hidden mb-0"
//                       >
//                         <button onClick={() => handleProductClick(recipe)}>
//                           <img
//                             src={recipe.image}
//                             alt={recipe.name}
//                             className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
//                           />
//                         </button>

//                         <div className="px-2">
//                           <div>
//                             <h3 className="text-[14px] mb-3 text-gray-800 hover:text-[#8BA73B] leading-[1.4] overflow-hidden transition-all duration-300">
//                               <button
//                                 onClick={() => handleProductClick(recipe)}
//                               >
//                                 {recipe.name}
//                               </button>
//                             </h3>
//                             <div className="flex items-center mb-1 text-[#8BA73B] text-sm">
//                               {product?.rating &&
//                                 [...Array(Math.floor(product.rating))].map(
//                                   (_, i) => (
//                                     <span key={i}>
//                                       <FaStar />
//                                     </span>
//                                   )
//                                 )}
//                               {product?.rating % 1 !== 0 && (
//                                 <span>
//                                   <FaStar />
//                                 </span>
//                               )}
//                               <span className="ml-2 flex items-center text-[#F6A64D] text-sm">
//                                 {recipe.rating}
//                               </span>
//                             </div>
//                             <p className="text-gray-800 font-bold text-[18px]">
//                               ${recipe.caloriesPerServing}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </aside>

//             <div className="flex-1 p-4 pt-0">
//               {/* Product Details */}
//               <div className="bg-white pt-[27px] px-[30px] pb-[35px] mb-[50px]">
//                 {loading || !product ? (
//                   <div className="text-center py-10 w-full">
//                     <div className="flex justify-center items-center space-x-2">
//                       <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
//                       <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
//                       <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-wrap ">
//                     <div className="px-[15px] md:sticky top-5 h-fit md:flex-none md:basis-[41.6666%] md:max-w-[41.6666%]">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className=""
//                       />
//                     </div>

//                     <div className="px-[15px] md:flex-none md:basis-[58.3333%] md:max-w-[58.3333%] text-[#27272f]">
//                       {/* name */}
//                       <h1 className="text-[30px] font-semibold mb-2">
//                         {product.name}
//                       </h1>
//                       {/* Star Rating */}
//                       <div className="flex items-center mt-3 text-[#8BA73B] text-xl">
//                         {product?.rating &&
//                           [...Array(Math.floor(product.rating))].map((_, i) => (
//                             <span key={i}>
//                               <FaStar />
//                             </span>
//                           ))}
//                         {product?.rating % 1 !== 0 && (
//                           <span>
//                             <FaStar />
//                           </span>
//                         )}
//                       </div>
//                       {/* price */}
//                       <p className="text-[#F6A64D] font-bold text-2xl mt-3">
//                         ${product.caloriesPerServing}
//                       </p>
//                       {/* Ingredients List */}
//                       <h2 className="text-xl mt-3 mb-2">Ingredients :</h2>
//                       <ul className="list-disc list-inside text-gray-700">
//                         {product.ingredients?.map((ingredient, index) => (
//                           <li key={index}>{ingredient}</li>
//                         ))}
//                       </ul>

//                       {/* Cooking Time Information */}
//                       <div className="mt-2 text-sm text-gray-600">
//                         <p className="flex items-center justify-start gap-1 my-1">
//                           <TbClockHour2
//                             className="text-gray-900 inline-block"
//                             size={22}
//                           />
//                           Prep Time:
//                           <span className="font-semibold ml-1">
//                             {product.prepTimeMinutes} mins
//                           </span>
//                         </p>
//                         <p className="flex items-center justify-start gap-[2px] my-1">
//                           <LiaFireAltSolid
//                             className="text-orange-500 inline-block"
//                             size={25}
//                           />
//                           Cook Time:
//                           <span className="font-semibold ml-1">
//                             {product.cookTimeMinutes} mins
//                           </span>
//                         </p>
//                       </div>

//                       {/* Instructions */}
//                       <div className="mt-4">
//                         <h4 className="text-xl mt-3 mb-2">Instructions:</h4>
//                         <ul className="list-disc list-inside text-sm text-gray-900">
//                           {product.instructions.map((step, index) => (
//                             <li key={index}>{step}</li>
//                           ))}
//                         </ul>
//                       </div>
//                       {/* buttons */}
//                       <div className="flex flex-row flex-wrap mt-7 justify-start items-center gap-2">
//                         {cartItem ? (
//                           <Link
//                             href="/cart"
//                             className="bg-[#8BA73B] mb-1 text-white text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6c832e] transition-all duration-300 flex items-center justify-center gap-2"
//                           >
//                             <PiBagBold
//                               size={20}
//                               className="inline-block font-bold"
//                             />
//                             <span className="leading-none">
//                               Already in Cart
//                             </span>
//                           </Link>
//                         ) : (
//                           <>
//                             <div className="flex items-center border-2 rounded-3xl px-1">
//                               <button
//                                 onClick={decreaseQuantity}
//                                 className="px-3 py-3 text-sm font-bold"
//                               >
//                                 -
//                               </button>
//                               <span className="mx-4 text-lg text-[#626262]">
//                                 {quantity}
//                               </span>
//                               <button
//                                 onClick={increaseQuantity}
//                                 className="px-3 py-3 text-sm font-bold"
//                               >
//                                 +
//                               </button>
//                             </div>

//                             <button
//                               className="bg-[#8BA73B] text-[#fff] text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6A802D] transition-all duration-300 flex items-center justify-center gap-2"
//                               onClick={() => handleAddToCart(product)}
//                             >
//                               <PiBagBold
//                                 size={20}
//                                 className="inline-block font-bold"
//                               />
//                               <span className="leading-none">ADD TO CART</span>
//                             </button>
//                             <button className="w-10 h-10 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
//                               <BiHeart size={25} />
//                             </button>
//                           </>
//                         )}
//                       </div>
//                       {/* tags */}
//                       <p className="text-black mt-4">
//                         <span className="font-medium text-[17px]">Tags:</span>{" "}
//                         <span className="text-[#6A802D]">
//                           {" "}
//                           {product.tags.join(", ")}
//                         </span>
//                       </p>
//                       {/* meal tyep */}
//                       <p className="text-black mt-2">
//                         <span className="font-medium text-[17px]">
//                           mealType:
//                         </span>{" "}
//                         <span className="text-[#6A802D]">
//                           {" "}
//                           {product.mealType.join(", ")}
//                         </span>
//                       </p>
//                       <div className="mt-7 flex flex-row flex-wrap items-center justify-start">
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#3B5998] bg-[#3B5998]">
//                           <TiSocialFacebook
//                             className="text-[#fff] cursor-pointer"
//                             size={22}
//                           />
//                         </div>
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#00A8E8] bg-[#00A8E8]">
//                           <FaTwitter
//                             className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
//                             size={15}
//                           />
//                         </div>
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#0377AE] bg-[#0377AE]">
//                           <FaLinkedinIn
//                             className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
//                             size={15}
//                           />
//                         </div>
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#32506D] bg-[#32506D]">
//                           <FaInstagram
//                             className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
//                             size={15}
//                           />
//                         </div>
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#88A33B] bg-[#88A33B]">
//                           <FaGoogle
//                             className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
//                             size={15}
//                           />{" "}
//                           <span className="text-[10px] text-[#fff] group-hover:text-[#8BA73B]">
//                             +
//                           </span>
//                         </div>
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#CB2027] bg-[#CB2027]">
//                           <BsPinterest
//                             className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
//                             size={15}
//                           />
//                         </div>
//                         <div className="m-1 w-10 h-10 rounded-full flex justify-center items-center border group border-[#8BA73B] bg-[#8BA73B]">
//                           <IoMdMail
//                             className="text-[#fff] group-hover:text-[#8BA73B] cursor-pointer"
//                             size={15}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               {/* You may also like */}
//               {loading ? (
//                 <div className="text-center py-10 w-full">loading.....</div>
//               ) : (
//                 <div>
//                   <h1 className="mb-[30px] pb-[19px] text-[22px] text-[#27272f] font-bold border-b border-[#e3e3d9] border-1">
//                     You may also like
//                   </h1>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {MoreRec.slice(30, 33).map((recipe) => (
//                       <div
//                         key={recipe.id}
//                         className="group p-6 relative transition-all ease-out duration-300 h-full flex flex-col bg-white rounded-md shadow-lg overflow-hidden mb-0"
//                       >
//                         <div className="relative overflow-hidden">
//                           <img
//                             src={recipe.image}
//                             alt={recipe.name}
//                             className="w-full h-full cursor-pointer object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent interference
//                               handleProductClick(recipe);
//                             }}
//                           />

//                           <Link
//                             href={`/product/${formatProductNameForURL(
//                               recipe.name
//                             )}`}
//                             onClick={(e) => e.stopPropagation()}
//                             className="w-10 h-10 rounded-full bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                           >
//                             <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e]">
//                               <CiSearch size={20} />
//                             </div>
//                           </Link>
//                         </div>

//                         <div className="mt-5 mb-1">
//                           <div>
//                             <Link
//                               href={"#"}
//                               className="text-[13px] font-semibold leading-[28px] text-[#8BA73B] mt-4 italic"
//                             >
//                               {recipe.cuisine}
//                             </Link>
//                             <h3 className="text-[15px] font-bold text-gray-800 leading-[1.4] overflow-hidden max-h-[3em] h-[3em] hover:underline">
//                               <button
//                                 onClick={() => handleProductClick(recipe)}
//                               >
//                                 {recipe.name}
//                               </button>
//                             </h3>
//                             <p className="text-[#8BA73B] font-bold text-xl mt-1">
//                               ${recipe.caloriesPerServing}
//                             </p>
//                           </div>

//                           <div className="flex items-center mt-3 text-[#F6A64D] text-lg">
//                             Rating : {recipe.rating}
//                           </div>

//                           <div className="flex flex-row mt-5 justify-between">
//                             {cart.some((item) => item.id === recipe.id) ? (
//                               <Link
//                                 href="/cart"
//                                 className="bg-[#8BA73B] mb-1 text-white text-[14px] px-5 rounded-3xl py-2 hover:bg-[#6c832e] transition-all duration-300 flex items-center justify-center gap-2"
//                               >
//                                 <PiBagBold
//                                   size={20}
//                                   className="inline-block font-bold"
//                                 />
//                                 <span className="leading-none">
//                                   Already in Cart
//                                 </span>
//                               </Link>
//                             ) : (
//                               <>
//                                 <button
//                                   onClick={() => handleAddToCart(recipe)}
//                                   className="bg-[#fff] text-gray-800 border border-gray-400 hover:text-[#fff] text-xs px-5 rounded-3xl py-2 hover:bg-[#8BA73B] transition-all duration-300 flex items-center justify-center gap-1"
//                                 >
//                                   <CiShoppingCart
//                                     size={16}
//                                     className="inline-block"
//                                   />
//                                   <span className="leading-none lg:inline-block hidden">
//                                     ADD TO CART
//                                   </span>
//                                 </button>
//                                 <div className="flex items-center text-gray-800">
//                                   <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
//                                     <CiHeart size={25} />
//                                   </button>
//                                   <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
//                                     <GoGitCompare size={19} />
//                                   </button>
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {/* Sidebar - Visible only on meduim and mobile*/}
//               <aside className="lg:hidden block w-full mt-10">
//                 <div className="py-5 px-7 mb-[30px] shadow bg-white">
//                   <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
//                     PRODUCT CATEGORIES
//                   </h2>
//                   <ul className="text-gray-600">
//                     {tags.slice(0, 10).map((tag) => (
//                       <li
//                         key={tag}
//                         className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
//                           activeTag === tag ? "text-[#8ba73b] font-bold" : ""
//                         }`}
//                         onClick={() => setActiveTag(tag)}
//                       >
//                         {tag}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="py-5 px-7 mb-[30px] shadow bg-white">
//                   <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
//                     Products on sale
//                   </h2>
//                   {loading ? (
//                     <div className="text-center py-10 w-full">
//                       <div className="flex justify-center items-center space-x-2">
//                         <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
//                         <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
//                         <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 gap-6">
//                       {recipes.slice(0, 4).map((recipe) => (
//                         <div
//                           key={recipe.id}
//                           className="group p-2 relative transition-all ease-out duration-300 h-full flex bg-white rounded-md shadow-lg overflow-hidden mb-0"
//                         >
//                           <button onClick={() => handleProductClick(recipe)}>
//                             <img
//                               src={recipe.image}
//                               alt={recipe.name}
//                               className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
//                             />
//                           </button>

//                           <div className="px-2">
//                             <div>
//                               <h3 className="text-[14px] mb-3 text-gray-800 hover:text-[#8BA73B] leading-[1.4] overflow-hidden transition-all duration-300">
//                                 <button
//                                   onClick={() => handleProductClick(recipe)}
//                                 >
//                                   {recipe.name}
//                                 </button>
//                               </h3>
//                               <div className="flex items-center mb-1 text-[#8BA73B] text-sm">
//                                 {product?.rating &&
//                                   [...Array(Math.floor(product.rating))].map(
//                                     (_, i) => (
//                                       <span key={i}>
//                                         <FaStar />
//                                       </span>
//                                     )
//                                   )}
//                                 {product?.rating % 1 !== 0 && (
//                                   <span>
//                                     <FaStar />
//                                   </span>
//                                 )}
//                                 <span className="ml-2 flex items-center text-[#F6A64D] text-sm">
//                                   {recipe.rating}
//                                 </span>
//                               </div>
//                               <p className="text-gray-800 font-bold text-[18px]">
//                                 ${recipe.caloriesPerServing}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };
