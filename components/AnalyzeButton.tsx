'use client'
import { useState } from 'react'
import { useContractStore } from '@/lib/store'
import { motion } from 'framer-motion'

export default function AnalyzeButton() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { content, stance, setResult } = useContractStore()
  const isDisabled = !content || !stance || isAnalyzing

  const handleAnalyze = async () => {
    if (isDisabled) return

    setIsAnalyzing(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          stance
        }),
        signal: AbortSignal.timeout(300000)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || '分析请求失败')
      }

      const result = await response.json()
      setResult(result)
    } catch (error) {
      console.error('分析错误:', error)
      alert(error instanceof Error ? error.message : '分析失败，请重试')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleAnalyze}
        disabled={isDisabled}
        className={`px-8 py-3 bg-purple-600 text-white rounded-lg transition-all ${
          isDisabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-purple-700 hover:shadow-md'
        }`}
      >
        {isAnalyzing ? '正在分析...' : '开始分析'}
      </button>
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-purple-600"
        >
          正在为您分析合同内容，请稍候...
        </motion.div>
      )}
      {!content && (
        <p className="mt-2 text-sm text-gray-500">请先上传合同文件</p>
      )}
      {content && !stance && (
        <p className="mt-2 text-sm text-gray-500">请选择分析立场</p>
      )}
    </div>
  )
} 