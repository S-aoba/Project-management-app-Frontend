'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { InputError } from '@/components/input-error'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useAuth } from '../api/use-auth'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login, isLoginPending } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    login(
      {
        email,
        password,
      },
      {
        onError(error: Error) {
          setError(error.message)
        },
      },
    )
  }

  return (
    <>
      <Card className='w-full h-full p-8'>
        {error && <InputError message={error} />}
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Login</CardTitle>
          <CardDescription>Use your email.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5 px-0 pb-0'>
          <form className='space-y-2.5' onSubmit={handleSubmit}>
            <Input
              autoFocus
              disabled={isLoginPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              type='email'
              required
            />
            <Input
              disabled={isLoginPending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              required
            />
            <Button type='submit' className='w-full' size='lg' disabled={isLoginPending}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className='p-4 text-end'>
        <p className='text-sm text-foreground'>
          Don’t have an account? {''}
          <Link href={'#'} className='text-blue-500 hover:underline hover:underline-offset-2'>
            Create an account
          </Link>
        </p>
      </div>
    </>
  )
}
