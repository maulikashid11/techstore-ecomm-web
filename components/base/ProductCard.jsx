import { motion } from 'motion/react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from "@/store/slices/cartSlice";


const ProductCard = ({ id, name, category, price, image }) => {
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(id))
  }
  return (
    <motion.div whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }} className='group rounded-3xl  hover:shadow-2xl border hover:scale-102 border-gray-100 duration-300 overflow-hidden'>
      <div className='aspect-4/3 overflow-hidden '>
        <Image className='object-cover transition-transform group-hover:scale-110 duration-700  w-full h-full' width={2000} height={2000} src={image} alt="" />
      </div>
      <div className='p-5 text-start'>
        <p className='text-gray-500'>{category}</p>
        <p className=' my-5'>{name}</p>
        <div className='flex justify-between items-center'>
          <p>₹{price}</p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileHover={{ opacity: 1, scale: 1 }} className=''>
            <Button onClick={addItemToCart} className='rounded-full'>
              <ShoppingCart className='w-6 h-6' />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard