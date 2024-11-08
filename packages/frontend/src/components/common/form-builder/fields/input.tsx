import React, { HTMLInputTypeAttribute } from 'react'
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'

interface IInputField {
  form: UseFormReturn<any>
  name: string
  type: HTMLInputTypeAttribute
  placeholder?: string
}

const InputField = ({
  form,
  type = 'text',
  name,
  placeholder
}: IInputField) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputField
