'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface ILoginButton {
  children: React.ReactNode
  mode?: 'model' | 'redirect'
  asChild?: boolean
}

const LoginButton: React.FC<ILoginButton> = ({
  children,
  mode = 'redirect',
  asChild = false
}) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push('/auth/login')
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

export default LoginButton
