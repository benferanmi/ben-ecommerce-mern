import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
        setList(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error)
      console.log(error)
    }
  };

  const removeProduct = async (id) => {

    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error)
      console.log(error);

    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">

        {/* List table title */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Catrgory</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* { Product List} */}

        {
          list.map((item, index) => (
            <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border bg-gray-100" key={index}>
              <img className="w-12" src={item.image[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className="text-right md:text-center text-lg cursor-pointer" onClick={() => removeProduct(item._id)} >X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List