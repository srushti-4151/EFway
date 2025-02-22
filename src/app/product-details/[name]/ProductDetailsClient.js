"use client";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { GoGitCompare } from "react-icons/go";
import { toast } from "react-toastify";
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
import PageNavbar from "@/app/pagenavbar/page";
import axios from "axios";

const ProductDetailsClient = ({ product, tags, moreRec }) => {
  const [productData, setProductData] = useState(product)
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((item) => item.id === product?.id);

  const params = useParams();
  const router = useRouter();
  const [activeTag, setActiveTag] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    router.push(`/product-details/${params.name}?tag=${tag}`);
  };

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

  const formatProductNameForURL = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/-/g, "~");
  };

  const handleProductClick = (recipe) => {
    setProductData(recipe); // Set the clicked recipe's data into the product state
    const encodedName = formatProductNameForURL(recipe.name); // Format the recipe name for URL
    router.push(`/product-details/${encodedName}`); // Update the URL
  };

  // useEffect(() => {
  //   setProduct(productData);
  //   setTags(tagsData);
  //   setMoreRec(moreRecData);
  //   setRecipes(recipesData); // Add this if recipesData is used
  // }, [productData, tagsData, moreRecData, recipesData]);

  // if (!product) {
  //   return <div>Product not found</div>;
  // }
  // const fetchProductsByCategory = async (category) => {
  //   try {
  //     const res = await fetch(
  //       `https://dummyjson.com/products/category/${category}`
  //     );
  //     const data = await res.json();
  //     if (data.products && data.products.length > 0) {
  //       setFilteredProducts(data.products);
  //       setActiveCat(category);
  //     } else {
  //       setFilteredProducts([]); // Clear the list if no products are found
  //       toast.info("No products found in this category.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     toast.error("Failed to fetch products.");
  //   }
  // };

  // Fetch recipes based on activeTag; if none, fetch all recipes
  useEffect(() => {
    const fetchRecipesByTag = async () => {
      setLoading(true);
      try {
        let fetchedRecipes;
        if (activeTag) {
          const res = await axios.get(`https://dummyjson.com/recipes/tag/${activeTag}`);
          fetchedRecipes = res.data.recipes;
        } else {
          const res = await axios.get("https://dummyjson.com/recipes?limit=0");
          fetchedRecipes = res.data.recipes;
        }
        setRecipes(fetchedRecipes);
      } catch (err) {
        console.error("Error in getRecipes by tag", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipesByTag();
  }, [activeTag]);
  

  return (
    <>
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <PageNavbar />

        <div className="w-full max-w-[1440px] mx-auto px-4 pt-10 relative bg-transparent">
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
                        <button
                        onClick={() => handleProductClick(recipe)}
                        >
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
                {loading || !productData ? (
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
                        src={productData.image}
                        alt={productData.name}
                        className=""
                      />
                    </div>

                    <div className="px-[15px] md:flex-none md:basis-[58.3333%] md:max-w-[58.3333%] text-[#27272f]">
                      <h1 className="text-[30px] font-semibold mb-2">
                        {productData.name}
                      </h1>

                      <div className="flex items-center mt-3 text-[#8BA73B] text-xl">
                        {productData?.rating &&
                          [...Array(Math.floor(productData.rating))].map((_, i) => (
                            <span key={i}>
                              <FaStar />
                            </span>
                          ))}
                        {productData?.rating % 1 !== 0 && (
                          <span>
                            <FaStar />
                          </span>
                        )}
                      </div>
                      <p className="text-[#F6A64D] font-bold text-2xl mt-3">
                        ${productData.caloriesPerServing}
                      </p>
                      <h2 className="text-xl mt-3 mb-2">Ingredients :</h2>
                      <ul className="list-disc list-inside text-gray-700">
                        {productData.ingredients?.map((ingredient, index) => (
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
                            {productData.prepTimeMinutes} mins
                          </span>
                        </p>
                        <p className="flex items-center justify-start gap-[2px] my-1">
                          <LiaFireAltSolid
                            className="text-orange-500 inline-block"
                            size={25}
                          />
                          Cook Time:
                          <span className="font-semibold ml-1">
                            {productData.cookTimeMinutes} mins
                          </span>
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-xl mt-3 mb-2">Instructions:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-900">
                          {productData.instructions.map((step, index) => (
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
                              onClick={() => handleAddToCart(productData)}
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
                          {productData.tags.join(", ")}
                        </span>
                      </p>
                      <p className="text-black mt-2">
                        <span className="font-medium text-[17px]">
                          mealType:
                        </span>{" "}
                        <span className="text-[#6A802D]">
                          {" "}
                          {productData.mealType.join(", ")}
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
                    {moreRec.slice(30, 33).map((recipe) => (
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
              {/* <aside className="lg:hidden block w-full mt-10">
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
              </aside> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsClient;
