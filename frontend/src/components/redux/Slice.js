import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Classic Croissant",
      price: 180,
      qty: 1,
      image: "../Image/cake.webp",
    },
    {
      id: 2,
      name: "Rosewater Macarons",
      price: 240,
      qty: 1,
      image: "../Image/chocolate.jpg",
    },
    {
      id: 3,
      name: "Chocolate Eclair",
      price: 467.5,
      qty: 2,
      image: "../Image/corsant.webp",
    },
  ],
  delivery: 20,
  taxRate: 0.1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty++;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty--;
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { increaseQty, decreaseQty, deleteItem, clearCart } =
  cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
