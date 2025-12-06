"use client"
import React, { useEffect } from 'react'
import { motion } from "motion/react";
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/base/Navbar';
import Footer from '@/components/base/Footer';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/slices/cartSlice';


const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(clearCart());
    },[])
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                <section className="max-w-3xl mx-auto px-6 py-20">
                    <div className="text-center py-20">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </motion.div>
                        <motion.h2
                            className="text-4xl text-gray-900 mb-4 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Order Placed Successfully!
                        </motion.h2>
                        <motion.p
                            className="text-gray-500 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {"Thank you for your purchase"}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-x-4"
                        >
                            <Button
                                onClick={() => router.push('/orders')}
                                className="bg-gray-900 hover:bg-gray-800 rounded-xl"
                            >
                                Track Order
                            </Button>
                            <Button
                                onClick={() => router.push('/products')}
                                variant="outline"
                                className="rounded-xl border-gray-200"
                            >
                                Continue Shopping
                            </Button>
                            <Button
                                onClick={() => router.push('/')}
                                variant="outline"
                                className="rounded-xl border-gray-200"
                            >
                                Back to Home
                            </Button>
                        </motion.div>
                    </div>
                </section>

            </div>
            <Footer />
        </>

    )
}

export default Page