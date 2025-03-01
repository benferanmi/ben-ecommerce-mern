import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, isOn }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
            <div className="overflow-hidden">
                <img src={image[0]} alt="" className="hover:scale-110 trasistion ease-in-out max-h-[200px] min-w-[180px]" />
            </div>

            <p className={`pt-3 pb-1 text-sm ${isOn ? "text-white" : ""}`}>{name}</p>
            <p className={`text-sm font-medium ${isOn ? "text-white" : ""}`}>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem