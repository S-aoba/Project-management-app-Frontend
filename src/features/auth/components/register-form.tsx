'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { InputError } from '@/components/input-error'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAuth } from '../api/use-auth'

export const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { register, isRegisterLoading } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    register(
      {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
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
          <CardTitle className='text-xl'>Register</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent className='px-0 pb-0'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              value={name}
              disabled={isRegisterLoading}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              type='text'
              placeholder='Name'
              required
            />
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              value={email}
              disabled={isRegisterLoading}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              type='email'
              placeholder='Email'
              required
            />
            <div className='flex flex-col'>
              <Label htmlFor='password'>Password</Label>
              <Input
                className='mt-2'
                id='password'
                name='password'
                value={password}
                disabled={isRegisterLoading}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                required
              />
              <div className='mt-2'>
                <Label htmlFor='password'>Confirm Password</Label>
                <Input
                  className='mt-2'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={confirmPassword}
                  disabled={isRegisterLoading}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type='password'
                  placeholder='Confirm Password'
                  required
                />
              </div>
            </div>
            <Button type='submit' className='w-full' size='lg' disabled={isRegisterLoading}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className='p-4 text-end'>
        <p className='text-sm text-foreground'>
          Already you have an account? Login page {''}
          <Link href={'/login'} className='text-blue-500 hover:underline hover:underline-offset-2'>
            here
          </Link>
        </p>
      </div>
    </>
  )
}
