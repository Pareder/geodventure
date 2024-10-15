import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Alert, AlertDescription, AlertTitle } from 'common/ui/alert'
import { Button, buttonVariants } from 'common/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'common/ui/form'
import { Input, PasswordInput } from 'common/ui/input'
import { auth } from 'common/services/firebase'
import cx from 'common/utils/classnames'
import formSchema from './formSchema'
import createUser from '../utils/createUser'
import GithubSignup from '../components/GithubSignup'
import GoogleSignup from '../components/GoogleSignup'

type FormValues = z.infer<typeof formSchema>

export default function Signup() {
  const [isError, setError] = useState(false)
  const { watch, ...form } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = (values: FormValues) => {
    return createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        updateProfile(user, { displayName: values.nickname })
        createUser(user.uid, values.nickname)
        toast.success('Account created')
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
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials below to create a new account</p>
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
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nickname"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
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
            Sign Up with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <GoogleSignup
        loading={form.formState.isSubmitting}
        className="w-full"
        label="Sign Up with Google"
      />
      <GithubSignup
        loading={form.formState.isSubmitting}
        className="w-full"
        label="Sign Up with Github"
      />
    </div>
  )
}
