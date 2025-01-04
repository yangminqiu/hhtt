'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { useContractStore } from '@/lib/store'
import mammoth from 'mammoth'

export default function ContractUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { fileName, setFile, setContent } = useContractStore()

  const preprocessContent = (content: string): string => {
    // 移除多余的空白字符和特殊格式
    let processed = content
      .replace(/\r\n/g, '\n') // 统一换行符
      .replace(/\t/g, '    ') // 替换制表符为空格
      .replace(/\u00A0/g, ' ') // 替换 non-breaking space
      .replace(/\u200B/g, '') // 移除零宽空格
      .replace(/\n{3,}/g, '\n\n') // 将多个连续换行减少为两个
      .trim()

    // 确保内容有基本的结构
    if (!processed.includes('合同') && !processed.includes('协议')) {
      throw new Error('文件内容可能不是合同文本，请检查文件内容')
    }

    // 如果内容太短，可能不是完整合同
    if (processed.length < 100) {
      throw new Error('合同内容过短，请确保上传完整的合同文件')
    }

    return processed
  }

  const readFileContent = async (file: File) => {
    try {
      let content: string
      if (file.type === 'text/plain') {
        // 处理 TXT 文件
        content = await file.text()
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        // 处理 Word 文档
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        content = result.value
      } else {
        throw new Error('不支持的文件格式')
      }

      // 预处理内容
      return preprocessContent(content)
    } catch (error) {
      console.error('文件读取错误:', error)
      throw new Error('文件内容读取失败，请确保文件格式正确且未被损坏')
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return

    // 检查文件类型
    const allowedTypes = [
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      setError('请上传 Word 或 TXT 格式的文件')
      return
    }

    // 检查文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过 10MB')
      return
    }

    try {
      setError(null)
      const content = await readFileContent(file)
      setFile(file)
      setContent(content)
    } catch (error) {
      console.error('文件处理错误:', error)
      setError(error instanceof Error ? error.message : '文件处理过程中出现错误')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <motion.div
      initial={false}
      className={`border-2 border-dashed rounded-xl p-4 text-center ${
        isDragging ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
      }`}
      onDragEnter={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragging(false)
      }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".doc,.docx,.txt"
      />
      <div className="flex flex-col items-center">
        <CloudArrowUpIcon className="w-8 h-8 text-purple-600 mb-2" />
        <h3 className="text-base font-medium text-gray-900 mb-1">
          {fileName ? '上传文件' : '上传合同文件'}
        </h3>
        {fileName ? (
          <p className="text-sm text-gray-500 mb-2">
            当前文件：{fileName}
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-2">
            支持 Word、TXT 格式，最大 10MB
          </p>
        )}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
        >
          选择文件
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </motion.div>
  )
} 