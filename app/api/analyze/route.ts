import { NextRequest, NextResponse } from 'next/server'
import { analyzeContract } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = await analyzeContract(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Contract analysis error:', error)
    return NextResponse.json(
      { error: '合同分析过程中出现错误' },
      { status: 500 }
    )
  }
} 