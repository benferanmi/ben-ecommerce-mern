import { useContext } from "react"
import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsletterBox from "../components/NewsletterBox"
import OurPolicy from "../components/OurPolicy"
import { ShopContext } from "../context/ShopContext"

const Home = () => {
  const { isOn } = useContext(ShopContext)
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy isOn={isOn} />
      <NewsletterBox />
    </div>
  )
}

export default Home