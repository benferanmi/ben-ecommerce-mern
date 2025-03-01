import { Link } from "react-router-dom"
import { assets } from "../assets/assets"

const Footer = ({ isOn }) => {
    return (
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                {
                    isOn ? <img src={assets.logowhite} alt="" className='mb-5 w-32' /> : <img src={assets.logo} alt="" className='mb-5 w-32' />
                }
                <p className={`${isOn ? 'text-slate-400' : ''}`}>Lorem Ipsum is simply dummy text of the printing and the typesetting industry.
                </p>
            </div>

            <div>
                <p className={`${isOn ? 'text-white' : ''} text-xl font-medium mb-5 uppercase`}>COMPANY</p>

                <ul className={`${isOn ? 'text-slate-400' : 'text-gray-600'} flex flex-col gap-1 `}>
                    <li><Link to={"/"}>Home</Link> </li>
                    <li><Link to={"/about"} >About Us</Link> </li>
                    <li><Link to={'/orders'}>Delivery</Link> </li>
                    <li><Link to={'privacy'} >Privacy Policy</Link></li>
                </ul>
            </div>


            <div>
                <p className={`${isOn ? 'text-white' : ''} text-xl font-medium mb-5 uppercase`}>GET IN TOUCH </p>

                <ul className={`${isOn ? 'text-slate-400' : 'text-gray-600'} flex flex-col gap-1 `}>
                    <li><a href="tel:+2348133252105">+2348133252105</a></li>
                    <li><a href="mailto:opaferanmi01@gmail.com" >opaferanmi01@gmail.com</a></li>
                </ul>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center"> Copyright 2024@ forever.com. All righ treserved</p>
            </div>
        </div>
    )
}

export default Footer


// 1:50