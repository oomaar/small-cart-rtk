import { selectItems } from "../../redux/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { addToCart } from "../../redux/slices/cartSlice";

export const Home = () => {
    const items = useSelector(selectItems);
    const dispatch = useDispatch();
    const handleAddToCart = product => dispatch(addToCart(product));

    const products = items.map(product => (
        <div key={product.id} className="product__container">
            <h3 className="product__title">{product.name}</h3>
            <img
                className="product__img"
                src={product.img}
                alt={product.name}
            />
            <div className="description__container">
                <p className="product__description">{product.description}</p>
                <span className="product__price">${product.price}</span>
            </div>
            <button className="product__button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
    ));

    return (
        <div className="home__container">
            {products}
        </div>
    );
};