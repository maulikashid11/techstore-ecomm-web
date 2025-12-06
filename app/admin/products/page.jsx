"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const Products = () => {
    const { products } = useSelector((state) => state.product)
    const handleDelete = async (id) => {
        console.log(id);
        const res = await fetch('/api/product/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        })

        const data = await res.json();

        if (data.success) {
            toast.success("Product deleted successfully");
        }
    }
    return (
        <div className='p-8 w-4/5'>
            <div className='mb-7 flex items-center justify-between'>
                <p className='text-3xl tracking-tight'>Products</p>
                <Button className='rounded-xl'>
                    <Plus />
                    <p>Add Product</p>
                </Button>
            </div>

            <Input className='w-1/2 mb-4 bg-gray-100 border-gray-300 rounded-xl' placeholder='Search products...' />
            <div className='border border-gray-200 bg-white rounded-lg overflow-hidden'>
                <table className='w-full'>
                    <thead className='p-3 text-gray-500 text-sm bg-gray-50 w-full border-b border-gray-200'>
                        <tr className='flex items-center w-full p-3'>
                            <th className='w-3/7 text-start'>Product</th>
                            <th className='w-1/7 text-start'>Category</th>
                            <th className='w-1/7 text-start'>Price</th>
                            <th className='w-1/7 text-start'>Stock</th>
                            <th className='w-1/7 text-start'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {
                            products.map((product, index) => {
                                return <tr key={index} className='bg-white flex items-center p-4'>
                                    <td className='flex w-3/7 gap-3 items-center'>
                                        <div className='rounded-2xl w-12 h-12'>
                                            <Image
                                                src={product.image}
                                                width={48}
                                                height={48}
                                                className="rounded-2xl object-cover w-full h-full"
                                                alt={product.name}
                                            />
                                        </div>
                                        <p>{product.name}</p>
                                    </td>
                                    <td className='text-gray-500 w-1/7'>{product.category}</td>
                                    <td className='text-gray-900 w-1/7'>₹{product.price}</td>
                                    <td className='text-gray-500 w-1/7'>{product.stock}</td>
                                    <td>
                                        <Button variant={'ghost'}><Edit /></Button>
                                        <Button onClick={(e) => { handleDelete(product._id) }} className='hover:text-red-500 duration-200' variant={'ghost'}><Trash2 /></Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products