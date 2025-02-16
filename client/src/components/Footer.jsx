import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img src={assets.logo} className="mb-5 w-32" />
                <p>Lorem Ipsum is simply dummy text of the printing and the typesetting industry.
                </p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5 uppercase">COMPANY</p>

                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>


            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH </p>

                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+2348133252105</li>
                    <li>opaferanmi01@gmail.com</li>
                </ul>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center "> Copyright 2024@ forever.com. All righ treserved</p>
            </div>
        </div>
    )
}

export default Footer


// 1:50