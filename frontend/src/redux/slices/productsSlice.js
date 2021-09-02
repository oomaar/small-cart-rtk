import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
    error: null
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        const PORT = "http://localhost:5000/products" || process.env.PORT;
        const res = await axios.get(`${PORT}`);
        return res?.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state) => {
            state.status = "pending";
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "success";
            state.items = action.payload;
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export default productsSlice.reducer;
export const selectItems = state => state.products.items;

// export const productsFetch = createAsyncThunk(
//     "products/productsFetch",
//     async (id = null, { rejectWithValue }) => {
//         try {
//             const res = await axios.get("http://localhost:5000/products");
//             return res?.data;
//         } catch (error) {
//             return rejectWithValue(console.error(error.message));
//         };
//     }
// );