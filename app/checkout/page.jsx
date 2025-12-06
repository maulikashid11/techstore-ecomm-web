"use client"
import Footer from '@/components/base/Footer'
import Navbar from '@/components/base/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Truck } from 'lucide-react'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const Page = () => {
    const { items } = useSelector((state) => state.cart)
    const { products } = useSelector((state) => state.product)
    const [cartItems, setCartItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
    })
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
    }, [items]);

    const pay = async () => {
        const { firstname, lastname, email, phone, street, city, state, zipcode } = shippingInfo;
        if (!(firstname || lastname || email || phone || street || city || state || zipcode)) {
            console.log('hii')
            toast.error("Please fill all details");
            return;
        }
        const res = await fetch("/api/razorpay/order", {
            method: "POST",
            body: JSON.stringify({ cartItems, shippingInfo, totalPrice, }),
        });

        const data = await res.json();

        console.log(data);
        const options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": Number.parseInt(totalPrice) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Techstore", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `₹{process.env.NEXT_PUBLIC_URL}/api/razorpay/verify`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    };

    const handleChange = (e) => {
        console.log(shippingInfo);
        setShippingInfo({ ...shippingInfo, [e.target.id]: e.target.value });
    }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className=''>
                <Navbar />
                <div className='bg-linear-to-b from-gray-50 to-white border-b border-gray-100 py-24 px-6'>
                    <h2 className='text-gray-900 text-6xl mb-5 tracking-tight'>Checkout</h2>
                    <p className='text-gray-500 text-lg '>Complete your purchase</p>
                </div>
                <div className='bg-white py-18 px-6 flex flex-col lg:flex-row gap-5'>
                    <div className='w-2/3'>
                        <div className='flex gap-2 items-center mb-5'>
                            <Truck className='w-7 h-7' />
                            <p className='text-gray-900 text-2xl'>Shipping Information</p>
                        </div>
                        <div className='w-full'>
                            <div className='flex gap-5 mb-4 '>
                                <div className='w-full'>
                                    <Label className='mb-2 ' htmlFor='firstname'>First Name</Label>
                                    <Input value={shippingInfo.firstname} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='firstname' />
                                </div>
                                <div className='w-full'>
                                    <Label className='mb-2 ' htmlFor='lastname'>Last Name</Label>
                                    <Input value={shippingInfo.lastname} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='lastname' />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <Label className='mb-2' htmlFor='email'>Email</Label>
                                <Input value={shippingInfo.email} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='email' />
                            </div>
                            <div className='mb-4'>
                                <Label className='mb-2' htmlFor='phone'>Phone</Label>
                                <Input value={shippingInfo.phone} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='phone' type='number' />
                            </div>
                            <div className='mb-4'>
                                <Label className='mb-2' htmlFor='street'>Street Address</Label>
                                <Input value={shippingInfo.street} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='street' />
                            </div>
                            <div className='flex gap-5 mb-4'>
                                <div className='w-full'>
                                    <Label className='mb-2' htmlFor='city'>City</Label>
                                    <Input value={shippingInfo.city} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='city' />
                                </div>
                                <div className='w-full'>
                                    <Label className='mb-2' htmlFor='state'>State</Label>
                                    <Input value={shippingInfo.state} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='state' />
                                </div>
                                <div className='w-full'>
                                    <Label className='mb-2' htmlFor='zipcode'>Zip Code</Label>
                                    <Input value={shippingInfo.zipcode} onChange={(e) => { handleChange(e) }} className='bg-gray-100 border border-gray-300 rounded-lg' id='zipcode' />
                                </div>
                            </div>
                            <Button onClick={pay} className='w-full'>Continue to Payment</Button>
                        </div>
                    </div>
                    <div className='bg-gray-100 rounded-xl p-10 w-1/3'>
                        <p className='text-3xl text-gray-900 mb-10'>Order Summary</p>
                        {
                            cartItems.map((item, index) => {
                                return (
                                    <div key={index} className='flex items-center justify-between py-3'>
                                        <p className='text-sm text-gray-500'>{item.name} × {item.productCount}</p>
                                        <p className='text-sm text-gray-900'>₹{item.price}</p>
                                    </div>
                                )
                            })
                        }


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

                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}

export default Page