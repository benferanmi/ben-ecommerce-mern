import axios from 'axios'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'



const NewsletterBox = () => {
    const { backendUrl } = useContext(ShopContext)
    const [email, setEmail] = useState('')


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post(backendUrl + '/api/function/newsletter', { email, newsletterStatus: true })
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error);

        }
    }
    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">Subscribe now  & get 20% off</p>
            <p className="text-gray400 mt-3">
                Lorem Ipsum is simply dummy text of the printing and the typesetting industry.
            </p>

            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="enter your email" className="w-full sm:flex-1 outline-none" />
                <button type="submit" className="bg-black text-white text-xs px-10 py-4">Subscribe Now</button>
            </form>
        </div>
    )
}

export default NewsletterBox