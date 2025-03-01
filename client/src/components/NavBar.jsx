import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {

  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, token, setToken, setCartItems, navigate, isOn, setIsOn, darkModeBgText } = useContext(ShopContext)


  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token');
    setToken('')
    setCartItems({})
  }

  const toggleLightMode = () => {
    setIsOn(prevState => !prevState)
  }

  return (
    <div className={`${isOn ? darkModeBgText : ""} flex items-center justify-between py-5 font-medium`}>

      <Link to={'/'}>
        {
          isOn ? <img src={assets.logowhite} alt="" className='w-36' /> : <img src={assets.logo} alt="" className='w-36' />
        }

      </Link>
      <ul className={`${isOn ? "text-white" : 'text-gray-700'}  hidden sm:flex flex-row gap-5 text-sm`}>
        <NavLink to={'/'} className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className={`${isOn ? 'bg-white' : 'bg-gray-500'} 'w-2/4 border-none h-[1.5px]  hidden`} />
        </NavLink>

        <NavLink to={'/collection'} className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className={`${isOn ? 'bg-white' : 'bg-gray-500'} 'w-2/4 border-none h-[1.5px]  hidden`} />
        </NavLink>

        <NavLink to={'/about'} className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className={`${isOn ? 'bg-white' : 'bg-gray-500'} 'w-2/4 border-none h-[1.5px]  hidden`} />
        </NavLink>

        <NavLink to={'/contact'} className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className={`${isOn ? 'bg-white' : 'bg-gray-500'} 'w-2/4 border-none h-[1.5px]  hidden`} />
        </NavLink>

      </ul>


      <div className='flex items-center gap-6'>
        <div className="switch-container flex cursor-pointer items-center">
          <span className='text-sm'>{isOn ? 'LightMode' : 'DarkMode'}</span>
          <div className="switch relative w-[50px] h-[25px] bg-white border-black border-solid border-2 rounded-[25px] ml-4  " onClick={toggleLightMode}>
            <div className={`toggle w-[20px] h-[20px] bg-black rounded-full absolute top-[50%] left-1   ${isOn ? 'active' : ''}`}></div>
          </div>
        </div>
        <div className={`${isOn ? "p-2 h-[30px] w-[30px] rounded-full bg-white" : ""}`}>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='' />
        </div>

        <div className='group relative'>
          <Link to={'/login'} >
            <div className={`${isOn ? "p-2 h-[30px] w-[30px] rounded-full bg-white" : ""}`}>
              <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' alt='' src={assets.profile_icon} />
            </div>
          </Link>

          {token &&
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 bg-slate-100' >
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-s;ate-100 text-gray-500 rounded'>
                <p onClick={() => navigate('profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          }
        </div>

        <Link to={'/cart'} className='relative'>
          <div className={`${isOn ? "p-2 h-[30px] w-[30px] rounded-full bg-white" : ""}`}>
            <img src={assets.cart_icon} alt='' className={`${isOn ? 'min-w-none' : "w-5 min-w-5"}`} />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white aspect-square rounded-full text-[8px]  '>
              {getCartCount()}
            </p>
          </div>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='' />
      </div>


      {/*Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transistion-all ${visible ? 'w-full' : 'w-0'}  `} >
        <div className={isOn ? 'text-white' : 'text-gray-600' + 'flex flex-col'} >
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer' >
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </div>


          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar