import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Login from "./pages/Login"
import PlaceORder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyStripe from "./pages/VerifyStripe"
import PrivacyPolicy from "./pages/Privacy"
import Profile from "./pages/Profile"
import VerifyPaystack from "./pages/VerifyPaystack"
import { useContext } from "react"
import { ShopContext } from "./context/ShopContext"



const App = () => {
  const { isOn, darkModeBgText } = useContext(ShopContext)
  return (
    <div className={isOn ? darkModeBgText : ""}>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        <ToastContainer />
        <NavBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About isOn={isOn} />} />
          <Route path="/contact" element={<Contact isOn={isOn} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceORder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/verifyStripe" element={<VerifyStripe />} />
          <Route path="/verifyPaystack" element={<VerifyPaystack />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer isOn={isOn} />
      </div>
    </div>
  )
}

export default App