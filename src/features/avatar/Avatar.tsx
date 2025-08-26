import React, { useEffect, useRef, useState } from 'react'

type Props = {
  script: string
  onEnd?: () => void
}

const getSynth = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window
    ? window.speechSynthesis
    : undefined

export default function Avatar({ script, onEnd }: Props) {
  const synth = getSynth()
  const [speaking, setSpeaking] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [blink, setBlink] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)
  const mouthTimer = useRef<number | null>(null)
  const blinkTimer = useRef<number | null>(null)
  const unblinkTimer = useRef<number | null>(null)

  const stop = () => {
    try { synth?.cancel() } catch {}
    setSpeaking(false)
    setMouthOpen(false)
  }

  const start = () => {
    if (!synth) return
    stop()
    const u = new SpeechSynthesisUtterance(script)
    u.lang = 'de-DE'
    u.rate = 1.02
    u.onend = () => { setSpeaking(false); setMouthOpen(false); onEnd?.() }
    utterRef.current = u
    setSpeaking(true)
    synth.speak(u)
  }

  // simple Lippenbewegung (Öffnen/Schließen) solange gesprochen wird
  useEffect(() => {
    if (speaking) {
      mouthTimer.current = window.setInterval(() => {
        setMouthOpen(m => !m)
      }, 180)
    } else if (mouthTimer.current) {
      clearInterval(mouthTimer.current)
      mouthTimer.current = null
      setMouthOpen(false)
    }
    return () => {
      if (mouthTimer.current) { clearInterval(mouthTimer.current); mouthTimer.current = null }
    }
  }, [speaking])

  // Blinzeln alle 2–6 s
  useEffect(() => {
    const scheduleBlink = () => {
      blinkTimer.current = window.setTimeout(() => {
        setBlink(true)
        unblinkTimer.current = window.setTimeout(() => setBlink(false), 120)
        scheduleBlink()
      }, 2000 + Math.random() * 4000)
    }
    scheduleBlink()
    return () => {
      if (blinkTimer.current) clearTimeout(blinkTimer.current)
      if (unblinkTimer.current) clearTimeout(unblinkTimer.current)
    }
  }, [])

  useEffect(() => () => stop(), []) // cleanup beim Unmount

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
      {/* Stylisierter Kopf als SVG */}
      <svg
        width="96" height="96" viewBox="0 0 120 120"
        className="rounded-full ring-2 ring-emerald-400 flex-shrink-0 bg-slate-200"
        role="img" aria-label="KI-Avatar"
      >
        {/* Kopf */}
        <circle cx="60" cy="60" r="50" fill="#fde68a" /> {/* warmes Haut-Gelb */}
        {/* Haare/Kontur */}
        <path d="M15,55 C20,20 55,18 60,18 C90,18 105,38 105,55 C95,35 75,30 60,30 C45,30 25,35 15,55"
              fill="#0ea5e9" opacity="0.25"/>
        {/* Augen */}
        {blink ? (
          <>
            <line x1="40" y1="55" x2="52" y2="55" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
            <line x1="68" y1="55" x2="80" y2="55" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
          </>
        ) : (
          <>
            <ellipse cx="46" cy="53" rx="6" ry="8" fill="#111827"/>
            <ellipse cx="74" cy="53" rx="6" ry="8" fill="#111827"/>
          </>
        )}
        {/* Mund */}
        {mouthOpen ? (
          <ellipse cx="60" cy="82" rx="12" ry="8" fill="#ef4444" />
        ) : (
          <path d="M45,82 Q60,88 75,82" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
        )}
        {/* leichte Wange/Schattierung */}
        <circle cx="38" cy="70" r="6" fill="#fca5a5" opacity="0.5"/>
        <circle cx="82" cy="70" r="6" fill="#fca5a5" opacity="0.5"/>
      </svg>

      <div className="flex-1">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Avatar-Mini-Lektion (Text-to-Speech)
        </div>
        <div className="mt-2 space-x-2">
          <button onClick={start} className="px-3 py-1 rounded-lg bg-emerald-600 text-white">
            {speaking ? 'Neu starten' : 'Abspielen'}
          </button>
          <button onClick={stop} className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700">
            Stop
          </button>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer">Untertitel anzeigen</summary>
          <p className="mt-2 text-sm whitespace-pre-wrap">{script}</p>
        </details>
        {!synth && (
          <p className="mt-2 text-xs text-amber-700">
            Hinweis: Dein Browser unterstützt keine Sprachsynthese. Die Untertitel zeigen den gesamten Text.
          </p>
        )}
      </div>
    </div>
  )
}
