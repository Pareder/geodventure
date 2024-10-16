import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { auth } from 'common/services/firebase'
import { Alert, AlertDescription, AlertTitle } from 'common/ui/alert'
import { Button, buttonVariants } from 'common/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'common/ui/form'
import { Input } from 'common/ui/input'
import cx from 'common/utils/classnames'

import formSchema from './formSchema'

type FormValues = z.infer<typeof formSchema>

export default function ForgotPassword() {
  const [isError, setError] = useState(false)
  const { watch, ...form } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = (values: FormValues) => {
    return sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast.success('Reset password email sent')
      })
      .catch(() => setError(true))
  }

  useEffect(() => {
    const subscription = watch(() => setError(false))
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <div className="w-full space-y-6">
      <Link
        to="/auth/login"
        className={cx(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
      >
        Sign In
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
        <p className="text-sm text-muted-foreground">Enter your email below to receive a password reset link</p>
      </div>
      <Form
        watch={watch}
        {...form}
      >
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>A password reset link will be sent to the provided email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  )
}
