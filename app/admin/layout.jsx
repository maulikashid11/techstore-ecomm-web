"use client"
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Package, Plus, ShoppingCart, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Layout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    async function getUser() {
        const res = await fetch('/api/admin/getuser', {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();

        if (!data.success && !(pathname === "/admin/login" || pathname === "/admin/signup")) {
            router.push('/admin/login')
        }

    }
    getUser();

    const logout = async () => {
        const res = await fetch('/api/admin/logout',
            {
                method: "GET",
                credentials: "include"
            }
        )
        const data = await res.json();
        if (data.success) {
            router.push('/admin/')
        }

    }
    return (pathname === "/admin/login" || pathname === "/admin/signup") ?
        (
            <>
                {children}
            </>
        ) :
        (
            <div>
                <div className='flex items-center justify-between p-5 border-b border-gray-200'>
                    <div className='flex gap-2 items-center'>
                        <Zap />
                        <p className='text-gray-900 text-bold text-xl tracking-tight'>TechStore Admin</p>
                    </div>
                    <Button onClick={() => { logout() }} variant={'outline'}>Exit Admin</Button>
                </div>
                <div className='flex h-screen'>
                    <div className='w-1/5 p-4 flex flex-col gap-5 '>
                        <Link href={"/admin/"}>
                            <Button variant={'ghost'} className={`flex items-center justify-start text-sm text-gray-700 `}>
                                <LayoutDashboard className='' />
                                <p className=''>Dashboard</p>
                            </Button>
                        </Link>
                        <Link href={"/admin/products"}>
                            <Button variant={'ghost'} className={`flex items-center justify-start text-sm text-gray-700 `}>
                                <Package className='' />
                                <p className=''>Products</p>
                            </Button>
                        </Link>
                        <Link href={"/admin/orders"}>
                            <Button variant={'ghost'} className={`flex items-center justify-start text-sm text-gray-700 `}>
                                <ShoppingCart className='' />
                                <p className=''>Orders</p>
                            </Button>
                        </Link>
                        <Link href={"/admin/create-product"}>
                            <Button variant={'ghost'} className={`flex items-center justify-start text-sm text-gray-700 `}>
                                <Plus className='' />
                                <p className=''>Create Product</p>
                            </Button>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        )
}

export default Layout