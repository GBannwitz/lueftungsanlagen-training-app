import React from 'react'
export function Glossary({ items }:{ items: { term: string, def: string }[] }){
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {items.map(it => (
        <div key={it.term} className="p-3 border rounded-xl bg-white dark:bg-slate-800">
          <p className="font-semibold">{it.term}</p>
          <p className="text-sm">{it.def}</p>
        </div>
      ))}
    </div>
  )
}
