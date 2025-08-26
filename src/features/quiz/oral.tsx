import React from 'react'

export function OralCheck({ question, onResult }: { question: string; onResult: (text: string)=>void }) {
  const [recording, setRecording] = React.useState(false)
  const [supported, setSupported] = React.useState(false)
  const recRef = React.useRef<any>(null)

  React.useEffect(()=>{
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    setSupported(!!SR)
    if (SR) recRef.current = new SR()
    if (recRef.current) recRef.current.lang = 'de-DE'
    if (recRef.current) recRef.current.onresult = (e:any)=>{
      const txt = Array.from(e.results).map((r:any)=>r[0].transcript).join(' ')
      onResult(txt)
    }
  },[])

  const start = ()=>{ if (!recRef.current) return; setRecording(true); recRef.current.start() }
  const stop = ()=>{ if (!recRef.current) return; setRecording(false); recRef.current.stop() }

  return (
    <div className="p-4 border rounded-xl">
      <p className="font-semibold">Mündliche Abfrage</p>
      <p className="mb-2">{question}</p>
      {!supported && <p className="text-sm text-red-600">Browser unterstützt keine STT. Bitte Antwort eintippen.</p>}
      <div className="flex gap-2">
        <button onClick={start} className="px-3 py-1 rounded bg-emerald-500 text-white" aria-disabled={!supported}>Aufnehmen</button>
        <button onClick={stop} className="px-3 py-1 rounded bg-slate-700 text-white">Stopp</button>
      </div>
      <textarea aria-label="Antwort" className="mt-3 w-full border rounded p-2" placeholder="Antwort hier..." onChange={(e)=>onResult(e.target.value)} />
    </div>
  )
}
