import './globals.css'
import StoreProvider from '@/providers/StoreProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: '智能合同审查助手',
  description: '上传合同，选择立场，获取专业的法律建议',
} 