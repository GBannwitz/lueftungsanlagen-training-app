import { create } from 'zustand'
import type { ProgressRecord } from './schema'

const STORAGE_KEY = 'lv_training_progress_v1'

function load(): ProgressRecord {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (existing) return JSON.parse(existing)
  const userId = crypto.randomUUID()
  const now = new Date().toISOString()
  const empty: ProgressRecord = { userId, lessons: {}, badges: [], totalScore: 0 }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(empty))
  return empty
}

function save(data: ProgressRecord) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useProgress = create<{
  data: ProgressRecord
  updateLesson: (id: string, updater: (l: ProgressRecord['lessons'][string]) => void) => void
  exportJSON: () => string
  importJSON: (raw: string) => void
  reset: () => void
}>(set => ({
  data: load(),
  updateLesson: (id, updater) => set(state => {
    const now = new Date().toISOString()
    const lesson = state.data.lessons[id] ?? {
      lastBlockId: 'start', completedBlocks: [],
      miniLesson: { watched: false },
      controlCheck: { attempts: 0, bestScore: 0 },
      quiz: { attempts: 0, bestScore: 0 },
      oralCheck: { done: false },
      timeSpentSec: 0, updatedAt: now
    }
    updater(lesson)
    lesson.updatedAt = now
    state.data.lessons[id] = lesson
    save(state.data)
    return { data: state.data }
  }),
  exportJSON: () => JSON.stringify(load(), null, 2),
  importJSON: (raw) => set(_ => {
    const parsed = JSON.parse(raw) as ProgressRecord
    save(parsed)
    return { data: parsed }
  }),
  reset: () => set(_ => {
    const userId = crypto.randomUUID()
    const empty: ProgressRecord = { userId, lessons: {}, badges: [], totalScore: 0 }
    save(empty); return { data: empty }
  })
}))
