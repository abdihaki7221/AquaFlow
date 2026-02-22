import Sidebar from '@/components/layout/Sidebar'

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="staff" />
      <main className="flex-1 ml-20 lg:ml-[280px] transition-all duration-300">
        {children}
      </main>
    </div>
  )
}