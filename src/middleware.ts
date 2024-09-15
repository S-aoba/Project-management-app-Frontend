import { NextRequest, NextResponse } from 'next/server'

import { isAuthenticated } from './lib/auth'

export default async function middleware(req: NextRequest) {
  const isLogined = await isAuthenticated(req)

  if (!isLogined) return NextResponse.redirect(new URL('/login', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/projects/:path*'],
}
