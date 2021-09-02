import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? (
        JSON.parse(localStorage.getItem("cartItems"))
    ) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
                    position: "bottom-left"
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} Added to cart`, {
                    position: "bottom-left"
                });
            };

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const index = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id);
            let newCart = [...state.cartItems];

            if (index <= 0) {
                newCart.splice(index, 1);
                state.cartItems = newCart;
                toast.error(`${action.payload.name} Removed from Cart`, { position: "bottom-left" });
            } else {
                console.warn(
                    `Cant remove product (id: ${action.payload.id}) as it's not in the cart`
                );
            };

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return state;
        },
    },
});

export const selectItems = state => state.cart.cartItems;
export const selectQuantity = state => state.cart.cartTotalQuantity;
export const selectTotalAmount = state => state.cart.cartTotalAmount;

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;