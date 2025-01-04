import { NextResponse } from 'next/server'
import { analyzeContract } from '@/lib/api'
import { ContractAnalysisRequest } from '@/lib/api'

export const maxDuration = 300 // 设置最大超时时间为 300 秒

export async function POST(request: Request) {
  try {
    const body: ContractAnalysisRequest = await request.json()
    
    if (!body.content || !body.stance) {
      return NextResponse.json(
        { error: '请提供合同内容和分析立场' },
        { status: 400 }
      )
    }

    const result = await analyzeContract(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '分析失败，请重试' },
      { status: 500 }
    )
  }
} 