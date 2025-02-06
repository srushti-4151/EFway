"use client";
import Link from "next/link";
import React, { useState, useEffect  } from "react";
import { CiHeart } from "react-icons/ci";
import { GoGitCompare } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "The food you eat when you eat hotpot",
      category: "Fast Food, Uncategorized",
      price: "$187.14",
      image: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Morrisons Seedless Red Grapes",
      category: "Fast Food, Fruits & Veges",
      price: "$143.26",
      image: "/images/product1.jpg",
    },
    {
      id: 3,
      name: "Meat, fish & poultry",
      category: "Dried Fruits, Uncategorized",
      price: "$124.90",
      image: "/images/product1.jpg",
    },
    {
      id: 4,
      name: "Lundberg Organic Rice, White Basmati",
      category: "Dried Fruits, Fruits & Veges",
      price: "$127.51",
      image: "/images/product1.jpg",
    },
  ];
  const categories = ["ORGANIC", "FRUITS", "SEAFOOD", "WINE & BEER", "BAKERY"];
  const [activeCategory, setActiveCategory] = useState("ORGANIC");

  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try{
        const res = await axios.get("https://dummyjson.com/recipes");
        setRecipes(res.data.recipes);
      }catch(err) {
        console.log("error while fetching the recipes", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [])

  useEffect(() => {
    console.log("Updated recipes:", recipes);
  }, [recipes]); 
  
  return (
    <>
      <div className="relative max-w-[1410px] w-full mx-auto mt-0 mb-[70px]">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center text-[#8BA73B] mb-6">
            FEATURED <span className="text-black">PRODUCTS</span>
          </h2>
          <div className="md:flex lg:flex hidden justify-center space-x-6 text-[#626262] text-xs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setFilter(category);
                }}
                className={`font-extrabold pb-3 ${
                  activeCategory === category
                    ? "text-[#8BA73B] border-b-2 border-[#8BA73B]"
                    : "text-[#626262]"
                } hover:text-[#8BA73B] hover:border-b-2 hover:border-[#8BA73B] transition-all duration-300`}
              >
                {category}
              </button>
            ))}
          </div>

          <hr className="border-t border-gray-300 mx-5" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5 mt-8">
            {recipes.slice(0, 4).map((recipe) => (
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
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#8BA73B] text-white text-xl shadow-lg hover:bg-[#6f8e2e]">
                      <CiSearch size={20} />
                    </div>
                  </button>
                </div>

                <div className="mt-5 mb-1">
                  <div>
                    <Link
                      href={"#"}
                      className="text-[0.8125rem] font-semibold leading-[28px] text-[#8BA73B] mt-4 italic"
                    >
                      {recipe.cuisine}
                    </Link>
                    <h3 className="text-[1.0625rem] font-bold text-gray-800 leading-[1.4] overflow-hidden max-h-[2.1em] h-[2.1em] hover:underline">
                      <Link href={"#"}>{recipe.name}</Link>
                    </h3>
                    <p className="text-[#8BA73B] font-bold text-xl mt-1">
                      ${recipe.caloriesPerServing}
                    </p>
                  </div>
                  
                  <div className="flex flex-row mt-9 justify-between">
                    <button className="bg-[#fff] text-gray-800 border border-gray-400 hover:text-[#fff] text-xs px-5 rounded-3xl py-2 hover:bg-[#8BA73B] transition-all duration-300 flex items-center justify-center gap-1">
                      <CiShoppingCart size={16} className="inline-block" />
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
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
