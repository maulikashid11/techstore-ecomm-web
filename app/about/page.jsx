"use client"
import { motion } from 'motion/react'
import { Target, Users, Award, Heart } from 'lucide-react';
import Navbar from '@/components/base/Navbar';
import Footer from '@/components/base/Footer';
import Image from 'next/image';

const values = [
    {
        icon: Target,
        title: 'Our Mission',
        description: 'To make premium technology accessible to everyone, enhancing daily life through innovative products.',
    },
    {
        icon: Users,
        title: 'Customer First',
        description: 'We prioritize customer satisfaction above all else, providing exceptional service and support.',
    },
    {
        icon: Award,
        title: 'Quality Promise',
        description: 'Every product is carefully curated and tested to meet our high standards of excellence.',
    },
    {
        icon: Heart,
        title: 'Sustainability',
        description: 'We are committed to reducing our environmental impact through responsible sourcing and packaging.',
    },
];
const page = () => {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
                <div className='bg-linear-to-b from-gray-50 text-center py-24 px-8 to-white border-b border-gray-200'>
                    <h2 className='text-4xl  md:text-6xl text-gray-900 mb-6'>About TechStore</h2>
                    <p className='text-lg tracking-wide text-gray-400'>Your trusted destination for premium tech gadgets since 2020</p>
                </div>
                <div className='bg-white py-18 px-8'>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-gray-900 mb-6 tracking-tight">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    TechStore was founded with a simple belief: technology should enhance life, not complicate it.
                                    We started as a small team of tech enthusiasts who were frustrated by the overwhelming choices
                                    and lack of guidance in the tech marketplace.
                                </p>
                                <p>
                                    Today, {"we've"} grown into a trusted destination for premium tech gadgets, serving over 50,000
                                    satisfied customers worldwide. Our carefully curated selection ensures that every product meets
                                    our high standards for quality, innovation, and value.
                                </p>
                                <p>
                                    We believe in building lasting relationships with our customers, providing not just products,
                                    but expert advice, exceptional service, and ongoing support long after your purchase.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1758876203342-fc14c0bba67c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjMyODcxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Our Team"
                                width={2000} height={2000}
                                className="w-full h-full object-cover aspect-4/3"
                            />
                        </motion.div>
                    </div>
                    <div className="bg-linear-to-b from-gray-50 to-white py-20 px-5">
                        <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-gray-900 tracking-tight mb-2 text-4xl md:text-5xl">Our Values</h2>
                            <p className="text-gray-500 mb-20">The principles that guide everything we do</p>
                        </motion.div>
                        <div className="grid lg:grid-cols-4 gap-6">
                            {
                                values.map((benefit, index) => (
                                    <motion.div className="flex gap-3 flex-col items-center justify-center" key={benefit.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} >
                                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-3xl bg-gray-900 w-15 h-15 flex items-center justify-center">
                                            <motion.div>
                                                <benefit.icon className="text-white w-7 h-7" />
                                            </motion.div>
                                        </motion.div>
                                        <p className="text-gray-900 tracking-tight">{benefit.title}</p>
                                        <p className="text-gray-400 text-sm tracking-wide">{benefit.description}</p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="py-18 px-6 bg-white border-t border-gray-100 ">
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 justify-around">
                            {
                                [
                                    { label: 'Customers', value: '50K+' },
                                    { label: 'Products', value: '500+' },
                                    { label: 'Countries', value: '30+' },
                                    { label: 'Team Members', value: '100+' },
                                ].map(({ label, value }, index) => (
                                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center" key={index}>
                                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring" }}>
                                            <p className="text-gray-900 text-4xl md:text-6xl mb-3">{value}</p>
                                        </motion.div>
                                        <p className="text-gray-400 text-sm tracking-wider">{label}</p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default page