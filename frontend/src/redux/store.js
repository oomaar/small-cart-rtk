import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./slices/productsSlice";
import cartSliceReducer, { getTotals } from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartSliceReducer
    }
});

store.dispatch(productsFetch());
store.dispatch(getTotals());