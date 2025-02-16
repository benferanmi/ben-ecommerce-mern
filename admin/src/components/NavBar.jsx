import { assets } from '../assets/assets'


// eslint-disable-next-line react/prop-types
const NavBar = ({ setToken, setTokenExpiry }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-[max(10%, 80px)]' src={assets.logo} alt='' />
            <button onClick={() => { setToken(''), setTokenExpiry('') }} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm'>Logout</button>
        </div>
    )
}

export default NavBar