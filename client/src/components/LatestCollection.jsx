import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products, isOn } = useContext(ShopContext);

    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])



    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl' >
                <Title isOn={isOn} text1={'LATEST'} text2={'COLLECTION'} />
                <p className={`w-3/4 m-auto text-xs sm:text-sm md:text-base ${isOn ? "text-slate-200" : "text-gray-600"}`}>
                    Lorem Ipsum is simply dummy text of the printing and the typesetting industry.
                </p>
            </div>

            {/* Rendering rpoducts */}
            <div className='grid grid-cols-2 sm:grids-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem isOn={isOn} key={index} id={item._id} name={item.name} price={item.price} image={item.image} />

                    ))
                }
            </div>

        </div>
    )
}

export default LatestCollection




// 1hr 20 mins