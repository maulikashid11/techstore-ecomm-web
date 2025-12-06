"use client";
import { motion } from "motion/react";

import CategoryCard from "@/components/base/CategoryCard";
import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";

const categories = [
    {
        id: 1,
        name: 'Audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYyODQ0OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 45,
    },
    {
        id: 2,
        name: 'Wearables',
        image: 'https://images.unsplash.com/photo-1615834569398-4cc6036929f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwbW9kZXJufGVufDF8fHx8MTc2MjkyNzMzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 32,
    },
    {
        id: 3,
        name: 'Computers',
        image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjI4MTEzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 28,
    },
    {
        id: 4,
        name: 'Mobile',
        image: 'https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2Mjg0MzQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 38,
    },
    {
        id: 5,
        name: 'Photography',
        image: 'https://images.unsplash.com/photo-1636569826709-8e07f6104992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mjg5ODY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 22,
    },
    {
        id: 6,
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1694405156884-dea1ffb40ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGtleWJvYXJkfGVufDF8fHx8MTc2MzI5MzMzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 56,
    },
    {
        id: 7,
        name: 'Smart Home',
        image: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBkZXZpY2V8ZW58MXx8fHwxNzYzMzU5NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 41,
    },
    {
        id: 8,
        name: 'Gaming',
        image: 'https://images.unsplash.com/photo-1629102981237-c44ffad32775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMG1pbmltYWx8ZW58MXx8fHwxNzYyOTMwOTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        productCount: 35,
    },
];

const Page = () => {

    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                <div className='bg-linear-to-b from-gray-50 text-center py-24 px-8 to-white border-b border-gray-200'>
                    <h2 className='text-4xl  md:text-6xl text-gray-900 mb-6'>Browse by Category</h2>
                    <p className='text-lg tracking-wide text-gray-400'>Find the perfect tech gadgets for your needs</p>
                </div>
                <div className='py-16 px-5 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5 justify-start'>
                    {
                        categories.map(({ id, name, image, productCount }, index) => {
                            return <motion.div key={id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                <CategoryCard key={id} name={name} productCount={productCount} image={image} />
                            </motion.div>
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page