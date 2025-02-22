"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Footer from "../Footer/page";
import { TbHeartX } from "react-icons/tb";
import PageNavbar from "../pagenavbar/page";

const WishlistPage = () => {
  const [quantities, setQuantities] = useState({});

  return (
    <>
      <div
        className="w-full bg-top bg-contain bg-[#F2F4EC] bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/bg-body.png')" }}
      >
        <PageNavbar />

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
            <p className="text-[32px] p-[5px] mt-[20px] font-bold">
              My wishlist on Efway
            </p>
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
