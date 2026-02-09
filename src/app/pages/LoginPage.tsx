import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Shield, Users, Layers, Lock, ArrowRight } from 'lucide-react';
import accLogo from 'figma:asset/93b0f57f0c6cb722d5511f7e11c5f2d8141cb070.png';
import { dispatchAuthChange } from '../routes.tsx';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Generation',
    description: 'Generate professional ID cards in seconds with our optimized processing',
    badge: '1000+ Cards/Min',
    stats: [
      { value: '50K+', label: 'ACTIVE USERS' },
      { value: '10M+', label: 'CARDS GENERATED' },
      { value: '150+', label: 'COUNTRIES' },
    ]
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption with Microsoft 365 single sign-on integration',
    badge: 'SOC 2 Certified',
    stats: [
      { value: '99.9%', label: 'UPTIME' },
      { value: '256-bit', label: 'ENCRYPTION' },
      { value: '24/7', label: 'MONITORING' },
    ]
  },
  {
    icon: Users,
    title: 'Bulk Processing Power',
    description: 'Process hundreds of employees simultaneously with intelligent batch processing',
    badge: 'Unlimited Scale',
    stats: [
      { value: '1000+', label: 'PER BATCH' },
      { value: '<3 sec', label: 'AVG TIME' },
      { value: '100%', label: 'ACCURACY' },
    ]
  },
  {
    icon: Layers,
    title: 'Smart Automation',
    description: 'AI-powered background removal and intelligent image optimization',
    badge: 'AI Powered',
    stats: [
      { value: '85%', label: 'TIME SAVED' },
      { value: 'Auto', label: 'BG REMOVAL' },
      { value: 'HD', label: 'OUTPUT' },
    ]
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user && user !== 'null') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    // Mock Microsoft 365 authentication
    const userData = {
      name: 'HR Executive',
      email: 'hr@acc.ltd',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    dispatchAuthChange(true);
    
    // Small delay to ensure localStorage is set before navigation
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex relative overflow-hidden">
      {/* Animated background elements matching dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative z-10">
        
        {/* LEFT SIDE - Dark Branding Section */}
        <div className="flex flex-col justify-between p-12 lg:p-16">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-slate-700/50"
              >
                <img src={accLogo} alt="ACC Logo" className="h-12 w-auto object-contain" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Applied Cloud Computing
            </h1>
            <p className="text-slate-400 text-lg">Enterprise ID Card Automation Platform</p>
          </motion.div>

          {/* Feature Carousel */}
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeatureIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Icon with badge */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-slate-700/50 shadow-xl">
                        {(() => {
                          const CurrentIcon = features[currentFeatureIndex].icon;
                          return <CurrentIcon className="w-10 h-10 text-blue-400" strokeWidth={2} />;
                        })()}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30"
                    >
                      <span className="text-sm font-semibold text-blue-300">
                        {features[currentFeatureIndex].badge}
                      </span>
                    </motion.div>
                  </div>

                  {/* Title & Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-3xl font-bold mb-4 text-white">{features[currentFeatureIndex].title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {features[currentFeatureIndex].description}
                    </p>
                  </motion.div>

                  {/* Carousel Dots */}
                  <div className="flex gap-2">
                    {features.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentFeatureIndex(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentFeatureIndex
                            ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'w-1.5 bg-slate-700'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-4"
          >
            {features[currentFeatureIndex].stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/50"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE - Dark Login Section */}
        <div className="bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl flex items-center justify-center p-12 lg:p-16 border-l border-slate-700/50">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Login Card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-slate-700/50">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
                  <p className="text-slate-400">Sign in with your Microsoft 365 account</p>
                </div>

                {/* Microsoft Sign In Button */}
                <motion.button
                  onClick={handleLogin}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mb-6 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 group-hover:blur-lg transition-all" />
                  
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-lg">
                    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                      <rect width="11" height="11" fill="#F25022"/>
                      <rect x="12" width="11" height="11" fill="#7FBA00"/>
                      <rect y="12" width="11" height="11" fill="#00A4EF"/>
                      <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
                    </svg>
                    Sign in with Microsoft 365
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.button>

                {/* Enterprise SSO Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl mb-8 border border-blue-500/30 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-sm text-slate-300 font-medium">Enterprise Single Sign-On</span>
                </motion.div>

                {/* Security Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  {[
                    { icon: Lock, text: 'Secure Authentication' },
                    { icon: Users, text: 'Directory Integration' },
                    { icon: Layers, text: 'Multi-Factor Security' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 backdrop-blur-sm">
                        <item.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-6"
            >
              <p className="text-slate-400 text-sm">
                Need help?{' '}
                <a href="#" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  Contact Support
                </a>
              </p>
              <p className="text-slate-600 text-xs mt-3">
                © 2026 Applied Cloud Computing
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}