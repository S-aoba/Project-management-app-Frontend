import { NextRequest } from 'next/server'

const fetchCurrentUser = async (req: NextRequest): Promise<Error | void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: req.headers.get('cookie') ?? '',
      referer: req.headers.get('referer') ?? '',
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message)
  }
}

export const isAuthenticated = async (req: NextRequest) => {
  try {
    await fetchCurrentUser(req)
    return true
  } catch (error) {
    return false
  }
}
