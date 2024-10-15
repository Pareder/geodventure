import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { signInWithEmailAndPassword } from 'firebase/auth'
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
import GithubSignup from '../components/GithubSignup'
import GoogleSignup from '../components/GoogleSignup'

type FormValues = z.infer<typeof formSchema>

export default function Login() {
  const [isError, setError] = useState(false)
  const { watch, ...form } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (values: FormValues) => {
    return signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        toast.success('Logged in')
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
        to="/auth/signup"
        className={cx(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
      >
        Sign Up
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials below</p>
      </div>
      <Form
        watch={watch}
        {...form}
      >
        <form
          className="grid gap-6"
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
          {isError && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Invalid email or password</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Sign In with Email
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
        label="Sign In with Google"
      />
      <GithubSignup
        loading={form.formState.isSubmitting}
        className="w-full"
        label="Sign In with Github"
      />
    </div>
  )
}
