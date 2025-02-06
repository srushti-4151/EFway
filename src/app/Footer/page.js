import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-white">
        <div className="bg-[url('/images/footerbg.jpg')] w-full bg-top bg-no-repeat bg-contain text-gray-800">
          <div className="max-w-[1410px] w-full mx-auto px-4 py-10">
            {/* Newsletter Section */}
            <div className="text-center py-[90px]">
              <h2 className="text-lg font-semibold">NEWSLETTER</h2>
              <p className="text-sm text-gray-600 py-[35px]">
                Subscribe to the weekly newsletter for all the latest updates
              </p>
              <div className="mt-4 flex justify-center">
                <div className="relative lg:w-[40%] md:w-[70%] w-full">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full py-4 px-4 pr-24 text-sm border rounded-3xl focus:outline-none"
                  />
                  <button className="absolute text-sm font-bold right-1 top-1/2 transform -translate-y-1/2 bg-[#8ba73b] text-white px-5 py-3 rounded-3xl">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200" />
            {/* Footer Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-1 text-sm tracking-wide py-[80px] text-center md:text-left lg:text-left">
              {/* Logo & Description */}
              <div className="w-full flex flex-col items-center md:items-start">
                <img
                  src="/images/logo.svg"
                  alt="Logo"
                  className="h-11 w-auto mb-[33px]"
                />
                <p className="mt-2 text-gray-600 text-[16px] mb-[30px] w-[210px]">
                  Cras mattis consectetur purus sit amet fermentum. Praesent
                  commodo cursus magna, vel scelerisque nisl consectetur et.
                </p>
                {/* Social Icons */}
                <div className="flex gap-3 mt-4">
                  <FaFacebook
                    className="text-gray-600 hover:text-blue-500 cursor-pointer"
                    size={20}
                  />
                  <FaTwitter
                    className="text-gray-600 hover:text-blue-400 cursor-pointer"
                    size={20}
                  />
                  <FaInstagram
                    className="text-gray-600 hover:text-pink-500 cursor-pointer"
                    size={20}
                  />
                  <FaGoogle
                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] mt-[25px]">
                  Company Info
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>About us</li>
                  <li>Careers</li>
                  <li>Affiliate Program</li>
                  <li>Business With Us</li>
                  <li>Find a Store</li>
                  <li>Press & Talent</li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] mt-[25px]">
                  Quick Links
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>Special Offers</li>
                  <li>Gift Cards</li>
                  <li>Privacy Policy</li>
                  <li>California Privacy Rights</li>
                  <li>Teams of Use</li>
                </ul>
              </div>

              {/* hot categories */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] mt-[25px]">
                  Hot categories
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>Privacy Plocy</li>
                  <li>F2 red</li>
                  <li>Smartphone</li>
                  <li>Battereries</li>
                  <li>Handbag</li>
                  <li>Shoes</li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="font-semibold mb-[33px] mt-[25px]">
                  Contact Us
                </h3>
                <p className="mt-2">
                  <strong>Through Whatsapp</strong>
                  <br />
                  <span className="text-green-500 font-bold">
                    +084 008 46 789
                  </span>
                </p>
                <p className="mt-2">
                  GymVast, 18 East 50th Street, 4th Floor, New York, NY 10022
                </p>
                <p className="mt-2 text-gray-600">support@example.com</p>
              </div>
            </div>

            {/* Bottom Footer */}
            {/* <div className="mt-8 text-center text-gray-500 text-sm">
              <p>Copyright © 2020 Efway. All Rights Reserved.</p>
              <div className="flex justify-center gap-3 mt-2">
                <img src="/visa.png" alt="Visa" className="w-12" />
                <img src="/paypal.png" alt="PayPal" className="w-12" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
