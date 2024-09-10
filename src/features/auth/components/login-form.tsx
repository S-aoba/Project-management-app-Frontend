'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () =>{}

  return (
    <Card className='w-full h-full p-8'>
      {/* {error && <InputError message={error} />} */}
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login</CardTitle>
        <CardDescription>Use your email.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={handleSubmit}>
          <Input
            autoFocus
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            required
          />
          <Button
            type='submit'
            className='w-full'
            size='lg'
            disabled={false}>
            Login
          </Button>
        </form>
        <div className='pt-2 text-xs text-muted-foreground hover:underline hover:underline-offset-2 flex justify-end'>
          <Link href={'#'}>No account yet ?</Link>
        </div>
      </CardContent>
    </Card>
  )
}