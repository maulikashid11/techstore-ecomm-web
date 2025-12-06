"use client"
import { Zap } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-blue-950 text-white py-14 px-6'>
            <div className='grid sm:grid-cols-4 gap-5 border-b border-gray-600 pb-5 '>
                <div>
                    <motion.div className='flex items-center     gap-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <motion.div>
                            <Zap className='' />
                        </motion.div>
                        <p className='tracking-tight'>TechStore</p>
                    </motion.div>
                    <p className='text-sm text-gray-400 tracking-wide mt-5'>Premium tech gadgets for everyone.</p>
                </div>
                <div>
                    <p className=' mb-5'>Shop</p>
                    <ul>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>All Products</li>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>New Arrivals</li>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>Best Sellers</li>
                    </ul>
                </div>
                <div>
                    <p className=' mb-5'>Support</p>
                    <ul>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>Contact Us</li>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>FAQs</li>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>Shipping</li>
                    </ul>
                </div>
                <div>
                    <p className=' mb-5'>Company</p>
                    <ul>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>About Us</li>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>Careers</li>
                        <li className='my-2 text-sm tracking-wide text-gray-400'>Privacy</li>
                    </ul>
                </div>
            </div>
            <p className='mt-8 text-center'>© 2025 TechStore. All rights reserved.</p>
        </footer>
    )
}

export default Footer