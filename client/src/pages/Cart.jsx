import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title.jsx'
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";
import { Link } from "react-router-dom";

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])


  if (cartData?.length === 0) {
    return <div className="text-sm bg-slate-200 text-black flex flex-col items-center justify-centerh-[100vh] px-16 w-[100%] px-15 py-10 ">
      <img alt="" className="w-20 h-20" src={assets.shopping_cart_icon} />
      <p className="mt-3 text-black">Your cart is empty</p>
      <Link className="outline-none border-none text-white bg-black px-12 py-6 border-r-5 text-center block max-w-[200px] mt-8" to={'/collection'}>Go to Collection</Link>

    </div>
  } else {

    return (
      <div className="border-t pt-14">

        <div className="text-2xl mb-3">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        <div className="">
          {
            cartData.map((item, index) => {

              const productData = products.find((product) => product._id === item._id)

              return (
                <div key={index}
                  className="py-4 border-t border-b text-gray-700 grid 
              grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">

                  <div className="flex items-start gap-6">
                    <img src={productData.image[0]} className="w-16 sm:w-20" alt="" />
                    <div>
                      <p className="tex-xs sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>{currency}{productData.price}</p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                      </div>
                    </div>
                  </div>

                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} alt="" className="w-4 mr-4 sm:w-5 cursor-pointer" />
                </div>
              )
            })
          }
        </div>

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3 uppercase">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart