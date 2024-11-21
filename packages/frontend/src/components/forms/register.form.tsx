'use client'

import React from 'react'

import FormBuilder from '@/components/common/form-builder'
import { LoginSchema } from '@/lib/schema'

const RegisterForm = () => {
  return (
    <div className='space-y-4'>
      <FormBuilder
        className="mt-8"
        Schema={LoginSchema}
        onSubmit={(values) => console.log(values)}
        fields={[
          {
            name: 'email',
            type: 'text',
            label: 'Email',
            meta: { inputType: 'text' },
            layout: {
              columns: {
                desktop: 12,
                tablet: 12,
                mobile: 12
              }
            }
          },
          {
            name: 'password',
            type: 'text',
            label: 'Password',
            meta: { inputType: 'password' },
            layout: {
              columns: {
                desktop: 6,
                tablet: 6,
                mobile: 12
              }
            }
          },
          {
            name: 'password-comfilm',
            type: 'text',
            label: 'Password Confirmation',
            meta: { inputType: 'password' },
            layout: {
              columns: {
                desktop: 6,
                tablet: 6,
                mobile: 12
              }
            }
          },
          {
            name: 'agree-police',
            type: 'check-box',
            label:
              'I want to receive emails about events, product updates and company announcements.',
            meta: { inputType: 'password' },
            layout: {
              columns: {
                desktop: 12,
                tablet: 12,
                mobile: 12
              }
            }
          }
        ]}
      />
      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our
          <a href="#" className="text-gray-700 underline">
            {' '}
            terms and conditions{' '}
          </a>
          and
          <a href="#" className="text-gray-700 underline">
            privacy policy
          </a>
          .
        </p>
      </div>
      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
          Create an account
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Already have an account?
          <a href="#" className="text-gray-700 underline">
            Log in
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
