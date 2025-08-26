import React, { useEffect, useRef, useState } from 'react'

type Props = {
  script: string
  poster?: string
  onEnd?: () => void
}

const getSynth = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window
    ? window.speechSynthesis
    : undefined

export default function Avatar({ script, poster = '/assets/icons/icon-512.png', onEnd }: Props) {
  const [speaking, setSpeaking] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synth = getSynth()

  const stop = () => {
    try { synth?.cancel() } catch {}
    setSpeaking(false)
  }

  const start = () => {
    if (!synth) return
    stop()
    const u = new SpeechSynthesisUtterance(script)
    u.lang = 'de-DE'
    u.rate = 1.02
    u.onend = () => { setSpeaking(false); onEnd?.() }
    utterRef.current = u
    setSpeaking(true)
    synth.speak(u)
  }

  useEffect(() => () => stop(), [])

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
      <img src={poster} alt="Avatar" className="w-24 h-24 rounded-full ring-2 ring-emerald-400" />
      <div className="flex-1">
        <div className="text-sm text-slate-600 dark:text-slate-300">Avatar-Mini-Lektion (TTS)</div>
        <div className="mt-2 space-x-2">
          <button onClick={start} className="px-3 py-1 rounded-lg bg-emerald-600 text-white">
            {speaking ? 'Neu starten' : 'Abspielen'}
          </button>
          <button onClick={stop} className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700">Stop</button>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer">Untertitel anzeigen</summary>
          <p className="mt-2 text-sm whitespace-pre-wrap">{script}</p>
        </details>
      </div>
    </div>
  )
}
