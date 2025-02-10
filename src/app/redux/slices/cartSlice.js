import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  cart: loadCartFromLocalStorage(),
  productCount: loadCartFromLocalStorage().length,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1; // Just increase by 1 when clicking "Add to Cart"
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add with quantity = 1
      }

      state.productCount = state.cart.length;
      saveCartToLocalStorage(state.cart);
    },

    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.productCount = state.cart.length;
      saveCartToLocalStorage(state.cart);
    },

    updateQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.productCount = state.cart.length;
      saveCartToLocalStorage(state.cart);
    },
    

    clearCart: (state) => {
      state.cart = [];
      state.productCount = 0;
      saveCartToLocalStorage(state.cart);
    },
  },
});

export const { addCart, removeCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
