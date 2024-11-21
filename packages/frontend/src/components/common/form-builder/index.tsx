'use client'

import React from 'react'
import classname from 'clsx'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { FIELDS, NotSupportField } from './fields'

export interface IField {
  name: string
  type: 'text' | 'check-box'
  label: string
  meta?: {
    inputType?: React.HTMLInputTypeAttribute
    placeholder?: string
  }
  layout?: IFieldLauout
}

export interface IFieldLauout {
  columns?: {
    desktop?: number
    tablet?: number
    mobile?: number
  }
}

export interface IFormBuilder {
  className?: string
  fields: IField[]
  defaultValues?: Record<string, any>
  Schema: z.AnyZodObject
  onSubmit: (values: any) => void
}

const FormBuilder = ({
  className,
  fields,
  defaultValues,
  Schema,
  onSubmit
}: IFormBuilder) => {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues
  })

  const fieldLayout = (layout?: IFieldLauout) => {
    let className = 'col-span-12'
    if (!layout) return className
    const { columns } = layout
    if (columns?.desktop)
      className = `${className} xl:col-span-${columns.desktop} lg:col-span-${columns.desktop}`
    if (columns?.tablet)
      className = `${className} md:col-span-${columns.tablet}`
    if (columns?.mobile)
      className = `${className} sm:col-span-${columns.mobile}`
    return className
  }

  return (
    <Form {...form}>
      <form
        className={classname(className, 'w-full')}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full grid grid-cols-12 gap-4">
          {fields.map((x, index) => {
            const FieldComponent: any =
              (FIELDS as any)?.[x.type] ?? NotSupportField
            return (
              <FieldComponent
                className={fieldLayout(x.layout)}
                key={index}
                control={form.control}
                name={x.name}
                meta={x.meta}
                label={x.label}
              />
            )
          })}
        </div>
      </form>
    </Form>
  )
}

export default FormBuilder
