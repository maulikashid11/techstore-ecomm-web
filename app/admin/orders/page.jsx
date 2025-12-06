"use client"
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner';


const Page = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('pending')
    useEffect(() => {
        const getOrders = async () => {
            const res = await fetch('/api/orders/getorders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        }

        getOrders();
    }, [status])

    const handleChange = async (status, transactionId) => {
        const res = await fetch('/api/orders/updatestatus', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status ,transactionId})
        })
        const data = await res.json();
        
        if(data.success){
            toast.success(data.message);
        }
        setStatus(status);

    }
    return (
        <div className='p-8'>
            <p className='mb-8 text-3xl  tracking-tight text-gray-900 px-5'>Orders</p>
            <div className='border border-gray-200 bg-white rounded-lg overflow-hidden'>
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 text-gray-600 text-sm border-b">
                        <tr>
                            <th className="text-left p-3">Items</th>
                            <th className="text-left p-3">Customer</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Total</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Address</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr key={index} className="bg-white">
                                <td className="p-4 text-gray-900">{order.items.map((item)=>{
                                    return <span className='text-gray-500 text-sm' key={item}>{item.name}*{item.productCount}, </span>
                                })}</td>

                                <td className="p-4 text-gray-900">
                                    <p>{order.shippingInfo.firstname} {order.shippingInfo.lastname}</p>
                                    <p className="text-sm text-gray-500">{order.shippingInfo.email}</p>
                                </td>

                                <td className="p-4 text-gray-700">
                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </td>

                                <td className="p-4 text-gray-900">
                                    ₹{order.totalPrice}
                                </td>

                                <td className="p-4 text-gray-900">
                                    <Select value={order.orderStatus} onValueChange={(e) => handleChange(e, order.transactionId)}>
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="processing">Processing</SelectItem>
                                                <SelectItem value="shipped">Shipped</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </td>

                                <td className="p-4 text-gray-700">
                                    <p className="text-sm">
                                        {order.shippingInfo.phone},
                                        {order.shippingInfo.street},
                                        {order.shippingInfo.city},
                                        {order.shippingInfo.state},
                                        {order.shippingInfo.zipcode}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Page