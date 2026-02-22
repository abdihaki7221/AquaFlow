import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AquaFlow | Water Billing Administration',
  description: 'Modern water billing and administration service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white antialiased overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Bottom Wave Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
            <div className="water-wave opacity-30" />
            <div className="water-wave opacity-20" style={{ animationDelay: '-2s' }} />
          </div>
        </div>
        
        {children}
      </body>
    </html>
  )
}