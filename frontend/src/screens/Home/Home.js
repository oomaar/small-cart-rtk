import { selectItems } from "../../redux/slices/productsSlice";
import { useSelector } from "react-redux";
import "./Home.css";

export const Home = () => {
    const items = useSelector(selectItems);

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
            <button className="product__button">Add to Cart</button>
        </div>
    ));

    return (
        <div className="home__container">
            {products}
        </div>
    );
};