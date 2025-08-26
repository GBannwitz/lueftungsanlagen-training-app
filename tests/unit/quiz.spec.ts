import { describe, it, expect } from 'vitest'
import { score, Item } from '../../src/features/quiz/engine'

describe('quiz scoring', () => {
  it('scores MC & Decision & DragDrop', () => {
    const items: Item[] = [
      { id: 'a', type: 'MC', prompt: '', choices: ['x','y'], answer: 1 },
      { id: 'b', type: 'Decision', prompt: '', correct: true },
      { id: 'c', type: 'DragDrop', prompt: '', options: ['1','2'], correct: ['1','2'] }
    ]
    const s = score(items, { a: 1, b: true, c: ['1','2'] })
    expect(s).toBe(1)
  })
})
