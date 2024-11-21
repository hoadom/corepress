'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface IButton {
  children: React.ReactNode
  mode?: 'model' | 'redirect'
  asChild?: boolean
}

const RegisterButton: React.FC<IButton> = ({
  children,
  mode = 'redirect',
  asChild = false
}) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push('/auth/register')
  }
  if (mode === 'model') {
    return <div>//TODO: This is model</div>
  }
  return (
    <span onClick={handleOnClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default RegisterButton
