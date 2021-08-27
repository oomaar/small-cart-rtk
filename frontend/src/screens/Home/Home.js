import { selectItems } from "../../redux/slices/productsSlice";
import { useSelector } from "react-redux";

export const Home = () => {
    const items = useSelector(selectItems);

    const products = items.map(product => (
        <div key={product.id}>
            <img style={{
                width: "600px",
            }} src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
        </div>
    ));

    return (
        <div>
            {products}
        </div>
    );
};