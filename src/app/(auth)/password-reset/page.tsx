'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PasswordResetPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { mutate, isPending } = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken()

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        if (res.status === 422) {
          throw new Error('User is not exists.')
        }
        throw new Error('An error has occurred. Please try again in a few minutes.')
      }

      return res.json()
    },
    onSuccess() {
      setError('')
      setSubmitted(true)
      setEmail('')
    },
    onError(error: Error) {
      setError(error.message)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email === '') {
      setError('Email is required.')
    }

    mutate()
  }

  return (
    <div className='w-96 h-auto flex flex-col'>
      <Card className='w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle className='text-xl'>Forgot Password</CardTitle>
          <CardDescription />
        </CardHeader>
        {error && (
          <Alert variant='destructive' className='mb-4'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <CardContent>
          {submitted && (
            <p className='text-sm'>
              パスワードリセットリンクを<span>{email}</span>に送信しました。メールを確認してください。
            </p>
          )}
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                value={email}
                disabled={isPending}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
                required
                autoFocus
              />
              {error && <p className='text-sm text-red-500'>{error}</p>}
            </div>
            <Button>Submit</Button>
          </form>
        </CardContent>
      </Card>
      <div className='p-4 text-end'>
        <p className='text-sm text-foreground'>
          Login Page {''}
          <Link href={'/login'} className='text-blue-500 hover:underline hover:underline-offset-2'>
            here
          </Link>
        </p>
      </div>
    </div>
  )
}
