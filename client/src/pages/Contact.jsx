import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const Contact = ({ isOn }) => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 border-t">
                <Title isOn={isOn} text1={'CONTACT'} text2={'US'} />
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
                <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />

                <div className="flex flex-col justify-center items-start gap-6">
                    <p className={` ${isOn ? 'text-white' : "text-gray-600"} font-semibold text-xl `}>Our Store</p>
                    <p className={`${isOn ? "text-slate-100" : "text-gray-500"}`}>200213 williams Station <br /> Suite 350, Banana island Lagos</p>
                    <p className={`${isOn ? "text-slate-100" : "text-gray-500"}`}>Tel: (+234) 8125291401 <br /> Email: benferanmiopafunso@gmail.com</p>
                    <p className="text-xl font-semibold"> Carrers af Forever</p>
                    <p className={`${isOn ? "text-slate-100" : "text-gray-500"}`}>Learm More about our Teams and Job Openings.</p>
                    <button className={` ${isOn ? "hover:bg-slate-300 bg-white text-black" : " hover:text-white "} border border-black px-8 py-4 text-sm hover:bg-blacktransition-all duration-50`}>Explor Jobs</button>
                </div>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default Contact