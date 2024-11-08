'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { LoginSchema } from '@/lib/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface IFormBuilder {
  fields: any
}

const FormBuilder = ({ fields }: IFormBuilder) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log('values', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john.doe@gmail.com"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  )
}

export default FormBuilder
