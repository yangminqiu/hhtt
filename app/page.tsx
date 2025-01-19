import ContractUploader from '@/components/ContractUploader'
import StanceSelector from '@/components/StanceSelector'
import AnalyzeButton from '@/components/AnalyzeButton'
import AnalysisResult from '@/components/AnalysisResult'
import Header from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 pt-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="inline-block">智能合同审查助手</span>
            </h1>
            <p className="text-lg text-gray-600">
              上传合同，选择立场，获取专业的法律建议
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8 mb-16">
            <ContractUploader />
            <StanceSelector />
            <AnalyzeButton />
            <AnalysisResult />
          </div>
        </div>
      </main>
      
      <div className="w-full bg-white py-4 border-t mt-auto">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-700"
          >
            鲁ICP备2024126706号-2
          </a>
          <span className="mx-2">|</span>
          <span>商务合作：13761425347（同微信）</span>
          <span className="mx-2">|</span>
          <Link href="/legal" className="hover:text-gray-700">服务条款和隐私政策</Link>
        </div>
      </div>
    </div>
  )
} 