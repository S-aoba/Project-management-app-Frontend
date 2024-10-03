import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { ValidationErrorType } from '@/types/type'

export const ActionError = (error: ValidationErrorType) => {
  return (
    <Alert variant='destructive' className='mb-4'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.name && error.name.map((m) => <li key={m}>{m}</li>)}</AlertDescription>
      <AlertDescription>{error.description && error.description.map((m) => <li key={m}>{m}</li>)}</AlertDescription>
      <AlertDescription>{error.status && error.status.map((m) => <li key={m}>{m}</li>)}</AlertDescription>
      <AlertDescription>{error.dueDate && error.dueDate.map((m) => <li key={m}>{m}</li>)}</AlertDescription>
      <AlertDescription>{error.priority && error.priority.map((m) => <li key={m}>{m}</li>)}</AlertDescription>
    </Alert>
  )
}
