import React from 'react'
import type { Item } from '@/features/quiz/engine'
import { score } from '@/features/quiz/engine'
import { useProgress } from '@/features/progress/store'

export function ControlCheck({ lessonId, items }:{ lessonId: string; items: Item[] }){
  const { updateLesson } = useProgress()
  const [responses, setResponses] = React.useState<Record<string, any>>({})
  const [result, setResult] = React.useState<number | null>(null)

  const submit = ()=>{
    const s = score(items, responses)
    setResult(s)
    updateLesson(lessonId, l => {
      l.controlCheck.attempts += 1
      if (s > l.controlCheck.bestScore) l.controlCheck.bestScore = s
    })
  }

  return (
    <div className="p-4 border rounded-xl">
      <h3 className="font-semibold mb-2">Kontrollfragen</h3>
      {items.map(item => (
        <div key={item.id} className="mb-3">
          <p className="font-medium">{item.prompt}</p>
          {item.type === 'MC' && (
            <div className="flex gap-2 flex-wrap">
              {item.choices.map((c, idx)=>(
                <label key={idx} className="inline-flex items-center gap-2">
                  <input type="radio" name={item.id} onChange={()=>setResponses({...responses, [item.id]: idx})} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          )}
          {item.type === 'Decision' && (
            <div className="flex gap-4">
              <button className="px-3 py-1 rounded bg-slate-200" onClick={()=>setResponses({...responses, [item.id]: true})}>Ja</button>
              <button className="px-3 py-1 rounded bg-slate-200" onClick={()=>setResponses({...responses, [item.id]: false})}>Nein</button>
            </div>
          )}
          {item.type === 'DragDrop' && (
            <p className="text-sm text-slate-600">Drag&Drop-UI wird im Quiz genutzt. Hier bitte Reihenfolge manuell eintippen (durch Komma getrennt):</p>
          )}
        </div>
      ))}
      <button className="px-3 py-1 rounded bg-emerald-600 text-white" onClick={submit}>Prüfen</button>
      {result !== null && <p className="mt-2">Score: {(result*100).toFixed(0)}%</p>}
    </div>
  )
}
