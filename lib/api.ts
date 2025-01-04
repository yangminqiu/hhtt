interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface CompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export interface ContractAnalysisRequest {
  content: string
  stance: 'party-a' | 'party-b' | 'neutral'
}

export interface ContractAnalysisResponse {
  analysis: string
  suggestions: string[]
  optimizedContent: string
}

export async function analyzeContract(
  request: ContractAnalysisRequest
): Promise<ContractAnalysisResponse> {
  const stancePrompts = {
    'party-a': `作为甲方的法律顾问，请严格从保护甲方权益的角度审查并优化这份合同。

分析要求：
1. 详细分析可能损害甲方利益的条款，确保甲方的利益不受损害
2. 评估合同条款对甲方的风险和义务，确保甲方的权益得到最大程度保障
3. 强化违约责任和追责机制，确保甲方能够获得充分赔偿
4. 优化管辖约定，约定在甲方所在地法院管辖
5. 分析合同履行过程中的潜在风险，确保甲方能够最大限度规避风险
6. 特别注意：必须添加或优化送达地址条款，约定有利于甲方的送达方式，并明确规定送达的生效时间和法律后果

优化原则：
1. 扩大甲方的权利范围，确保甲方在合同中的优先权益
2. 增加保障措施，确保甲方在违约情况下的权益不受损害
3. 细化违约处理流程，确保甲方有明确的补救措施
4. 强化通知义务，确保合同履行过程中甲方能够及时掌握重要信息
5. 明确送达地址和送达方式，约定以甲方确认收到为送达生效时间
6. 约定有利于甲方的争议解决方式，确保甲方能够获得公正裁决`,

    'party-b': `作为乙方的法律顾问，请严格从保护乙方权益的角度审查并优化这份合同。

分析要求：
1. 详细分析对乙方不利的条款，特别是责任和义务过重的部分
2. 评估合同条款的公平性，确保乙方的权益得到充分保障
3. 审查违约责任条款，确保乙方不会因为不可控因素遭受过度惩罚
4. 优化管辖约定，约定在乙方所在地法院管辖
5. 分析合同履行中的潜在问题，确保乙方能够顺利履行合同并得到相应保护
6. 特别注意：必须添加或优化送达地址条款，约定合理的送达方式，并确保乙方有充分时间收到和处理通知

优化原则：
1. 限制乙方的责任范围，避免不必要的责任承担
2. 降低违约成本和责任，确保乙方在违约情况下的风险可控
3. 增加还款和解约灵活性，确保乙方在特殊情况下的利益不受损
4. 平衡双方权利义务，确保乙方的义务不过于沉重
5. 明确送达地址和送达方式，要求送达必须有乙方签收确认
6. 约定有利于乙方的争议解决方式，确保乙方在争议中处于有利位置`,

    'neutral': `作为中立方的法律顾问，请从公正立场审查并优化这份合同。

分析要求：
1. 详细分析合同中可能偏向某一方的不公平条款，确保公平性
2. 评估合同条款的公平性，确保各方权益得到合理平衡
3. 审查合同条款中的责任划分是否合理，确保没有一方承担过多责任
4. 确保合同中的风险分配适当，避免对某一方的不公正负担
5. 优化管辖约定，建议约定在合同签订所在地法院管辖
6. 特别注意：必须添加或优化送达地址条款，约定公平合理的送达方式，确保双方都能及时收到通知

优化原则：
1. 保证合同条款的公平性和公正性，避免出现倾向性条款
2. 确保各方的责任和义务对等，避免一方过于承担风险
3. 增强合同的可执行性，确保各方能够公平履行合同
4. 明确各方的通知义务，确保信息及时有效地传递
5. 明确送达地址和送达方式，采用双方认可的送达方式，并约定合理的送达确认机制
6. 约定有利于各方公平解决争议的方式，确保公正裁决`
  }

  const systemPrompt = `你是一位资深的法律顾问，精通合同分析和风险评估。请严格按照用户选择的立场给出分析和建议。如果合同条款不完整，请从用户的立场出发进行补充。请按以下格式输出：

1. 合同分析：
   - 从用户立场详细分析每个条款的利弊
   - 重点指出对用户不利的条款
   - 分析条款的合法性和合理性
   - 评估潜在风险和责任分配

2. 优化建议：
   - 针对每个不利条款提供具体的修改建议
   - 补充对用户有利的保护性条款
   - 提供降低风险的具体措施
   - 建议合理的争议解决方案

3. 优化后的合同：
   请生成一份完整的优化后合同，要求：
   - 充分体现用户立场的利益诉求
   - 最大限度保护用户权益
   - 确保条款的合法性和可执行性
   - 预防可能的争议和风险
   
   必须包含以下送达地址条款（根据不同立场调整内容）：
   
   甲方立场时：
   "第X条 送达地址
   1. 各方确认以下地址为通知、文件往来的有效送达地址：
      甲方送达地址：【具体地址】
      乙方送达地址：【具体地址】
   2. 任何通知或文件应采用书面形式，以专人送达、邮寄或电子邮件方式递送。
   3. 以专人送达的，须经甲方签收后生效；以邮寄方式送达的，以甲方签收之日为送达日期。
   4. 任何一方变更送达地址，应提前5个工作日书面通知对方，否则原地址仍为有效送达地址。"

   乙方立场时：
   "第X条 送达地址
   1. 各方确认以下地址为通知、文件往来的有效送达地址：
      甲方送达地址：【具体地址】
      乙方送达地址：【具体地址】
   2. 任何通知或文件必须采用书面形式，并以专人送达或特快专递方式递送。
   3. 所有文件必须经乙方签收确认后方可生效，以乙方签收日期为送达日期。
   4. 任何一方变更送达地址，应提前10个工作日书面通知对方，并经对方确认。"

   中立立场时：
   "第X条 送达地址
   1. 各方确认以下地址为通知、文件往来的有效送达地址：
      甲方送达地址：【具体地址】
      乙方送达地址：【具体地址】
   2. 任何通知或文件应采用书面形式，可通过专人送达、特快专递或电子邮件方式递送。
   3. 以专人送达的，经收件方签收之日为送达日期；以特快专递送达的，以快递单据上的签收日期为送达日期。
   4. 任何一方变更送达地址，应提前7个工作日书面通知对方，经对方确认后生效。"

请使用"合同分析"、"优化建议"、"优化后的合同"作为每个部分的标题。`

  try {
    const response = await fetch(`${process.env.DEEPSEEK_API_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `${stancePrompts[request.stance]}\n\n合同内容：${request.content}`
          }
        ],
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const result = await response.json()
    const content = result.choices[0].message.content || ''

    // 使用正则表达式提取各部分内容
    const sections = {
      analysis: content.match(/合同分析[\s\S]*?(?=优化建议|$)/)?.[0]?.replace(/^合同分析[：:：]?\s*/, '').trim() || '',
      suggestions: content.match(/优化建议[\s\S]*?(?=优化后的合同|$)/)?.[0]?.replace(/^优化建议[：:：]?\s*/, '').trim() || '',
      optimized: content.match(/优化后的合同[\s\S]*$/)?.[0]?.replace(/^优化后的合同[：:：]?\s*/, '').trim() || ''
    }

    if (!sections.analysis || !sections.suggestions || !sections.optimized) {
      throw new Error('AI返回的内容格式不正确')
    }

    // 处理优化建议，将其转换为数组
    const suggestions: string[] = sections.suggestions
      .split(/(?:\d+[\.、]|\-|\*)\s+/) // 分割标记
      .filter((s: string): boolean => Boolean(s.trim()))
      .map((s: string): string => {
        return s.trim()
          .replace(/^[#\*]+\s*/, '') // 移除开头的 # 和 *
          .replace(/[#\*]+\s*$/, '') // 移除结尾的 # 和 *
      })

    if (!suggestions.length) {
      throw new Error('未能提取到有效的优化建议')
    }

    // 清理分析内容中的特殊标记
    const cleanAnalysis = sections.analysis
      .replace(/[#\*]+\s*/g, '') // 移除所有 # 和 *
      .trim()

    // 清理优化后合同内容中的特殊标记
    const cleanOptimized = sections.optimized
      .replace(/[#\*]+\s*/g, '') // 移除所有 # 和 *
      .trim()

    return {
      analysis: cleanAnalysis,
      suggestions,
      optimizedContent: cleanOptimized
    }
  } catch (error) {
    console.error('Contract analysis error:', error)
    throw new Error(error instanceof Error ? error.message : '合同分析失败，请重试')
  }
} 