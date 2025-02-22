import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"

const VerifyPaystack = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()

    const reference = searchParams.get('reference')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyPaystack', { reference, orderId }, { headers: { token } })

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }


    useEffect(() => {
        verifyPayment();
    }, [token])
    return (
        <div>


        </div>
    )
}

export default VerifyPaystack