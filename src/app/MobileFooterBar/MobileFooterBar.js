"use client";
import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import Link from "next/link";

const MobileFooterBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed block md:hidden lg:hidden bottom-0 left-0 right-0 bg-[#2d2d2d] text-white border-t border-[#2d2d2d] shadow-lg z-50">
      <ul className="flex justify-between items-center px-6 py-3 relative">
        {/* My Account */}
        <li className="flex-1 text-center">
          <Link href="#" className="flex flex-col items-center text-gray-300">
            <GoPerson size={34} />
          </Link>
        </li>

        {/* Search */}
        <li className="flex-1 text-center flex justify-center items-center relative">
          <button
            className="flex flex-col items-center text-gray-300"
            onClick={() => setShowSearch(!showSearch)}
          >
            <CiSearch size={34} />
          </button>

          {/* Search Input Box */}
          {showSearch && (
            <div className="absolute flex justify-center items-end bottom-12 left-1/2 transform -translate-x-1/2 bg-black p-2 shadow-md w-96">
              <form className="flex items-center border border-gray-300 w-80 bg-white">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 text-black focus:outline-none"
                />
                <button type="submit" className="px-3 py-2 bg-[#8BA73B] text-white">
                <CiSearch size={19} />
                </button>
              </form>
            </div>
          )}
        </li>

        {/* Cart */}
        <li className="flex-1 text-center">
          <Link href="/cart" className="flex flex-col items-center text-gray-300 relative">
            <IoBagHandleOutline size={34} />
            <span className="absolute top-0 right-4 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileFooterBar;
