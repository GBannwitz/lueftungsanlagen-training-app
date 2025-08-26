import React from 'react'
export function ConsentBanner(){
  const [consented, setConsented] = React.useState(localStorage.getItem('consent') === 'yes')
  if (consented) return null
  return (
    <div className="fixed bottom-0 inset-x-0 bg-slate-900 text-white p-3 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-sm">Diese App speichert Lernfortschritt lokal (On-Device). Optionaler Cloud-Sync kann später aktiviert werden.</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-white text-slate-900" onClick={()=>{localStorage.setItem('consent','yes'); setConsented(true)}}>Zustimmen</button>
          <button className="px-3 py-1 rounded bg-slate-700" onClick={()=>setConsented(true)}>Ablehnen</button>
        </div>
      </div>
    </div>
  )
}
