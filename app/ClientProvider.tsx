'use client'
import { useEffect, useState } from 'react'
import StoreProvider from '@/providers/StoreProvider'

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-32 w-32 bg-purple-200 rounded-full" />
        </div>
      </div>
    )
  }

  return <StoreProvider>{children}</StoreProvider>
} 