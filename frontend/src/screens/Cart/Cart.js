import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, selectItems } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useEffect } from "react";

export const Cart = () => {
    const items = useSelector(selectItems);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handelRemoveFromCart = product => dispatch(removeFromCart(product));
    const handleDecreaseCart = product => dispatch(decreaseCart(product));
    const handleAddToCart = product => dispatch(addToCart(product));
    const handleClearCart = () => dispatch(clearCart());

    return (
        <div className="cart__container">
            <h2>Your cart</h2>

            {items.length === 0 ? (
                <div className="cart__subContainer empty">
                    <p className="title">Your cart is empty</p>
                    <div>
                        <Link to="/" className="subtotal__link">
                            <span>
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                    <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                                </svg>
                            </span>
                            <span className="empty__text">continue shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="cart__subContainer">
                        <div className="titles">
                            <h3 className="title">Product</h3>
                            <h3 className="title">Price</h3>
                            <h3 className="title">Quantity</h3>
                            <h3 className="title">Total</h3>
                        </div>
                        <div className="cart__items">
                            {items && items.map(item => (
                                <div className="cart__item" key={item.id}>
                                    <div className="info__container">
                                        <div className="img__container">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="text__container">
                                            <h4>{item.name}</h4>
                                            <p>{item.description}</p>
                                            <button onClick={() => handelRemoveFromCart(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                    <span className="item__price">${item.price}</span>
                                    <div className="qty__buttons">
                                        <button
                                            className="qty__button"
                                            onClick={() => handleDecreaseCart(item)}
                                        >
                                            -
                                        </button>
                                        <p>{item.cartQuantity}</p>
                                        <button
                                            className="qty__button"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="item__price">${item.price * item.cartQuantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bottom__container">
                        <button className="clear__cart" onClick={() => handleClearCart()}>Clear Cart</button>
                        <div className="subtotal__container">
                            <div className="total__contaier">
                                <h3>Subtotal</h3>
                                <p>${cart.cartTotalAmount}</p>
                            </div>
                            <p className="total__text">Taxes and shipping calculated at checkout</p>
                            <button className="checkout">Check out</button>
                            <div>
                                <Link to="/" className="subtotal__link">
                                    <span>
                                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                                        </svg>
                                    </span>
                                    <span>continue shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
