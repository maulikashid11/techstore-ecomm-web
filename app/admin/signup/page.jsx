'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';
import { Shield, Mail, Lock, User, Loader2, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function AdminSignup() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminAccessKey, setAdminAccessKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast.error("passwords does not match");
            return
        }

        const res = await fetch('/api/admin/signup', {
            method: "POST",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify({ fullname, email, password, adminAccessKey })
        })
        const data = await res.json();

        setIsLoading(false);
        if (data.success) {
            toast.success(data.message);
            router.push('/admin/login')
        } else {
            toast.error(data.message)
        }

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-12">
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
                    <h1 className="text-3xl text-white tracking-tight mb-2">Create Admin Account</h1>
                    <p className="text-gray-400">Request access to the admin dashboard</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <form className="space-y-5">
                        <div>
                            <Label htmlFor="name" className="text-white">Full Name</Label>
                            <div className="relative mt-2">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                    className="pl-10 rounded-xl border-white/20 bg-white/5 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <div className="relative mt-2">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 rounded-xl border-white/20 bg-white/5 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="adminKey" className="text-white">Admin Access Key</Label>
                            <div className="relative mt-2">
                                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="adminKey"
                                    type="text"
                                    placeholder="Enter admin key"
                                    value={adminAccessKey}
                                    onChange={(e) => setAdminAccessKey(e.target.value)}
                                    required
                                    className="pl-10 rounded-xl border-white/20 bg-white/5 text-white placeholder:text-gray-500"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                Contact system administrator for access key
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-white">Password</Label>
                            <div className="relative mt-2">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="pl-10 rounded-xl border-white/20 bg-white/5 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                            <div className="relative mt-2">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={8}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-5 w-5 mr-2" />
                                    Create Admin Account
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Warning */}
                    <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <p className="text-xs text-yellow-200">
                            ⚠️ Admin accounts have full access to the system. Only create accounts for trusted personnel.
                        </p>
                    </div>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-gray-400">
                    Already have an admin account?{' '}
                    <button
                        onClick={() => router.push('/admin/login')}
                        className="text-white hover:underline"
                    >
                        Sign in
                    </button>
                </p>

                {/* Back to Home */}
                <div className="text-center mt-4 space-y-3">

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
