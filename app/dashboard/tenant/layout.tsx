import Sidebar from '@/components/layout/Sidebar'

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="tenant" />
      <main className="flex-1 ml-20 lg:ml-[280px] transition-all duration-300">
        {children}
      </main>
    </div>
  )
}