import { create } from 'zustand'
import type { ProgressRecord } from './schema'

const STORAGE_KEY = 'lv_training_progress_v1'

// Minimaler Storage-Shim: nutzt localStorage, fällt in Tests auf In-Memory zurück
type SimpleStorage = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem?(key: string): void
  clear?(): void
}
const storage: SimpleStorage = (() => {
  try {
    if (typeof localStorage !== 'undefined') return localStorage as unknown as SimpleStorage
  } catch { /* ignore */ }
  const mem = new Map<string, string>()
  return {
    getItem: (k) => (mem.has(k) ? mem.get(k)! : null),
    setItem: (k, v) => { mem.set(k, String(v)) },
    removeItem: (k) => { mem.delete(k) },
    clear: () => { mem.clear() }
  }
})()

// UUID-Shim: nutzt crypto.randomUUID, sonst Fallback
const uuid = (): string => {
  try {
    // @ts-ignore
    if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
      // @ts-ignore
      return (crypto as any).randomUUID()
    }
  } catch { /* ignore */ }
  return 'uid-' + Math.random().toString(36).slice(2)
}

function load(): ProgressRecord {
  const existing = storage.getItem(STORAGE_KEY)
  if (existing) return JSON.parse(existing)
  const now = new Date().toISOString()
  const userId = uuid()
  const empty: ProgressRecord = { userId, lessons: {}, badges: [], totalScore: 0 }
  storage.setItem(STORAGE_KEY, JSON.stringify(empty))
  return empty
}

function save(data: ProgressRecord) {
  storage.setItem(STORAGE_KEY, JSON.stringify(data))
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
    const userId = uuid()
    const empty: ProgressRecord = { userId, lessons: {}, badges: [], totalScore: 0 }
    save(empty); return { data: empty }
  })
}))
