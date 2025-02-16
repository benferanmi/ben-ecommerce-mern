import NavBar from "./components/NavBar"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import { useEffect, useState } from "react"
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem('tokenExpiry') ? localStorage.getItem('tokenExpiry') : "")

  useEffect(() => {
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiry', tokenExpiry)
  }, [token, tokenExpiry])


  if (!token || !tokenExpiry || Date.now() > parseInt(tokenExpiry)) {

    return (
      <>      <ToastContainer />
        {
          toast.error("Login Expired. Kindly Login Again")
        }
        <Login setToken={setToken} setTokenExpiry={setTokenExpiry} />
      </>
    )
  } else {


    return (
      <div className="bg-gray-50 min-h-screen">
        <ToastContainer />
        {token === "" ? <Login setToken={setToken} setTokenExpiry={setTokenExpiry} /> :

          <>
            <NavBar setToken={setToken} setTokenExpiry={setTokenExpiry} />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base ">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        }
      </div>
    )
  }
}
export default App