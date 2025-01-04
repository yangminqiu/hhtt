'use client'
import { motion } from 'framer-motion'
import { useContractStore } from '@/lib/store'

type StanceId = 'party-a' | 'party-b' | 'neutral'

interface Stance {
  id: StanceId
  title: string
  description: string
  icon: string
}

const stances: Stance[] = [
  {
    id: 'party-a',
    title: '甲方立场',
    description: '维护甲方权益',
    icon: '甲'
  },
  {
    id: 'party-b',
    title: '乙方立场',
    description: '保护乙方利益',
    icon: '乙'
  },
  {
    id: 'neutral',
    title: '中立立场',
    description: '公正客观分析',
    icon: '中'
  }
]

export default function StanceSelector() {
  const { content, stance, setStance } = useContractStore()
  const isDisabled = !content

  const handleStanceSelect = (selectedStance: StanceId) => {
    if (!isDisabled) {
      setStance(selectedStance)
    }
  }

  return (
    <div>
      <h3 className="text-base font-medium text-center mb-4">请选择分析立场</h3>
      <div className={`grid grid-cols-3 gap-4 ${isDisabled ? 'opacity-50' : ''}`}>
        {stances.map((item) => (
          <motion.button
            key={item.id}
            whileHover={!isDisabled ? { scale: 1.02 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-sm transition-all ${
              stance === item.id ? 'ring-2 ring-purple-600' : ''
            } ${isDisabled ? 'cursor-not-allowed' : 'hover:shadow-md'}`}
            onClick={() => handleStanceSelect(item.id)}
            disabled={isDisabled}
            aria-label={`选择${item.title}`}
          >
            <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-base font-medium mb-2">
              {item.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.description}</p>
          </motion.button>
        ))}
      </div>
      {isDisabled && (
        <p className="text-sm text-gray-500 text-center mt-4">
          请先上传合同文件
        </p>
      )}
    </div>
  )
} 