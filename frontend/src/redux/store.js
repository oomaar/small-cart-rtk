import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./slices/productsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer
    }
});

store.dispatch(productsFetch());