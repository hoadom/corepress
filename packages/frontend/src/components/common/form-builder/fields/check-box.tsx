import React from 'react'
import classname from 'clsx'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

interface ICheckBoxField {
  className?: string
  control: Control<any>
  name: string
  label: string
  meta?: {}
}

const CheckBox: React.FC<ICheckBoxField> = ({
  control,
  meta,
  name,
  label,
  className
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={classname(className, 'flex items-start gap-2')}>
          <FormControl>
            <Checkbox {...field} className="mt-1" />
          </FormControl>
          <FormLabel
            style={{ margin: 0 }}
            className="block m-0 text-md font-medium text-gray-500 cursor-pointer"
          >
            {label}
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CheckBox
