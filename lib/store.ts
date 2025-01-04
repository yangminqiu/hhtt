import { create } from 'zustand'
import { createJSONStorage, persist, devtools } from 'zustand/middleware'

interface AnalysisResult {
  analysis: string
  suggestions: string[]
  optimizedContent?: string
}

interface ContractState {
  fileName: string | null
  content: string | null
  stance: 'party-a' | 'party-b' | 'neutral' | null
  result: AnalysisResult | null
  setFile: (file: File | null) => void
  setContent: (content: string | null) => void
  setStance: (stance: 'party-a' | 'party-b' | 'neutral' | null) => void
  setResult: (result: AnalysisResult | null) => void
  reset: () => void
}

const initialState = {
  fileName: null,
  content: null,
  stance: null,
  result: null,
}

export const useContractStore = create<ContractState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setFile: (file: File | null) => 
          set({ fileName: file?.name || null, result: null }),
        setContent: (content: string | null) => 
          set({ content, result: null }),
        setStance: (stance: 'party-a' | 'party-b' | 'neutral' | null) => 
          set({ stance, result: null }),
        setResult: (result: AnalysisResult | null) =>
          set({ result }),
        reset: () => set(initialState)
      }),
      {
        name: 'contract-store',
        storage: createJSONStorage(() => {
          if (typeof window !== 'undefined') {
            return sessionStorage
          }
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {}
          }
        })
      }
    )
  )
) 