"use client"
import Footer from '@/components/base/Footer'
import Navbar from '@/components/base/Navbar'
import { motion } from "motion/react";
import { Button } from '@/components/ui/button'
import { Calendar, CreditCard, Package } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const Page = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const res = await fetch('/api/orders/getorders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        }
        getOrders();
    }, [orders])
    

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <Navbar />
            <section className="border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl text-gray-900 mb-2 tracking-tight">
                            Order Tracking
                        </h1>
                        <p className="text-gray-500">
                            View your order history
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Orders List */}
            <section className="max-w-4xl mx-auto px-6 py-12">
                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="h-10 w-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl text-gray-900 mb-2 tracking-tight">
                            No orders yet
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Start shopping to see your orders here
                        </p>
                        <Button
                            onClick={() => router.push('/products')}
                            className="bg-gray-900 hover:bg-gray-800 rounded-xl"
                        >
                            Browse Products
                        </Button>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-gray-200 rounded-xl p-6 bg-white hover:border-gray-300 transition-colors"
                            >
                                {/* Order Header */}
                                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-gray-900 tracking-tight">
                                                Order #{order.transactionId}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <CreditCard className="h-4 w-4" />
                                                ₹{order.totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <Badge>{order.orderStatus}</Badge>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center text-sm"
                                        >
                                            <div>
                                                <p className="text-gray-900">{item.name}</p>
                                                <p className="text-gray-500">Qty: {item.productCount}</p>
                                            </div>
                                            <p className="text-gray-900">
                                                ₹{(item.price * item.productCount).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    )
}

export default Page