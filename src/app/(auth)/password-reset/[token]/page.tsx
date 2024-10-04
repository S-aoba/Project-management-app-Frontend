'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCsrfToken } from '@/features/auth/api/use-csrf-token'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function PasswordResetTokenPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const { mutate, isPending } = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async () => {
      await csrfToken()

      const csrf = getCsrfToken()

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/reset-password`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ token, email, password, password_confirmation: confirmPassword }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': csrf!,
        },
      })

      if (!res.ok) {
        if (res.status === 422) {
          const error = await res.json()

          if (error['message'] === 'passwords.user') {
            throw new Error('Email is not invalid.')
          } else if (error['message'] === 'passwords.token') {
            throw new Error('Password is not invalid.')
          } else if (error['message'] === 'validation.confirmed') {
            throw new Error('Password is not invalid.')
          }
        }

        throw new Error('An error has occurred. Please try again in a few minutes.')
      }

      return res.json()
    },
    onSuccess() {
      toast.success('Reset Email successfully')

      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setError('')

      router.push('/login')
    },
    onError(error: Error) {
      setError(error.message)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('The password and confirm password do not match.')
      return
    }

    if (email === '' || password === '' || confirmPassword === '') {
      setError('Looks like you missed something! Please enter your email and password.')
      return
    }

    if (token === '') {
      setError('Password reset failed.')
    }

    mutate()
  }

  return (
    <div className='w-96 h-auto flex flex-col'>
      <Card className='w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle className='text-xl'>Password Reset</CardTitle>
          <CardDescription />
        </CardHeader>
        {error && (
          <Alert variant='destructive' className='mb-4'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <CardContent className='space-y-4'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
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
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              value={password}
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              required
            />
            <Label htmlFor='password'>Confirm Password</Label>
            <Input
              className='mt-2'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              disabled={isPending}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              placeholder='Confirm Password'
              required
            />
            <Button>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
