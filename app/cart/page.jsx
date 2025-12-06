"use client"
import Footer from '@/components/base/Footer'
import Navbar from '@/components/base/Navbar'
import { Button } from '@/components/ui/button'
import { addToCart, decreaseQuantity } from '@/store/slices/cartSlice'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "motion/react";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'


const Page = () => {
    const { items } = useSelector((state) => state.cart)
    const { products } = useSelector((state) => state.product)
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);

    const router= useRouter();
    const totalPrice = cartItems.reduce((sum, item) => (item.price * item.productCount) + sum, 0).toFixed(2)
    const shippingFee = totalPrice > 100 || totalPrice < 1 ? 0 : 15
    useEffect(() => {
        const createCart = () => {
            setCartItems([])
            Object.entries(items).map(([key, value]) => {
                const index = products.findIndex((product) => product.id === key);

                const { id, name, category, price, image } = products[index];

                setCartItems((prev) => [...prev, { id, name, category, price, image, productCount: value }]);
            });
        }
        createCart();
    }, [items])

    const decreaseQty = (id) => {
        dispatch(decreaseQuantity(id))
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                        </motion.div>
                        <motion.h2
                            className="text-3xl text-gray-900 mb-4 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Your cart is empty
                        </motion.h2>
                        <motion.p
                            className="text-gray-500 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Add some products to get started
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                onClick={() => router.push('/products')}
                                className="bg-gray-900 hover:bg-gray-800 rounded-xl"
                                size="lg"
                            >
                                Browse Products
                            </Button>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='bg-linear-to-b from-gray-50 to-white border-b border-gray-100 py-24 px-6'>
                <h2 className='text-gray-900 text-6xl mb-5 tracking-tight'>Shopping Cart</h2>
                <p className='text-gray-500 text-lg '>{cartItems.length} items in your cart</p>
            </div>
            <div className='bg-white py-24 px-6 flex flex-col lg:flex-row gap-5'>
                <div className='w-full lg:w-3/4'>
                    <div className='flex items-center justify-between mb-5'>
                        <p className='text-gray-900 text-2xl tracking-tight'>Items</p>
                        <Button variant={'ghost'} className='text-gray-500'>Clear all</Button>
                    </div>
                    <div>
                        {
                            cartItems.map((item, index) => {
                                return <div key={index} className='border border-gray-200 rounded-2xl p-5 mb-5 flex gap-5'>
                                    <div className='rounded-2xl overflow-hidden w-25 h-25'>
                                        <Image width={1000} height={1000} src={item?.image} className='w-full h-full object-cover' alt="" />
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex justify-between'>
                                            <p className='text-gray-900 text-md tracking-tight'>{item?.name}</p>
                                            <Button className='' variant={"ghost"}><Trash2 /></Button>
                                        </div>
                                        <p className='mb-2 text-gray-500'>{item?.category}</p>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-5 items-center'>
                                                <Button onClick={() => decreaseQty(item.id)} className='border border-gray-200  rounded-xl' variant={"ghost"}><Minus /></Button>
                                                <p>{item?.productCount}</p>
                                                <Button onClick={() => dispatch(addToCart(item.id))} className='border border-gray-200  rounded-xl' variant={"ghost"}><Plus /></Button>
                                            </div>
                                            <p>₹{item?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className='bg-gray-100 rounded-xl p-10'>
                    <p className='text-3xl text-gray-900 mb-10'>Order Summary</p>
                    <div className='flex items-center justify-between py-3'>
                        <p className='text-md text-gray-500'>Subtotal</p>
                        <p className='text-md text-gray-500'>₹{totalPrice}</p>
                    </div>
                    <div className='flex items-center justify-between py-3'>
                        <p className='text-md text-gray-500'>Shipping</p>
                        <p className='text-md text-gray-500'>₹{shippingFee}</p>
                    </div>
                    <div className='flex items-center justify-between py-3 border-b border-gray-300'>
                        <p className='text-md text-gray-500'>Tax (8%)</p>
                        <p className='text-md text-gray-500'>₹{(totalPrice * 0.08).toFixed(2)}</p>
                    </div>
                    <div className='flex items-center justify-between py-3'>
                        <p className='text-md text-gray-900'>Total</p>
                        <p className='text-md text-gray-900'>₹{((totalPrice * 1.08) + shippingFee).toFixed(2)}</p>
                    </div>
                    <Button className='my-3 w-full'><Link href={'/checkout'}>Proceed to Checkout</Link></Button>
                    <Button className='my-3 mb-8 w-full' variant={'outline'}><Link href={'/products'}>Continue Shopping</Link></Button>
                    <p className='py-8 border-t text-gray-500 border-gray-300'>Free shipping on orders over ₹100</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page