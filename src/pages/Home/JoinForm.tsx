import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from 'common/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'common/ui/form'
import { Input } from 'common/ui/input'

const formSchema = z.object({
  id: z.string().min(1, 'Required'),
})

type FormValues = z.infer<typeof formSchema>

export default function JoinForm() {
  const navigate = useNavigate()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
    },
  })

  const handleSubmit = (values: FormValues) => {
    navigate(`/online/${values.id}`)
  }

  return (
    <Form {...form}>
      <form
        className="flex gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Enter room ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join</Button>
      </form>
    </Form>
  )
}
