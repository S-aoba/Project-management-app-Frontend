import { Navigation } from "@/components/navigation"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-full w-full flex'>
      <Navigation />
      {children}
    </div>
  )
}
