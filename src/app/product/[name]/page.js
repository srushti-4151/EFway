"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { PiBagBold } from "react-icons/pi"; 
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addCart, updateQuantity } from "@/app/redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((item) => item.id === product?.id);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const decodeProductNameFromURL = (name) => {
    return name.replace(/~/g, " ").replace(/\-/g, " ");
  };

  const recname = decodeProductNameFromURL(name);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://dummyjson.com/recipes/search?q=${recname}`
        );
        if (res.data.recipes.length > 0) {
          setProduct(res.data.recipes[0]);
          console.log("ress", res);
        }
      } catch (err) {
        console.log("error while fetching the details of product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [recname]);

  useEffect(() => {
    console.log("Details here is :", product);
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    if (cartItem) {
      // Update quantity to match user's selection in product details
      dispatch(updateQuantity({ id: product.id, quantity }));
      toast.success("Cart updated!");
    } else {
      // Add new item to the cart
      dispatch(addCart({ ...product, quantity }));
      toast.success("Added to Cart!");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 w-full h-screen flex justify-center items-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="dot w-4 h-4 bg-black rounded-full animate-bounce animation-delay-0"></div>
          <div className="dot w-4 h-4 bg-black rounded-full animate-bounce animation-delay-200"></div>
          <div className="dot w-4 h-4 bg-black rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    );
  return (
    <>
      <div className="w-full bg-white flex justify-center items-center min-h-screen overflow-hidden">
        <div className="lg:max-w-[80%] mx-auto p-6 bg-white shadow-lg rounded-lg">
          <button
            onClick={handleGoBack}
            className="bg-gray-50 hover:bg-gray-200 m-4 text-gray-800 px-4 py-2 rounded-md transition-all duration-300"
          >
            ← Go Back
          </button>

          <div className="grid md:grid-cols-2 gap-3">
            {/* Product Image */}
            <div className="">
              <img src={product.image} alt={product.name} className="w-full" />
            </div>
            {/* Product Details */}
            <div className="p-6">
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              {/* Star Rating */}
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
                {/* <span className="text-gray-600 ml-2">
                  ({product?.rating}/5)
                </span> */}
              </div>
              <p className="text-[#F6A64D] font-medium text-2xl mt-3">
                ${product.caloriesPerServing}
              </p>
              {/* Ingredients List */}
              <h2 className="text-xl mt-3 mb-2">Ingredients :</h2>
              <ul className="list-disc list-inside text-gray-700">
                {product.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <div className="flex flex-row mt-4 justify-start items-center gap-2">
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
                  onClick={handleAddToCart}
                >
                  <PiBagBold size={20} className="inline-block font-bold" />
                  <span className="leading-none">ADD TO CART</span>
                </button>
                <button className="w-10 h-10 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
                  <BiHeart size={25} />
                </button>
              </div>

              <p className="text-black mt-4">
                <span className="font-medium text-lg">Tags:</span>{" "}
                <span className="text-[#6A802D]">
                  {" "}
                  {product.tags.join(", ")}
                </span>
              </p>

              {/* Instructions List */}
              {/* <h2 className="text-xl font-semibold mt-4">Instructions</h2>
              <ol className="list-decimal list-inside text-gray-700">
                {product.instructions?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;


// "use client";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { BiHeart } from "react-icons/bi";
// import { PiBagBold } from "react-icons/pi";
// import { FaStar } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { addCart, updateQuantity } from "@/app/redux/slices/cartSlice";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const ProductDetails = () => {
//   const { name } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);
//   const cartItem = cart.find((item) => item.id === product?.id);

//   const router = useRouter();

//   const handleGoBack = () => {
//     router.back();
//   };

//   useEffect(() => {
//     if (cartItem) {
//       setQuantity(cartItem.quantity);
//     }
//   }, [cartItem]);

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);

//   const decreaseQuantity = () => {
//     if (quantity > 1) setQuantity((prev) => prev - 1);
//   };

//   const decodeProductNameFromURL = (name) => {
//     return name.replace(/~/g, " ").replace(/\-/g, " ");
//   };

//   const recname = decodeProductNameFromURL(name);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://dummyjson.com/recipes/search?q=${recname}`
//         );
//         if (res.data.recipes.length > 0) {
//           setProduct(res.data.recipes[0]);
//           console.log("ress", res);
//         }
//       } catch (err) {
//         console.log("error while fetching the details of product", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();
//   }, [recname]);

//   useEffect(() => {
//     console.log("Details here is :", product);
//   }, [product]);

//   const handleAddToCart = () => {
//     if (!product) return;

//     if (cartItem) {
//       // Update quantity to match user's selection in product details
//       dispatch(updateQuantity({ id: product.id, quantity }));
//       toast.success("Cart updated!");
//     } else {
//       // Add new item to the cart
//       dispatch(addCart({ ...product, quantity }));
//       toast.success("Added to Cart!");
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-center py-10 w-full h-screen flex justify-center items-center">
//         <div className="flex justify-center items-center space-x-2">
//           <div className="dot w-4 h-4 bg-black rounded-full animate-bounce animation-delay-0"></div>
//           <div className="dot w-4 h-4 bg-black rounded-full animate-bounce animation-delay-200"></div>
//           <div className="dot w-4 h-4 bg-black rounded-full animate-bounce animation-delay-400"></div>
//         </div>
//       </div>
//     );
//   return (
//     <>
//       <div className="w-full bg-white flex justify-center items-center min-h-screen overflow-hidden">
//         <div className="lg:max-w-[80%] mx-auto p-6 bg-white shadow-lg rounded-lg">
//           <button
//             onClick={handleGoBack}
//             className="bg-gray-50 hover:bg-gray-200 m-4 text-gray-800 px-4 py-2 rounded-md transition-all duration-300"
//           >
//             ← Go Back
//           </button>

//           <div className="grid md:grid-cols-2 gap-3">
//             {/* Product Image */}
//             <div className="">
//               <img src={product.image} alt={product.name} className="w-full" />
//             </div>
//             {/* Product Details */}
//             <div className="p-6">
//               <h1 className="text-3xl font-semibold">{product.name}</h1>
//               {/* Star Rating */}
//               <div className="flex items-center mt-3 text-[#8BA73B] text-xl">
//                 {product?.rating &&
//                   [...Array(Math.floor(product.rating))].map((_, i) => (
//                     <span key={i}>
//                       <FaStar />
//                     </span>
//                   ))}
//                 {product?.rating % 1 !== 0 && (
//                   <span>
//                     <FaStar />
//                   </span>
//                 )}
//                 {/* <span className="text-gray-600 ml-2">
//                   ({product?.rating}/5)
//                 </span> */}
//               </div>
//               <p className="text-[#F6A64D] font-medium text-2xl mt-3">
//                 ${product.caloriesPerServing}
//               </p>
//               {/* Ingredients List */}
//               <h2 className="text-xl mt-3 mb-2">Ingredients :</h2>
//               <ul className="list-disc list-inside text-gray-700">
//                 {product.ingredients?.map((ingredient, index) => (
//                   <li key={index}>{ingredient}</li>
//                 ))}
//               </ul>

//               <div className="flex flex-row mt-4 justify-start items-center gap-2">
//                 <div className="flex items-center border-2 rounded-3xl px-1">
//                   <button
//                     onClick={decreaseQuantity}
//                     className="px-3 py-3 text-sm font-bold"
//                   >
//                     -
//                   </button>
//                   <span className="mx-4 text-lg text-[#626262]">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={increaseQuantity}
//                     className="px-3 py-3 text-sm font-bold"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   className="bg-[#8BA73B] text-[#fff] text-[14px] px-7 rounded-3xl py-3 hover:bg-[#6A802D] transition-all duration-300 flex items-center justify-center gap-2"
//                   onClick={handleAddToCart}
//                 >
//                   <PiBagBold size={20} className="inline-block font-bold" />
//                   <span className="leading-none">ADD TO CART</span>
//                 </button>
//                 <button className="w-10 h-10 rounded-full flex justify-center items-center bg-[#F2F4EC] mx-[3px] hover:text-[#fff] hover:bg-[#8BA73B] transition-all duration-300">
//                   <BiHeart size={25} />
//                 </button>
//               </div>

//               <p className="text-black mt-4">
//                 <span className="font-medium text-lg">Tags:</span>{" "}
//                 <span className="text-[#6A802D]">
//                   {" "}
//                   {product.tags.join(", ")}
//                 </span>
//               </p>

//               {/* Instructions List */}
//               {/* <h2 className="text-xl font-semibold mt-4">Instructions</h2>
//               <ol className="list-decimal list-inside text-gray-700">
//                 {product.instructions?.map((step, index) => (
//                   <li key={index}>{step}</li>
//                 ))}
//               </ol> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;
