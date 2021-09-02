import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./slices/productsSlice";
import cartSliceReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartSliceReducer
    }
});

store.dispatch(productsFetch());