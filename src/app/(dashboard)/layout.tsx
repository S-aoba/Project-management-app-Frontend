import { Navigation } from '@/components/navigation'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-full w-full flex space-x-4 p-8 bg-blue-600/40'>
      <Navigation />
      {children}
    </div>
  )
}
