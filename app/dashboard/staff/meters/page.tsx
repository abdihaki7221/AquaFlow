'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import DataTable from '@/components/ui/DataTable'
import {
  Gauge,
  CheckCircle,
  Clock,
  AlertTriangle,
  Save,
  X,
  Camera
} from 'lucide-react'

export default function MeterReadingsPage() {
  const [selectedMeter, setSelectedMeter] = useState<any>(null)
  const [newReading, setNewReading] = useState('')

  const user = {
    name: 'Staff Member',
    email: 'staff@aquaflow.com',
    role: 'Staff Admin'
  }

  const meters = [
    { id: 'M-1001', tenant: 'John Smith', unit: '4A', lastReading: 12500, currentReading: null, lastUpdated: '2024-01-10', status: 'Pending' },
    { id: 'M-1024', tenant: 'Sarah Johnson', unit: '7B', lastReading: 9850, currentReading: 10235, lastUpdated: '2024-01-15', status: 'Completed' },
    { id: 'M-1056', tenant: 'Michael Brown', unit: '2C', lastReading: 15600, currentReading: null, lastUpdated: '2024-01-08', status: 'Overdue' },
    { id: 'M-1089', tenant: 'Emily Davis', unit: '9A', lastReading: 8720, currentReading: 9150, lastUpdated: '2024-01-15', status: 'Completed' },
    { id: 'M-1102', tenant: 'David Wilson', unit: '5D', lastReading: 14200, currentReading: null, lastUpdated: '2024-01-12', status: 'Pending' },
    { id: 'M-1033', tenant: 'Alice Cooper', unit: '3B', lastReading: 11300, currentReading: null, lastUpdated: '2024-01-09', status: 'Pending' },
    { id: 'M-1067', tenant: 'Bob Martin', unit: '6C', lastReading: 7650, currentReading: null, lastUpdated: '2024-01-07', status: 'Overdue' },
    { id: 'M-1082', tenant: 'Carol White', unit: '8A', lastReading: 13400, currentReading: 13850, lastUpdated: '2024-01-15', status: 'Completed' },
  ]

  const columns = [
    { key: 'id', label: 'Meter No.' },
    { key: 'tenant', label: 'Tenant' },
    { key: 'unit', label: 'Unit' },
    { 
      key: 'lastReading', 
      label: 'Last Reading',
      render: (value: number) => `${value.toLocaleString()} L`
    },
    { 
      key: 'currentReading', 
      label: 'Current Reading',
      render: (value: number | null) => value ? `${value.toLocaleString()} L` : '—'
    },
    { key: 'lastUpdated', label: 'Last Updated' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
          value === 'Overdue' ? 'bg-rose-500/20 text-rose-400' :
          'bg-amber-500/20 text-amber-400'
        }`}>
          {value === 'Completed' && <CheckCircle className="w-3 h-3" />}
          {value === 'Overdue' && <AlertTriangle className="w-3 h-3" />}
          {value === 'Pending' && <Clock className="w-3 h-3" />}
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedMeter(row)}
          disabled={row.status === 'Completed'}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            row.status === 'Completed' 
              ? 'bg-white/5 text-white/30 cursor-not-allowed' 
              : 'bg-water-500/20 text-water-400 hover:bg-water-500/30'
          }`}
        >
          {row.status === 'Completed' ? 'Recorded' : 'Record'}
        </motion.button>
      )
    },
  ]

  const stats = {
    total: meters.length,
    completed: meters.filter(m => m.status === 'Completed').length,
    pending: meters.filter(m => m.status === 'Pending').length,
    overdue: meters.filter(m => m.status === 'Overdue').length,
  }

  const handleSaveReading = () => {
    setSelectedMeter(null)
    setNewReading('')
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Meter Readings" 
        subtitle="Record and manage water meter readings"
        user={user}
      />
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-white/60">Total Meters</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
                <p className="text-xs text-white/60">Completed</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
                <p className="text-xs text-white/60">Pending</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-400">{stats.overdue}</p>
                <p className="text-xs text-white/60">Overdue</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Meters Table */}
        <DataTable title="All Meters" columns={columns} data={meters} />
      </div>

      {/* Record Reading Modal */}
      <AnimatePresence>
        {selectedMeter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMeter(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-white">Record Meter Reading</h2>
                <button onClick={() => setSelectedMeter(null)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Meter No.</p>
                      <p className="text-white font-medium">{selectedMeter.id}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Unit</p>
                      <p className="text-white font-medium">{selectedMeter.unit}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Tenant</p>
                      <p className="text-white font-medium">{selectedMeter.tenant}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Last Reading</p>
                      <p className="text-white font-medium">{selectedMeter.lastReading.toLocaleString()} L</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Current Reading (Liters)</label>
                  <div className="relative">
                    <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="number"
                      value={newReading}
                      onChange={(e) => setNewReading(e.target.value)}
                      placeholder={`Min: ${selectedMeter.lastReading}`}
                      min={selectedMeter.lastReading}
                      className="glass-input w-full pl-12"
                    />
                  </div>
                  {newReading && parseInt(newReading) > selectedMeter.lastReading && (
                    <p className="text-xs text-emerald-400 mt-2">
                      Usage: {(parseInt(newReading) - selectedMeter.lastReading).toLocaleString()} L
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Photo Evidence (Optional)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-sm text-white/60">Click to upload or take photo</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMeter(null)}
                  className="flex-1 glass-button"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveReading}
                  disabled={!newReading || parseInt(newReading) <= selectedMeter.lastReading}
                  className="flex-1 glass-button-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Reading
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}