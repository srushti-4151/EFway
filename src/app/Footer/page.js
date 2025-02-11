import Link from "next/link";
import React from "react";
import { FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-white">
        <div className="bg-[url('/images/footerbg.jpg')] w-full bg-top bg-no-repeat bg-contain text-gray-800 md:px-7 px-[15px]">
          <div className="max-w-[1410px] w-full mx-auto pt-4">
            {/* Newsletter Section */}
            <div className="text-center py-[90px]">
              <h2 className="text-xl font-semibold">NEWSLETTER</h2>
              <p className="text-sm text-gray-600 py-[35px]">
                Subscribe to the weekly newsletter for all the latest updates
              </p>
              <div className="mt-1 flex justify-center">
                <div className="relative lg:w-[44%] md:w-[70%] w-full">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="text-gray-600 w-full py-4 px-4 pr-24 text-sm border rounded-3xl focus:outline-none"
                  />
                  <button className="absolute text-sm font-bold right-1 top-1/2 transform -translate-y-1/2 bg-[#8ba73b] text-white px-5 py-3 rounded-3xl">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-200" />

            {/* Footer Main Content */}
            <div className="w-full flex text-[14px] py-[80px] flex-wrap text-center md:text-left lg:text-left">
              {/* Logo & Description */}
              <div className="lg:w-[26%] md:w-[100%] w-[100%] lg:mb-0 mb-10">
                <div className="mb-[33px] -mt-[10px]">
                  <img
                    src="/images/logo-black.svg"
                    alt="Logo"
                    className="h-11 w-auto"
                  />
                </div>

                <p className="text-[#747474] mb-[30px] lg:w-[270px] md:w-[577px] text-[14px] leading-[24px]">
                  Cras mattis consectetur purus sit amet fermentum. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </p>
                {/* Social Icons */}
                <div className="flex md:justify-start justify-center gap-1 mt-4">
                  <div className="w-10 h-10 rounded-full flex justify-center items-center border group hover:border-[#8BA73B] border-[#e6e5e5]">
                    <TiSocialFacebook
                      className="text-[#747474] group-hover:text-[#8BA73B] cursor-pointer"
                      size={22}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full flex justify-center items-center border group hover:border-[#8BA73B] border-[#dadada]">
                    <FaTwitter
                      className="text-[#747474] group-hover:text-[#8BA73B] cursor-pointer"
                      size={15}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full flex justify-center items-center border group hover:border-[#8BA73B] border-[#dadada]">
                    <FaInstagram
                      className="text-[#747474] group-hover:text-[#8BA73B] cursor-pointer"
                      size={15}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full flex justify-center items-center border group hover:border-[#8BA73B] border-[#dadada]">
                    <FaGoogle
                      className="text-[#747474] group-hover:text-[#8BA73B] cursor-pointer"
                      size={13}
                    />{" "}
                    <span className="text-[10px] text-[#747474] group-hover:text-[#8BA73B]">+</span>
                  </div>
                  <div className="w-10 h-10 rounded-full flex justify-center items-center border group hover:border-[#8BA73B] border-[#dadada]">
                    <FaLinkedinIn
                      className="text-[#747474] group-hover:text-[#8BA73B] cursor-pointer"
                      size={15}
                    />
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="lg:w-[18%] md:w-[50%] w-[100%] lg:mb-0 mb-10 flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] text-[16px]">
                  Company Info
                </h3>
                <ul className="mt-2 space-y-2 text-[#747474]">
                  <Link href="/" className="hover:text-[#8BA73B] block">About us</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Careers</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Affiliate Program</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Business With Us</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Find a Store</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Press & Talent</Link>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="lg:w-[16.5%] md:w-[50%] w-[100%] lg:mb-0 mb-10 flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] text-[16px]">
                  Quick Links
                </h3>
                <ul className="mt-2 space-y-2 text-[#747474]">
                  <Link href="/" className="hover:text-[#8BA73B] block">Special Offers</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Gift Cards</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Privacy Policy</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">California Privacy Rights</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Teams of Use</Link>
                </ul>
              </div>

              {/* hot categories */}
              <div className="lg:w-[15.5%] md:w-[50%] w-[100%] lg:mb-0 mb-10 flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] text-[16px]">
                  Hot categories
                </h3>
                <ul className="mt-2 space-y-2 text-[#747474]">
                  <Link href="/" className="hover:text-[#8BA73B] block">Privacy Plocy</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">F2 red</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Smartphone</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Battereries</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Handbag</Link>
                  <Link href="/" className="hover:text-[#8BA73B] block">Shoes</Link>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="lg:w-[24%] md:w-[50%] w-[100%] md:pl-6 pl-0 lg:mb-0 mb-10 flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] text-[16px]">
                  Contact Us
                </h3>
                <div className="w-[270px] md:block hidden text-[#747474]">
                  <div className="mt-2 mb-5 flex items-center gap-2">
                    <FaHeadphones size={50} className="text-[#7D9837]" />
                    <div>
                      <p className="mb-2">Through Whatsapp</p>
                      <span className="text-[#7D9837] font-extrabold text-[24px]">
                        +084 008 46 789
                      </span>
                    </div>
                  </div>

                  <p className="mt-2">
                    GymVast, 18 East 50th Street, 4th Floor, New York, NY 10022
                    <br /> <br />
                    support@example.com
                  </p>
                </div>

                <div className="md:hidden block w-full">
                  <div className="mt-2 mb-5 flex flex-col items-center gap-2">
                    <FaHeadphones size={50} className="text-[#7D9837]" />
                    <p className="mb-2">Through Whatsapp</p>
                    <h3 className="text-[#7D9837] font-extrabold text-[24px]">
                      +084 008 46 789
                    </h3>
                  </div>

                  <p className="mt-8">
                    GymVast, 18 East 50th Street, 4th Floor, New York, NY 10022
                    <br /> <br />
                    support@example.com
                  </p>
                </div>
              </div>
            </div>
          {/* Bottom Footer */}
          <div className="text-center text-gray-500 text-sm flex items-center justify-between py-10 border-t">
            <p className="text-[16px]">
              Copyright © 2020 Efway. All Rights Reserved.
            </p>
            <div className="flex justify-center gap-3 mt-2">
              <img src="/images/footerimg.png" alt="Visa" className="" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
