'use client'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-purple-600">
            智能合同审查助手
          </div>
        </div>
      </header>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="container mx-auto px-4 h-12 flex items-center justify-center text-sm text-gray-500 space-x-4">
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-700"
          >
            鲁ICP备2024126706号-2
          </a>
          <span>|</span>
          <span>商务合作：13761425347（同微信）</span>
        </div>
      </footer>
    </>
  )
} 