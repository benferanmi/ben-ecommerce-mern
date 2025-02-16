import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-{450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin. Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.</p>

          <p>Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.</p>

          <b className="text-gray-800">Our Mission </b>
          <p>Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.</p>
        </div>

        <div className="text-xl py-4">
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convinence</b>
            <p className="text-gray-600">Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Services</b>
            <p className="text-gray-600">Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.Forever was born out of a passion for innovation and a desire to revolution. lorem ipsum e ti dior fi lusin.</p>
          </div>
        </div>

        <NewsletterBox />
      </div>
    </div>

  )
}

export default About