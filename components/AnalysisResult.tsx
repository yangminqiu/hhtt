'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContractStore } from '@/lib/store'
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline'

type Tab = 'analysis' | 'optimized'

export default function AnalysisResult() {
  const { result } = useContractStore()
  const [activeTab, setActiveTab] = useState<Tab>('analysis')
  const [copiedAnalysis, setCopiedAnalysis] = useState(false)
  const [copiedOptimized, setCopiedOptimized] = useState(false)

  if (!result) return null

  const handleCopy = async (content: string, type: 'analysis' | 'optimized') => {
    try {
      await navigator.clipboard.writeText(content)
      if (type === 'analysis') {
        setCopiedAnalysis(true)
        setTimeout(() => setCopiedAnalysis(false), 2000)
      } else {
        setCopiedOptimized(true)
        setTimeout(() => setCopiedOptimized(false), 2000)
      }
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  // 合并分析内容
  const getAnalysisContent = () => {
    let content = `合同分析：\n${result.analysis}\n\n`
    if (result.suggestions.length > 0) {
      content += `优化建议：\n${result.suggestions.join('\n')}`
    }
    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className="text-xl font-medium mb-4">分析结果</h3>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'analysis'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            合同分析
          </button>
          <button
            onClick={() => setActiveTab('optimized')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'optimized'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            优化后的合同
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'analysis' ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">合同分析</h4>
                  <button
                    onClick={() => handleCopy(getAnalysisContent(), 'analysis')}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    {copiedAnalysis ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        已复制
                      </>
                    ) : (
                      <>
                        <DocumentDuplicateIcon className="w-4 h-4" />
                        一键复制
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{result.analysis}</p>
              </div>

              {result.suggestions.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-2">优化建议</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-gray-700">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">优化后的合同</h4>
                <button
                  onClick={() => handleCopy(result.optimizedContent || '', 'optimized')}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {copiedOptimized ? (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <DocumentDuplicateIcon className="w-4 h-4" />
                      一键复制
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-gray-700 whitespace-pre-wrap font-sans">
                  {result.optimizedContent}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 