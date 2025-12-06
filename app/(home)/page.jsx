"use client";
import CategoryCard from "@/components/base/CategoryCard";
import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";
import ProductCard from "@/components/base/ProductCard";
import { Button } from "@/components/ui/button";
import { Award, Clock, Headphones, Shield, Truck, Zap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Get your tech gadgets delivered within 2-3 business days"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is always safe and secure"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over ₹500"
  },
]

const categories = [
  {
    id: 1,
    name: 'Tablets & iPads',
    image: 'https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzYyODI0MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 24,
  },
  {
    id: 2,
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1629102981237-c44ffad32775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMG1pbmltYWx8ZW58MXx8fHwxNzYyOTMwOTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 32,
  },
  {
    id: 3,
    name: 'Home Office',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwb2ZmaWNlJTIwdGVjaHxlbnwxfHx8fDE3NjI5MzA5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 45,
  },
  {
    id: 4,
    name: 'Drones & Cameras',
    image: 'https://images.unsplash.com/photo-1633169420455-97eb1405fc51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyOTE0MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 18,
  },
];

const stats = [
  { label: 'Happy Customers', value: '50K+' },
  { label: 'Products Sold', value: '100K+' },
  { label: 'Countries', value: '30+' },
  { label: 'Avg Rating', value: '4.9' },
];

const benefits = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only authentic products from trusted brands',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is always here to help you',
  },
  {
    icon: Clock,
    title: '30-Day Returns',
    description: 'Easy returns within 30 days of purchase',
  },
];


export default function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const res = await fetch('/api/product/getall');
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    }
    getProducts();
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="p-5 py-20 flex gap-10 items-center justify-center border-b border-gray-100">
          <motion.div className="" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block mb-5 text-sm bg-gray-50 text-gray-600 rounded-full p-2 tracking-wide">
              ✨ New Collection Available
            </div>
            <h1 className="text-5xl md:text-7xl tracking-tight leading-[1.1]">Tech gadgets for the modern lifestyle</h1>
            <p className="text-lg leading-relaxed text-gray-500 my-7  ">Discover our curated collection of premium tech products designed to enhance your everyday life.</p>
            <div className="flex flex-wrap gap-5">
              <Link href={'/products'}><Button variant={'default'} className="p-5">Shop Now</Button></Link>
              <Link href={'/'}><Button variant={'outline'} className="p-5">View Collection</Button></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .3 }} className="hidden md:block">
            <div className="rounded-4xl shadow-2xl aspect-square overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1625645262499-c2a1e2eb09a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3NwYWNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjI4Mzk2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                width={3000}
                height={3000}
                className="w-full h-full object-cover"
                alt="Tech Workspace"
              />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 absolute bg-gray-900 rounded-4xl -bottom-30 right-0">
            </motion.div>
          </motion.div>
        </div>
        {/* Features section */}
        <div className="border-b border-gray-50 grid  md:grid-cols-3 items-center justify-between gap-20 py-24 px-6 bg-linear-to-b from-white to-gray-50">
          {
            features.map((feature, index) => {
              return <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} key={index} className="flex  gap-5">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }} className="w-14 h-14 bg-gray-900 flex items-center justify-center rounded-2xl">
                  <feature.icon className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-gray-900 tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            })
          }
        </div>
        {/* Featured Products section */}
        <div className=" bg-white py-24 px-6">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-gray-900 tracking-tight mb-2 text-4xl md:text-5xl">Featured Products</h2>
              <p className="text-gray-500 mb-20">Explore our latest and most popular tech gadgets</p>
            </motion.div>
            <div className="mt-5 grid md:grid-cols-3 sm:grid-cols-2  items-center justify-center gap-10 flex-wrap ">
              {
                products.slice(0, 6).map(({ id, name, price, category, image }, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <ProductCard key={id} name={name} price={price} category={category} image={image} />
                  </motion.div>
                ))
              }
            </div>
          </div>
        </div>

        {/* Category section */}

        <div className="bg-linear-to-b from-gray-50 to-white py-20 px-5">
          <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-gray-900 tracking-tight mb-2 text-4xl md:text-5xl">Shop by Category</h2>
            <p className="text-gray-500 mb-20">{"Find exactly what you're looking for"}</p>
          </motion.div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
            {
              categories.map(({ id, name, image, productCount }, index) => (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} key={index}>
                  <CategoryCard name={name} image={image} productCount={productCount} />
                </motion.div>
              ))
            }
          </div>
        </div>
        <div className="py-24 px-6 bg-white border-y border-gray-100 ">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 justify-around">
            {
              stats.map(({ label, value }, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center my-10">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring" }}>
                    <p className="text-gray-900 text-4xl md:text-6xl mb-3">{value}</p>
                  </motion.div>
                  <p className="text-gray-400 text-sm tracking-wider">{label}</p>
                </motion.div>
              ))
            }
          </div>
        </div>
        <div className="bg-linear-to-b from-gray-50 to-white py-20 px-5">
          <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-gray-900 tracking-tight mb-2 text-4xl md:text-5xl">Why Choose TechStore</h2>
            <p className="text-gray-500 mb-20">{"We're committed to providing the best shopping experience"}</p>
          </motion.div>
          <div className="grid lg:grid-cols-3  gap-6">
            {
              benefits.map((benefit, index) => (
                <motion.div className="flex gap-3 flex-col items-center justify-center" key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} >
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-3xl bg-gray-900 w-20 h-20 flex items-center justify-center">
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                      <benefit.icon className="text-white w-9 h-9" />
                    </motion.div>
                  </motion.div>
                  <p className="text-gray-900 tracking-tight">{benefit.title}</p>
                  <p className="text-gray-400 text-sm tracking-wide">{benefit.description}</p>
                </motion.div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}
