'use client'
import { Inter } from "next/font/google"
import "./globals.css"
import StoreProvider from '@/providers/StoreProvider'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayoutClient({
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
      <html lang="zh-CN">
        <body className={inter.className}>
          <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-32 w-32 bg-purple-200 rounded-full" />
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
} 