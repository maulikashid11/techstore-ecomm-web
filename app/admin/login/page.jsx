"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';
import { Shield, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        const res = await fetch('/api/admin/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json();

        setIsLoading(false);
        if (data.success) {
            toast.success(data.message);
            router.push('/admin')
        } else {
            toast.error(data.message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <motion.div
                        className="inline-flex items-center gap-3 mb-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                    </motion.div>
                    <h1 className="text-3xl text-white tracking-tight mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Sign in to access the admin dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <form className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="text-white">Admin Email</Label>
                            <div className="relative mt-2">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@techstore.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 rounded-xl border-white/20 bg-white/5 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="password" className="text-white">Password</Label>
                                <button
                                    type="button"
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
                                    onClick={() => toast.info('Contact system administrator')}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10 rounded-xl border-white/20 bg-white/5 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={() => handleSubmit()}
                            type="submit"
                            className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-5 w-5 mr-2" />
                                    Sign in as Admin
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-gray-400">
                        Need admin access?{' '}
                        <button
                            onClick={() => router.push('/admin/signup')}
                            className="text-white hover:underline"
                        >
                            Request Admin Account
                        </button>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6 space-y-3">

                    <button
                        onClick={() => router.push('/')}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        ← Back to home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

