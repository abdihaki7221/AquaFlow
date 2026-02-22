'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import StatCard from '@/components/ui/StatCard'
import UsageChart from '@/components/charts/UsageChart'
import {
  Droplets,
  CreditCard,
  Calendar,
  Bell,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  ArrowRight,
  Receipt,
  Sparkles,
  AlertTriangle
} from 'lucide-react'

export default function TenantDashboard() {
  const [showPayModal, setShowPayModal] = useState(false)

  const user = {
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Tenant'
  }

  const currentBill = {
    amount: 125.00,
    dueDate: 'Jan 25, 2024',
    daysLeft: 10,
    unitsUsed: 1250,
    unitsRemaining: 750,
    status: 'pending'
  }

  const stats = [
    { title: 'Current Bill', value: `$${currentBill.amount}`, icon: CreditCard, color: 'water' as const, subtitle: `Due ${currentBill.dueDate}` },
    { title: 'Water Used', value: `${currentBill.unitsUsed} L`, icon: Droplets, trend: { value: 8, isPositive: false }, color: 'emerald' as const, subtitle: 'This billing cycle' },
    { title: 'Units Remaining', value: `${currentBill.unitsRemaining} L`, icon: TrendingDown, color: 'amber' as const, subtitle: 'Before next charge' },
    { title: 'Days Until Due', value: currentBill.daysLeft, icon: Calendar, color: currentBill.daysLeft <= 5 ? 'rose' as const : 'purple' as const, subtitle: currentBill.daysLeft <= 5 ? 'Pay soon!' : 'On track' },
  ]

  const usageData = [
    { name: 'Week 1', value: 280 },
    { name: 'Week 2', value: 350 },
    { name: 'Week 3', value: 320 },
    { name: 'Week 4', value: 300 },
  ]

  const monthlyUsage = [
    { name: 'Aug', value: 1100 },
    { name: 'Sep', value: 1250 },
    { name: 'Oct', value: 980 },
    { name: 'Nov', value: 1150 },
    { name: 'Dec', value: 1350 },
    { name: 'Jan', value: 1250 },
  ]

  const transactions = [
    { id: 'TXN001', date: 'Jan 15, 2024', amount: '$98.50', method: 'Card •••• 4242', status: 'Completed' },
    { id: 'TXN002', date: 'Dec 15, 2023', amount: '$115.00', method: 'Card •••• 4242', status: 'Completed' },
    { id: 'TXN003', date: 'Nov 15, 2023', amount: '$92.25', method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN004', date: 'Oct 15, 2023', amount: '$108.00', method: 'Card •••• 4242', status: 'Completed' },
  ]

  const notifications = [
    { id: 1, type: 'warning', title: 'Bill Due Soon', message: 'Your bill of $125.00 is due in 10 days', time: '2h ago', unread: true },
    { id: 2, type: 'info', title: 'Meter Reading Updated', message: 'Your meter was read on Jan 10, 2024', time: '5 days ago', unread: false },
    { id: 3, type: 'success', title: 'Payment Received', message: 'Thank you for your payment of $98.50', time: 'Jan 15', unread: false },
  ]

  return (
    <div className="min-h-screen">
      <Header title="My Dashboard" subtitle="Welcome back, John! Here's your water usage overview." user={user} />
      
      <div className="p-6 space-y-6">
        {/* Payment Alert */}
        {currentBill.daysLeft <= 10 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${currentBill.daysLeft <= 5 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-amber-500/10 border-amber-500/20'} flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className={`w-5 h-5 ${currentBill.daysLeft <= 5 ? 'text-rose-400' : 'text-amber-400'}`} />
              <div>
                <p className="font-medium text-white">{currentBill.daysLeft <= 5 ? 'Payment Due Soon!' : 'Upcoming Payment'}</p>
                <p className="text-sm text-white/60">Your bill of ${currentBill.amount} is due on {currentBill.dueDate}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPayModal(true)}
              className="glass-button-primary flex items-center gap-2"
            >
              Pay Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Usage Gauge & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Gauge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage This Cycle</h3>
            
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="85" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                <motion.circle
                  cx="96" cy="96" r="85"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 534' }}
                  animate={{ strokeDasharray: `${(currentBill.unitsUsed / 2000) * 534} 534` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00a9ff" />
                    <stop offset="100%" stopColor="#4dc8ff" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span className="text-4xl font-display font-bold gradient-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {Math.round((currentBill.unitsUsed / 2000) * 100)}%
                </motion.span>
                <span className="text-sm text-white/60">of allowance</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Used</span>
                <span className="text-white font-medium">{currentBill.unitsUsed} L</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Remaining</span>
                <span className="text-emerald-400 font-medium">{currentBill.unitsRemaining} L</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Total Allowance</span>
                <span className="text-white font-medium">2,000 L</span>
              </div>
            </div>
          </motion.div>

          {/* Weekly Usage */}
          <div className="lg:col-span-2">
            <UsageChart title="Weekly Usage" subtitle="This billing cycle" data={usageData} type="bar" height={280} />
          </div>
        </div>

        {/* Monthly Trend & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsageChart title="Monthly Trend" subtitle="Last 6 months" data={monthlyUsage} type="line" height={250} />

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <Receipt className="w-5 h-5 text-white/40" />
            </div>
            
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{tx.amount}</p>
                      <p className="text-xs text-white/60">{tx.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/40">{tx.date}</p>
                    <span className="text-xs text-emerald-400">{tx.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/70 transition-colors"
            >
              View All Transactions
            </motion.button>
          </motion.div>
        </div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Notifications</h3>
            <Bell className="w-5 h-5 text-white/40" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  notification.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20' :
                  notification.type === 'info' ? 'bg-water-500/10 border-water-500/20' :
                  'bg-emerald-500/10 border-emerald-500/20'
                } ${notification.unread ? 'ring-1 ring-white/10' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'warning' ? 'bg-amber-500/20' :
                    notification.type === 'info' ? 'bg-water-500/20' :
                    'bg-emerald-500/20'
                  }`}>
                    {notification.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                    {notification.type === 'info' && <Bell className="w-4 h-4 text-water-400" />}
                    {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{notification.title}</p>
                    <p className="text-xs text-white/60 mt-1">{notification.message}</p>
                    <p className="text-xs text-white/40 mt-2">{notification.time}</p>
                  </div>
                  {notification.unread && <span className="w-2 h-2 rounded-full bg-water-400 flex-shrink-0" />}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPayModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-water-400 to-water-600 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white">Pay Your Bill</h2>
                <p className="text-white/60 mt-2">Amount due: <span className="text-white font-semibold">${currentBill.amount}</span></p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Card Number</label>
                  <input type="text" className="glass-input w-full" placeholder="4242 4242 4242 4242" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Expiry</label>
                    <input type="text" className="glass-input w-full" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">CVC</label>
                    <input type="text" className="glass-input w-full" placeholder="123" />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPayModal(false)}
                    className="flex-1 glass-button"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 glass-button-primary flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Pay ${currentBill.amount}
                  </motion.button>
                </div>
              </form>
              
              <p className="text-center text-xs text-white/40 mt-4">
                Your payment is secured with 256-bit encryption
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}