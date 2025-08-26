import React from 'react'

export function ProgressBar({ value }: { value: number }){
  return (
    <div className="h-3 bg-slate-200 rounded-full" role="progressbar" aria-valuenow={Math.round(value*100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-3 bg-emerald-500 rounded-full" style={{ width: `${Math.round(value*100)}%` }} />
    </div>
  )
}
