"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { removeCart, updateQuantity } from "../redux/slices/cartSlice";
import { FaHome } from "react-icons/fa";
import Footer from "../Footer/page";
import { BsCartX } from "react-icons/bs";
import PageNavbar from "../pagenavbar/page";

const Cartpage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [quantities, setQuantities] = useState({});

  // const increaseQuantity = (itemId) => {
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [itemId]:
  //       (prev[itemId] ||
  //         cart.find((item) => item.id === itemId)?.quantity ||
  //         1) + 1,
  //   }));
  // };

  // const decreaseQuantity = (itemId) => {
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [itemId]: Math.max(
  //       (prev[itemId] ||
  //         cart.find((item) => item.id === itemId)?.quantity ||
  //         1) - 1,
  //       1
  //     ),
  //   }));
  // };
  const increaseQuantity = (itemId) => {
    dispatch(updateQuantity({ id: itemId, quantity: (quantities[itemId] || cart.find(item => item.id === itemId)?.quantity || 1) + 1 }));
  };
  
  const decreaseQuantity = (itemId) => {
    const newQuantity = Math.max((quantities[itemId] || cart.find(item => item.id === itemId)?.quantity || 1) - 1, 1);
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };
  

  // const handleAddToCart = () => {
  //   Object.entries(quantities).forEach(([id, quantity]) => {
  //     dispatch(updateQuantity({ id, quantity }));
  //   });
  // };

  const handleAddToCart = () => {
    // Object.entries(quantities).forEach(([id, quantity]) => {
    //   dispatch(updateQuantity({ id: Number(id), quantity })); // Convert id to number
    // });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.caloriesPerServing * item.quantity,
    0
  );

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
                <span className="text-[#8ba73b]">Cart</span>
              </div>
            </div>

            {/* Page Header */}
            <h1 className="text-4xl mt-7 font-bold">Cart</h1>
          </div>
        </div>

        <div className="w-full max-w-[1410px] mx-auto px-4 mt-7 mb-10 relative bg-transparent container p-6">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 bg-white">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-white p-4 rounded-lg py-[30px] px-[35px]">
                <div className="overflow-x-auto">
                  <table className="w-full hidden md:table border-collapse">
                    <tbody>
                      {cart.map((item) => {
                        const quantity = quantities[item.id] ?? item.quantity;
                        return (
                          <tr key={item.id} className="border-b">
                            {/* Remove Button */}
                            <td className="text-center pt-[41px] pr-[25px] pb-[36px]">
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="text-black inline-block text-sm"
                              >
                                <RxCross2 />
                              </button>
                            </td>
                            {/* Product Image */}
                            <td className="flex items-center space-x-4 py-4 pt-[41px] pr-[25px] pb-[36px]">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg"
                              />
                            </td>
                            {/* Product Name */}
                            <td className="pt-[41px] pr-[25px] pb-[36px] text-[#55555B]">
                              {item.name}
                            </td>
                            {/* Price */}
                            <td className="text-center pt-[41px] pr-[25px] pb-[36px] text-[#8B8B8B]">
                              ${item.caloriesPerServing.toFixed(2)}
                            </td>
                            {/* Quantity */}
                            <td className="text-center pt-[41px] pr-[25px] pb-[36px]">
                              <div className="flex items-center justify-center border rounded-3xl">
                                <button
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="px-3 py-2 text-sm font-bold text-[#8B8B8B]"
                                >
                                  -
                                </button>
                                <span className="mx-5 text-lg text-[#8B8B8B]">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => increaseQuantity(item.id)}
                                  className="px-3 py-2 text-sm font-bold text-[#8B8B8B]"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            {/* Subtotal */}
                            <td className="text-right text-[#55555B] pt-[41px] pr-[25px] pb-[36px]">
                              $
                              {(
                                item.caloriesPerServing * item.quantity
                              ).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Mobile View */}
                  <div className="md:hidden">
                    <div className="border-b">
                      {cart.map((item) => {
                        const quantity = quantities[item.id] ?? item.quantity;
                        return (
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
                            <div className="mt-4 space-y-2 text-[#55555B]">
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
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="px-3 py-2 text-sm font-bold"
                                  >
                                    -
                                  </button>
                                  <span className="mx-4 text-lg text-[#626262]">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => increaseQuantity(item.id)}
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
                        );
                      })}
                    </div>
                  </div>

                  <div className="py-10 bg-white flex md:flex-row flex-col items-center justify-start gap-4">
                    <p className="text-[#414148]">Coupon: </p>
                    <div className="flex items-center justify-between border rounded-full overflow-hidden shadow-sm">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none"
                      />

                      <button className="px-4 py-3 bg-white text-gray-500">
                        {">"}
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="bg-[#E8E8E8] hover:bg-[#8BA73B] font-bold text-[#222222] hover:text-white px-5 py-3 rounded-3xl text-sm transition-all duration-300 uppercase"
                    >
                      Upadte cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Cart Totals (Now below for medium screens) */}
              <div className="py-[30px] px-[15px] bg-white">
                <div className="bg-[#F8F8F8] p-10 rounded-lg shadow">
                  <h2 className="text-2xl font-bold pb-6 border-b text-[#000]">
                    Cart Totals
                  </h2>

                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-6 text-left text-[#55555B]">
                          Subtotal:
                        </td>
                        <td className="py-6 text-left text-[#55555B]">
                          ${totalAmount.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-6 text-left text-[#55555B]">
                          Total:
                        </td>
                        <td className="py-6 text-left font-bold text-xl">
                          ${totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button className="w-full mt-6 bg-[#8BA73B] hover:bg-[#768f31] text-white py-2 rounded-3xl text-sm transition-all duration-300">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white pt-[107px] pb-[65px] px-[15px] rounded-md shadow">
              <BsCartX size={180} className="text-[#D7D7D7] mb-12" />
              <p className="text-gray-900 text-[24px] font-medium">
                Your cart is currently empty.
              </p>
              <Link
                href={"/"}
                className="mt-12 bg-[#8BA73B] text-white py-2 px-6 rounded-full text-sm font-semibold"
              >
                RETURN TO SHOP
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cartpage;
