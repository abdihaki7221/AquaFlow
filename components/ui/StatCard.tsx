'use client'

import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'water' | 'emerald' | 'purple' | 'amber' | 'rose'
  delay?: number
}

const colorVariants = {
  water: {
    gradient: 'from-water-400 to-water-600',
    bg: 'bg-water-500/10',
    text: 'text-water-400',
    glow: 'shadow-[0_0_30px_rgba(0,169,255,0.2)]'
  },
  emerald: {
    gradient: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]'
  },
  purple: {
    gradient: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(192,132,252,0.2)]'
  },
  amber: {
    gradient: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.2)]'
  },
  rose: {
    gradient: 'from-rose-400 to-rose-600',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    glow: 'shadow-[0_0_30px_rgba(251,113,133,0.2)]'
  },
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'water', delay = 0 }: StatCardProps) {
  const colors = colorVariants[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`glass-card p-6 relative overflow-hidden group ${colors.glow}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>

      <div className="relative">
        <p className="text-sm text-white/60 mb-1">{title}</p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-display font-bold text-white">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {subtitle && <p className="text-xs text-white/40 mt-2">{subtitle}</p>}
      </div>

      <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-10 blur-2xl`} />
    </motion.div>
  )
}