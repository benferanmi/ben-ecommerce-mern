import { assets } from "../assets/assets"

const OurPolicy = ({ isOn }) => {

    return (
        <div className={`flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base  ${isOn ? "text-white" : "text-gray-700"}`}>

            <div>
                <img className={`${isOn ? "p-2 bg-white rounded-full " : ""} w-12 m-auto mb-5`} src={assets.exchange_icon} alt="" />
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className={` ${isOn ? "text-slate-300" : "text-gray-400"} `}>We Offer hassele free exchange policy</p>
            </div>
            <div>
                <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">7 days return Policy</p>
                <p className={` ${isOn ? "text-slate-300" : "text-gray-400"} `}>We provide 7 days free return policy</p>
            </div>
            <div>
                <img src={assets.support_img} className={`${isOn ? "p-2 bg-white rounded-full" : ""} w-12 m-auto mb-5`} alt="" />
                <p className="font-semibold">Best customer support</p>
                <p className={` ${isOn ? "text-slate-300" : "text-gray-400"} `}>We provide 24/7 customer support service</p>
            </div>
        </div>
    )
}

export default OurPolicy