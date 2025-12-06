import { ArrowRight } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

const CategoryCard = ({ name, productCount, image }) => {
    return (
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className='group transition-all rounded-3xl border border-gray-100 hover:shadow-2xl overflow-hidden duration-600'>
            <div className='aspect-4/3 overflow-hidden'>
                <Image src={image} width={1000} height={1000} alt="" className='w-full h-full group-hover:scale-105 duration-400' />
            </div>
            <div className='p-5 flex items-center justify-between'>
                <div>
                    <p className='text-md text-gray-900 tracking-tight mb-3'>{name}</p>
                    <p className='text-xs text-gray-400 tracking-wider'>{productCount} PRODUCTS</p>
                </div>
                <motion.div animate={{x:[0,5,0]}} transition={{duration:1.5,repeat:Infinity,ease:"easeInOut"}} className=''>
                <ArrowRight className='text-gray-500 group-hover:text-gray-900' />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default CategoryCard