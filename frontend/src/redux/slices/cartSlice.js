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
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info("Decreased product quantity", {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;

                toast.error("Product removed from cart", {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: state => {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Cart cleared", { position: "bottom-left" });
        },
        getTotals: state => {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                }, {
                total: 0,
                quantity: 0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    },
});

export const selectItems = state => state.cart.cartItems;

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;