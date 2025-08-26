import React from 'react'
export function Checklist({ items }:{ items: { label: string, id: string }[] }){
  const [done, setDone] = React.useState<Record<string, boolean>>({})
  return (
    <ul className="space-y-2">
      {items.map(it => (
        <li key={it.id} className="flex items-center gap-2">
          <input type="checkbox" id={it.id} onChange={(e)=>setDone({ ...done, [it.id]: e.target.checked })} />
          <label htmlFor={it.id}>{it.label}</label>
        </li>
      ))}
    </ul>
  )
}
