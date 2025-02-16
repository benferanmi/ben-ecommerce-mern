import { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from 'react-toastify';


// eslint-disable-next-line react/prop-types
const Login = ({ setToken, setTokenExpiry }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                const expiryTime = Date.now() + 3600 * 5000;
                setTokenExpiry(expiryTime)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold mb-4">
                        Admin Panel
                    </h1>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3 min-w-72">
                            <p className="text-sm font-medium text-gray-700 mt-2">Email Adress</p>
                            <input className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3 min-w-72">
                            <p className="text-sm font-medium text-gray-700 mt-2">Password</p>
                            <input className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        </div>

                        <button className="mt-2 w-full rounded-md text-white bg-black px-4 py-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login