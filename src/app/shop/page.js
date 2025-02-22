"use client";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Footer from "../Footer/page";
import { useDispatch, useSelector } from "react-redux";
import { GoGitCompare } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { addCart, removeCart } from "../redux/slices/cartSlice";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { PiBagBold } from "react-icons/pi";
import PageNavbar from "../pagenavbar/page";

// const CustomDropdown = ({ options, selected, setSelected }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative w-auto text-[14px]">
//       {/* Dropdown Button */}
//       <div
//         className="px-4 py-[6px] text-[#626262] bg-white border border-gray-300 rounded-3xl text-[14px] w-full cursor-pointer flex gap-1 justify-between items-center"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selected || "Default Sorting"}
//         <RiArrowDropDownLine
//           size={23}
//           className={`transition-transform duration-300 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
//           {options.map((option, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 text-[#626262] hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setSelected(option.value);
//                 setIsOpen(false);
//               }}
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

const ShopePage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [quantities, setQuantities] = useState({});
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("");
  const [mealType, setMealType] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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


  return (
    <>
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <PageNavbar/>
        
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
                <HiMiniMinusSmall size={24} className="inline-block" />
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
                    className="px-4 pr-8 py-[7px] text-[#626262] appearance-none focus:outline-none focus:ring-0 border rounded-3xl text-[14px]"
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
