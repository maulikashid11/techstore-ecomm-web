"use client"
import { Badge } from '@/components/ui/badge'
import { DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {

    const [orders, setOrders] = useState([]);
    const {products} = useSelector((state)=>state.product)
    useEffect(() => {
        const getOrders = async () => {
            const res = await fetch('/api/orders/getorders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        }
        
        getOrders();

    }, [])
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
        <div className='p-8'>
            <p className='text-3xl text-semibold text-gray-900 mb-8'>Dashboard</p>
            <div className='grid  md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                {[
                    { icon: DollarSign, label: 'Total Revenue', value: orders.reduce((sum, order) => order.totalPrice + sum, 0), color: 'bg-green-500' },
                    { icon: ShoppingCart, label: 'Total Orders', value: orders.length, color: 'bg-blue-500' },
                    { icon: Package, label: 'Products', value: products.length, color: 'bg-purple-500' },
                    { icon: Users, label: 'Customers', value: 2, color: 'bg-orange-500' },
                ].map((stat, index) => {
                    return <div key={index} className='border border-gray-200 rounded-xl bg-white p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <div className={`w-12 h-12 text-white rounded-xl flex items-center justify-center ₹{stat.color}`}>
                                <stat.icon />
                            </div>
                            <TrendingUp className='h-5 w-5 text-green-500' />
                        </div>
                        <p className='text-gray-900 text-3xl mb-2'>{stat.label === 'Total Revenue' && '₹'}{stat.value}</p>
                        <p className='text-gray-500 text-sm '>{stat.label}</p>
                    </div>
                })
                }
            </div>
            <div className='p-8 mt-8 bg-white rounded-xl border border-gray-200'>
                <p className='text-xl mb-10 '>Recent Orders</p>
                <div className='divide-y divide-gray-200'>
                    {

                        orders.map((order, index) => (
                            <div key={index} className='flex justify-between items-center py-7'>
                                <div>
                                    <p className='text-gray-900 text-md'>Order {order.transactionId}</p>
                                    <p className='text-gray-500 text-sm'>{order.shippingInfo.firstname} {order.shippingInfo.lastname}</p>
                                </div>
                                <div>
                                    <p>₹{order.totalPrice}</p>
                                    <Badge className={`${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</Badge>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Page