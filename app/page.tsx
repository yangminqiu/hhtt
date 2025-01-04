import ContractUploader from '@/components/ContractUploader'
import StanceSelector from '@/components/StanceSelector'
import AnalyzeButton from '@/components/AnalyzeButton'
import AnalysisResult from '@/components/AnalysisResult'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 pt-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 relative">
            <span className="inline-block">智能合同审查助手</span>
          </h1>
          <p className="text-lg text-gray-600">
            上传合同，选择立场，获取专业的法律建议
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          <ContractUploader />
          <StanceSelector />
          <AnalyzeButton />
          <AnalysisResult />
        </div>
      </div>
    </main>
  )
} 