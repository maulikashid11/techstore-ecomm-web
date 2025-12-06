"use client";
import { ShoppingBag, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { items } = useSelector((state) => state.cart);
    const { isSignedIn } = useUser();

    return (
        <header className='bg-white/80 backdrop-blur-md p-5 sticky top-0 z-50 border-b border-gray-100'>
            <div className=' flex justify-between items-center'>
                <motion.div className='flex items-center gap-2' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <motion.div className='' animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                        <Zap className='' />
                    </motion.div>
                    <p className='text-xl tracking-tight'>TechStore</p>
                </motion.div>
                <nav className='hidden md:flex items-center gap-8'>
                    <Link href={'/'} className='text-gray-600 tracking-wide text-sm hover:text-black duration-300'>Home</Link>
                    <Link href={'/products'} className='text-gray-600 tracking-wide text-sm hover:text-black duration-300'>Products</Link>
                    <Link href={'/categories'} className='text-gray-600 tracking-wide text-sm hover:text-black duration-300'>Categories</Link>
                    <Link href={'/about'} className='text-gray-600 tracking-wide text-sm hover:text-black duration-300'>About</Link>
                    <Link href={'/contact'} className='text-gray-600 tracking-wide text-sm hover:text-black duration-300'>Contact</Link>
                    <Link href={'/orders'} className='text-gray-600 tracking-wide text-sm hover:text-black duration-300'>Orders</Link>
                </nav>
                <div className='flex items-center gap-2'>
                    <Link href={'/cart'}><Button variant={"ghost"} size={"icon"} className='text-gray-600 relative hover:text-black duration-300'>
                        <ShoppingBag />
                        <p className=''>{Object.entries(items).length > 0 && <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {Object.entries(items).length}
                        </span>}</p>
                    </Button></Link>
                    {
                        !isSignedIn ?
                            <SignInButton forceRedirectUrl="/create-user"><Button className=''>Sign in</Button></SignInButton>
                            : <UserButton />
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar