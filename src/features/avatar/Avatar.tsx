import React from 'react'

type Props = {
  text: string
  autoplay?: boolean
  captionsVtt?: string
  fallbackVideo?: string
}

export default function Avatar({ text, autoplay = true, captionsVtt, fallbackVideo }: Props) {
  const [useTTS, setUseTTS] = React.useState<boolean>(!!('speechSynthesis' in window))
  const audioRef = React.useRef<HTMLAudioElement>(null)

  React.useEffect(()=>{
    if (!useTTS) return
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'de-DE'
    speechSynthesis.cancel()
    if (autoplay) speechSynthesis.speak(utter)
    return () => speechSynthesis.cancel()
  }, [text, useTTS, autoplay])

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <div className="w-24 h-24 rounded-full bg-emerald-500 grid place-items-center text-white font-bold text-xl" aria-hidden>AV</div>
      <div className="flex-1">
        {useTTS ? (
          <p aria-live="polite" className="text-slate-900 dark:text-slate-100">{text}</p>
        ) : (
          <div>
            <video className="w-full rounded" controls src={fallbackVideo}>
              {captionsVtt && <track kind="captions" srcLang="de" label="Deutsch" src={captionsVtt} default />}
            </video>
            <p className="text-sm text-slate-600 mt-1">Untertitel verfügbar</p>
          </div>
        )}
      </div>
      <button className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700" onClick={()=>setUseTTS(!useTTS)}>
        {useTTS ? 'Fallback-Video' : 'TTS verwenden'}
      </button>
    </div>
  )
}
