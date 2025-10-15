import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
