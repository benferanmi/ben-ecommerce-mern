import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import Cart from "./Cart"
import Orders from "./Orders"


const Profile = () => {
    const [userData, setUserData] = useState([])
    const { backendUrl, token, navigate } = useContext(ShopContext)


    const fetchUserDetails = async () => {
        try {

            const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } })

            setUserData(response.data.userData)

        } catch (error) {
            toast.error(error.message)
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [token])

    return (
        <div className="bg-slate-300">
            <div className="flex flex-col lg:flex-row gap-3 justify-center items-start p-2 md:px-5 md:py-5 md:m-5 ">
                <div className="block bg-inherit w-full text-black">
                    <div className="block bg-white border-r-5 p-2 md:px-10 py-10 broder-r-20 w-full">
                        <div className="p-5 md:p-10">
                            <img src={assets.user_profile_icon} alt="" />

                            <div className="my-4 md:m-10 ">
                                <h3 className="text-[30px] font-bold mb-8 mt-4">My Profile</h3>
                                <p className=" text-sm md:text-lg text-slate-700 ">Name: {userData.name}</p>
                                <p className=" text-sm md:text-lg text-slate-700 ">Email: {userData.email}</p>
                            </div>

                            <div className="outline-none border-none text-white bg-black px-12 py-2 rounded-full border-r-5 text-center block max-w-[200px] mt-8 cursor-pointer" onClick={() => navigate("/")} >Go to Home</div>
                        </div>
                    </div>
                </div>
                <div className="flex bg-inherit w-full text-black flex-col gap-10">
                    <div className="block bg-white rounded  px-3 md:px-10 h-fit  w-full rounded">
                        <Cart />

                    </div>
                    <div className="block bg-white rounded px-3 md:px-10 w-full h-fit rounded">
                        <Orders />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile