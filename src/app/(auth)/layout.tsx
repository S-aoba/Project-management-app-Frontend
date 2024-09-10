export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='w-full h-full flex items-center justify-center bg-gray-50'>{children}</div>
}
