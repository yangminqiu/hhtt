'use client'
import { useRef, useLayoutEffect, useState } from 'react'
import { useContractStore } from '@/lib/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isHydrated, setIsHydrated] = useState(false)

  useLayoutEffect(() => {
    useContractStore.persist.rehydrate()
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-32 w-32 bg-purple-200 rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {children}
    </div>
  )
} 