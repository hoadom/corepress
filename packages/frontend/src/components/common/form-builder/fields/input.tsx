import React, { HTMLInputTypeAttribute } from 'react'
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'

interface IInputField {
  className?: string
  control: Control<any>
  name: string
  label: string
  meta?: {
    type: HTMLInputTypeAttribute
    placeholder?: string
  }
}

const InputField = ({ control, meta, name, label, className }: IInputField) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className='block text-sm font-bold text-gray-700' >{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={meta?.type ?? 'text'}
              placeholder={meta?.placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputField
