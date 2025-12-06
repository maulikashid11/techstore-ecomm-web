"use client"
import Footer from '@/components/base/Footer';
import Navbar from '@/components/base/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        content: 'support@techstore.com',
        link: 'mailto:support@techstore.com',
    },
    {
        icon: Phone,
        title: 'Phone',
        content: '+1 (555) 123-4567',
        link: 'tel:+15551234567',
    },
    {
        icon: MapPin,
        title: 'Address',
        content: '123 Tech Street, San Francisco, CA 94102',
        link: null,
    },
    {
        icon: Clock,
        title: 'Hours',
        content: 'Mon - Fri: 9AM - 6PM PST',
        link: null,
    },
];

const page = () => {

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                <section className="bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                        <motion.h1
                            className="text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Get in Touch
                        </motion.h1>
                        <motion.p
                            className="text-gray-500 text-lg max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {"Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
                        </motion.p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl text-gray-900 mb-8 tracking-tight">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="firstName" className="text-gray-900 mb-2 block">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="John"
                                            className="rounded-xl border-gray-200"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName" className="text-gray-900 mb-2 block">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            className="rounded-xl border-gray-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-gray-900 mb-2 block">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="subject" className="text-gray-900 mb-2 block">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        placeholder="How can we help?"
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message" className="text-gray-900 mb-2 block">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        rows={6}
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gray-900 hover:bg-gray-800 rounded-xl"
                                    size="lg"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-3xl text-gray-900 mb-8 tracking-tight">Contact Information</h2>
                            <div className="space-y-8">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.title}
                                        className="flex gap-5"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className="">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                                <info.icon className="h-6 w-6 text-gray-900" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-gray-900 mb-1 tracking-tight">{info.title}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p className="text-gray-500">{info.content}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <motion.div
                                className="mt-12 rounded-2xl overflow-hidden bg-gray-100 h-64"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <MapPin className="h-12 w-12" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-linear-to-b from-gray-50 to-white border-y border-gray-100">
                    <div className="max-w-4xl mx-auto px-6 py-20">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                            <p className="text-gray-500">Quick answers to common questions</p>
                        </motion.div>

                        <div className="space-y-6">
                            {[
                                {
                                    question: 'What are your shipping times?',
                                    answer: 'We typically ship orders within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.',
                                },
                                {
                                    question: 'What is your return policy?',
                                    answer: 'We offer a 30-day return policy on all products. Items must be in original condition with all packaging and accessories.',
                                },
                                {
                                    question: 'Do you offer international shipping?',
                                    answer: 'Yes, we ship to over 30 countries worldwide. Shipping costs and delivery times vary by location.',
                                },
                                {
                                    question: 'How can I track my order?',
                                    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s site.',
                                },
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-gray-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <h3 className="text-gray-900 mb-2 tracking-tight">{faq.question}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>

    )
}

export default page