import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {

    const { products, isOn } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestSeller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title isOn={isOn} text1={'BEST'} text2={'SELLERS'} />
                <p className={`w-3/4 m-auto text-xs sm:text-sm md:text-base ${isOn ? "text-slate-200" : "text-gray-600"}`}>
                    Lorem Ipsum is simply dummy text of the printing and the typesetting industry.
                </p>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => (
                    <ProductItem isOn={isOn} key={index} id={item.id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    )
}

export default BestSeller