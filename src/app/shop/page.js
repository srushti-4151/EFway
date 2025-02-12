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
import Footer from "../Footer/page";
import { useDispatch, useSelector } from "react-redux";
import { GoGitCompare } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { addCart } from "../redux/slices/cartSlice";
import { RxCross2 } from "react-icons/rx";
import { HiMiniMinusSmall } from "react-icons/hi2";


const ShopePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const [quantities, setQuantities] = useState({});
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("");
  const [mealType, setMealType] = useState("");

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.caloriesPerServing * item.quantity,
    0
  );

  const dispatch = useDispatch();

  // Add to cart function
  const handleAddToCart = (recipe) => {
    dispatch(addCart({ ...recipe, quantity: 1 }));
    toast.success("Added to Cart!");
  };

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/recipes/tags");
        setTags(res.data);
      } catch (err) {
        console.error("Error fetching tags", err);
      }
    };

    fetchTags();
  }, []);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = "https://dummyjson.com/recipes?limit=0";
        // if (activeTag) {
        //   url = `https://dummyjson.com/recipes/tag/${activeTag}`;
        // } else if (mealType) {
        //   url = `https://dummyjson.com/recipes/meal-type/${mealType}`;
        // }

        // const res = await axios.get(url);
        // let filteredRecipes = res.data.recipes;

        if (activeTag) {
          url = `https://dummyjson.com/recipes/tag/${activeTag}`;
        }

        const res = await axios.get(url);
        console.log("API Response:", res.data); // Debugging line
        let filteredRecipes = res.data.recipes;

        if (mealType) {
          filteredRecipes = filteredRecipes.filter((recipe) => {
            console.log("Recipe mealType:", recipe.mealType); // Debugging line
            console.log("Selected mealType:", mealType); // Debugging line

            // const priceMatch = recipe.caloriesPerServing <= maxPrice;
            const mealMatch = mealType
              ? recipe.mealType.some(
                  (type) => type.toLowerCase() === mealType.toLowerCase()
                )
              : true;

            console.log("Meal match result:", mealMatch); // Debugging line

            return mealMatch;
          });
        }

        if (sortBy === "price-low") {
          filteredRecipes.sort(
            (a, b) => a.caloriesPerServing - b.caloriesPerServing
          );
        } else if (sortBy === "price-high") {
          filteredRecipes.sort(
            (a, b) => b.caloriesPerServing - a.caloriesPerServing
          );
        } else if (sortBy === "rating-low") {
          filteredRecipes.sort((a, b) => a.rating - b.rating);
        } else if (sortBy === "rating-high") {
          filteredRecipes.sort((a, b) => b.rating - a.rating);
        }

        setRecipes(filteredRecipes);
      } catch (err) {
        console.error("Error fetching recipes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [activeTag, sortBy, mealType]);

  const formatProductNameForURL = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/-/g, "~");
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                            {cart.length || 0}
                          </div>
                        </div>
                        <div className="leading-5 text-sm ml-1">
                          ${totalAmount.toFixed(2) || 0}
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
                    setMealType("");
                    setSortBy("");
                  }}
                  className="text-gray-700 hover:text-[#8ba73b]"
                >
                  Products{" "}
                </button>
              </div>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl mt-7 font-bold">Shop</h1>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto md:px-4 px-0 mt-10 pb-20 relative bg-transparent min-h-screen">
          <div className="lg:flex block items-start gap-4 relative">
            {/* Sidebar - Visible only on lg screens */}
            <aside className="hidden lg:block w-1/4 sticky top-5 h-fit">
              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  PRODUCT CATEGORIES
                </h2>
                <ul className="text-gray-600">
                  {tags.slice(0, 20).map((tag) => (
                    <li
                      key={tag}
                      className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
                        activeTag === tag ? "text-[#8ba73b] font-bold" : ""
                      }`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  FILTER BY PRICE
                </h2>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-black focus:outline-none focus:ring-none"
                />
                <p className="text-gray-600 mt-4">Price: $30 — ${maxPrice}</p>
              </div>
            </aside>
            {/* Sidebar - Visible on small screen*/}
            <aside
              className={`lg:hidden block fixed z-50 overflow-y-scroll inset-y-0 left-0 bg-white shadow-lg w-3/4 max-w-xs p-5 transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 lg:relative lg:w-1/4 lg:block`}
            >
              {/* Close Button for Mobile */}
              <button
                className="lg:hidden absolute top-2 right-4 text-gray-800"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span>Close</span>
                <HiMiniMinusSmall size={24} className="inline-block"/>
              </button>

              <div className="py-5 px-7 mt-5 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  PRODUCT CATEGORIES
                </h2>
                <ul className="text-gray-600">
                  {tags.slice(0, 20).map((tag) => (
                    <li
                      key={tag}
                      className={`hover:text-[#8ba73b] text-[14px] transition-all duration-300 py-[7px] cursor-pointer ${
                        activeTag === tag ? "text-[#8ba73b] font-bold" : ""
                      }`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-5 px-7 mb-[30px] shadow bg-white">
                <h2 className="text-[18px] text-[#27272f] font-semibold mb-[18px] pb-[12px] border-b">
                  FILTER BY PRICE
                </h2>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-black focus:outline-none focus:ring-none"
                />
                <p className="text-gray-600 mt-4">Price: $30 — ${maxPrice}</p>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 p-4 pt-0">
              <div className="flex flex-wrap justify-start gap-4 items-center mb-4">
                <button
                  className="lg:hidden px-4 pr-8 py-[7px] bg-white text-[#626262] border rounded-3xl text-[14px]"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  openFilter
                </button>

                <div className="relative">
                  <select
                    className="px-4 pr-8 py-[7px] text-[#626262] appearance-none border rounded-3xl text-[14px]"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Default Sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating-low">Rating: Low to High</option>
                    <option value="rating-high">Rating: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <RiArrowDropDownLine size={20} />
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="px-4 py-[7px] pr-8 text-[#626262] appearance-none border rounded-3xl text-[14px]"
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    <option value="">Default Sorting</option>
                    <option value="snack">Snack</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <RiArrowDropDownLine size={20} />
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="text-center py-10 w-full">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                    <div className="w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {recipes.slice(0, 15).map((recipe) => (
                    <div
                      key={recipe.id}
                      className="group p-6 relative transition-all ease-out duration-300 h-full flex flex-col bg-white rounded-md shadow-lg overflow-hidden mb-0"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Hover Button */}
                        <Link
                          href={`/product/${formatProductNameForURL(
                            recipe.name
                          )}`}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                            <Link href={"#"}>{recipe.name}</Link>
                          </h3>
                          <p className="text-[#8BA73B] font-bold text-xl mt-1">
                            ${recipe.caloriesPerServing}
                          </p>
                        </div>

                        <div className="flex flex-row mt-9 justify-between">
                          <button
                            onClick={() => handleAddToCart(recipe)}
                            className="bg-[#fff] text-gray-800 border border-gray-400 hover:text-[#fff] text-xs px-5 rounded-3xl py-2 hover:bg-[#8BA73B] transition-all duration-300 flex items-center justify-center gap-1"
                          >
                            <CiShoppingCart
                              size={16}
                              className="inline-block"
                            />
                            <span className="leading-none">ADD TO CART</span>
                          </button>
                          <div className="flex items-center text-gray-800">
                            <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                              <CiHeart size={25} />
                            </button>
                            <button className="w-9 h-9 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                              <GoGitCompare size={19} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopePage;
