import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {

  const { products, search, showSearch, isOn } = useContext(ShopContext)
  const [showFliters, setShowfliters] = useState(false);
  const [fliterProducts, setFliterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('');


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.category))
    }

    setFliterProducts(productsCopy)

  }

  const sortProduct = () => {
    let fpCopy = fliterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFliterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFliterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;

    }

  }

  useEffect(() => {
    setFliterProducts(products)
  }, [])

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className={`${isOn ? "text-white" : ""} flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t`} >

      {/* fliter options */}

      <div className="min-w-60">
        <p onClick={() => setShowfliters(!showFliters)} className="my-2 text-xl flex items-center cursor-pointer gap-2"> FLITERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFliters ? 'rotate-90 ' : ''} `} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFliters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className={`${isOn ? "text-white" : "text-gray-700"} flex flex-col gap-2 text-sm font-light`}>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onClick={toggleCategory} value={'Men'} /> Men
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onClick={toggleCategory} value={'Women'} /> Women
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onClick={toggleCategory} value={'Kids'} /> Kids
            </p>
          </div>
        </div>

        {/* subcategories */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFliters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className={`${isOn ? "text-white" : "text-gray-700"} flex flex-col gap-2 text-sm font-light`}>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onClick={toggleSubCategory} value={'Topwear'} /> Topwear
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onClick={toggleSubCategory} value={'Bottomwear'} /> Bottomwear
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" onClick={toggleSubCategory} value={'Winterwear'} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title isOn={isOn} text1={'All'} text2={'COLLECTIONS'} />

          {/* Products Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-200 text-sm px-2">
            <option value={'relevant'} >Sort by: Relevant</option>
            <option value={'low-high'}>Sort by Low  -  High</option>
            <option value={'high-low'}>Sort by High  -  Low </option>
          </select>
        </div>

        {/* Map Products */}


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6" >
          {
            fliterProducts.map((item, index) => (
              <ProductItem isOn={isOn} key={index} name={item.name} price={item.price} id={item._id} image={item.image} />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Collection