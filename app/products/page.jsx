"use client";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"
import ProductCard from '../../components/base/ProductCard'
import { useEffect, useState } from "react";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addAllProducts } from "@/store/slices/productSlice";
import { clearCart } from "@/store/slices/cartSlice";


const categories = ['All', "Audio", "Wearables", "Computers", "Mobile", "Photography", "Accessories", "Smart Home"];

const priceRanges = ["Under $100", "$100 - $500", "$500 - $1000", "Over $1000"];

const Page = () => {

    const [categoryFilter, setCategoryFilter] = useState(['All']);
    const [priceFilter, setPriceFilter] = useState(['']);
    const [query, setQuery] = useState('');

    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        (async function () {
            const res = await fetch('/api/product/getall', {
                method: "GET",
            })
            const data = await res.json();
            if (data.success) {
                dispatch(addAllProducts(data.products.map(({ _id, name, category, price, image ,stock}) => (
                    { id:_id, name, category, price, image,stock }
                ))))
            }
        })();
    }, [dispatch]);

    const categoryChange = (category) => {
        if (category !== 'All') {
            if (categoryFilter.includes('All')) setCategoryFilter((prev => prev.filter(ca => ca !== 'All')))
            if (categoryFilter.includes(category)) setCategoryFilter((prev => prev.filter(ca => ca !== category)))
            else setCategoryFilter(prev => prev.concat(category));
        } else {
            setCategoryFilter(["All"])
        }
    }
    const priceChange = (price) => {
        if (price != '') {
            if (priceFilter.includes(price)) setPriceFilter((prev => prev.filter(ca => ca !== price)))
            else setPriceFilter(prev => prev.concat(price));
        }
    }

    useEffect(() => {
        (function () {
            if (categoryFilter.length === 0) {
                setCategoryFilter(["All"]);
            }
            if (priceFilter.length === 0) {
                setPriceFilter([]);
            }
        })()
    }, [categoryFilter, priceFilter])
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                <div className='bg-linear-to-b from-gray-50 text-center py-24 px-8 to-white border-b border-gray-200'>
                    <h2 className='text-4xl  md:text-6xl text-gray-900 mb-6'>All Products</h2>
                    <p className='text-lg tracking-wide text-gray-400'>Discover our complete collection of premium tech gadgets</p>
                </div>
                <div className='py-16 px-5 flex gap-5 flex-col lg:flex-row justify-start'>
                    <div>
                        <div className='flex justify-between mb-6'>
                            <p>Filters</p>
                            <Button variant={"ghost"} className="text-xs text-gray-400 hover:text-gray-900 font-semibold cursor-pointer">Clear all</Button>
                        </div>
                        <div className="mb-6">
                            <p className="font-semibold text-sm mb-3">Search</p>
                            <Input value={query} onChange={(e) => { setQuery(e.target.value) }} className="text-xs w-50" placeholder="Seach Product..." />
                        </div>
                        <div className="mb-6">
                            <p className="font-semibold text-sm mb-4">Categories</p>
                            <div>
                                {
                                    categories.map((category, index) => (
                                        <div key={index} className="flex gap-3 my-3">
                                            <Checkbox checked={categoryFilter.includes(category)} onCheckedChange={() => { categoryChange(category) }} id={category} />
                                            <Label htmlFor={category} className="text-gray-400 hover:text-gray-900 font-semibold cursor-pointer">{category}</Label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="font-semibold text-sm mb-4">Price Range</p>
                            <div>
                                {
                                    priceRanges.map((priceRange, index) => (
                                        <div key={index} className="flex gap-3 my-3">
                                            <Checkbox checked={priceFilter.includes(priceRange)} onCheckedChange={() => priceChange(priceRange)} id={priceRange} />
                                            <Label htmlFor={priceRange} className="text-gray-400 hover:text-gray-900 font-semibold cursor-pointer">{priceRange}</Label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 grid md:grid-cols-3 sm:grid-cols-2 gap-10 flex-wrap">
                        {
                            products.filter((product) => (product.name.toLowerCase().includes(query))).filter((product) => {
                                if (categoryFilter[0] === "All") {
                                    return true
                                } else {
                                    if (categoryFilter.includes(product.category)) {
                                        return true
                                    } else {
                                        return false
                                    }

                                }
                            }).filter((product) => {
                                if (priceFilter.length === 1 && priceFilter[0] === '') {
                                    return true;
                                } else {
                                    if (priceFilter.includes('Under $100') && product.price < 100) {
                                        return true
                                    }
                                    else if (priceFilter.includes('$100 - $500') && (product.price > 100 && product.price < 500)) {
                                        return true
                                    }
                                    else if (priceFilter.includes('$500 - $1000') && (product.price > 500 && product.price < 1000)) {
                                        return true
                                    }
                                    else if (priceFilter.includes('Over $1000') && product.price > 1000) {
                                        return true
                                    }
                                }
                            }).map(({ id, name, price, category, image }, index) => {
                                return <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                    <ProductCard id={id} name={name} price={price} category={category} image={image} />
                                </motion.div>
                            }
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Page