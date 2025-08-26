import { describe, it, expect } from 'vitest'
import { act } from 'react'
import { useProgress } from '../../src/features/progress/store'

describe('progress store', () => {
  it('initializes and updates controlCheck', () => {
    const { getState } = useProgress
    const s = getState()
    expect(s.data.userId).toBeDefined()
    act(()=>{
      s.updateLesson('test', l => { l.controlCheck.attempts += 1; l.controlCheck.bestScore = 0.8 })
    })
    const s2 = getState()
    expect(s2.data.lessons['test'].controlCheck.attempts).toBe(1)
    expect(s2.data.lessons['test'].controlCheck.bestScore).toBe(0.8)
  })
})
