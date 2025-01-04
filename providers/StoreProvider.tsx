'use client'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {children}
    </div>
  )
} 