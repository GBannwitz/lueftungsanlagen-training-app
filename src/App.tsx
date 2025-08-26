import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useProgress } from './features/progress/store'
import { ConsentBanner } from './components/Consent'
import { ProgressBar } from './components/ProgressBar'
import Lesson from './lessons/lueftungsanlagen-grundlagen'

export default function App(){
  const { data, exportJSON, importJSON, reset } = useProgress()
  const nav = useNavigate()
  const totalLessons = 7
  const completed = Object.values(data.lessons).filter(l => l.completedBlocks.includes('quiz_done')).length
  const progress = completed / totalLessons

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <header className="p-4 border-b bg-white/60 dark:bg-slate-900/60 backdrop-blur sticky top-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="font-bold">Lüftungsanlagen – Training</Link>
          <nav className="flex items-center gap-4 text-sm">
            <button onClick={()=>{ const blob = new Blob([exportJSON()], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='progress.json'; a.click(); }} className="underline">Export</button>
            <label className="underline cursor-pointer">Import
              <input type="file" accept="application/json" className="hidden" onChange={e=>{
                const f = e.target.files?.[0]; if (!f) return;
                f.text().then(t=>importJSON(t)); alert('Import ok – neu laden!')
              }} />
            </label>
            <button onClick={()=>{ if(confirm('Fortschritt zurücksetzen?')) reset(); nav('/'); }} className="underline">Reset</button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <section className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Lernfortschritt</h1>
          <ProgressBar value={progress} />
        </section>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/lesson/:idx" element={<Lesson />} />
        </Routes>
      </main>

      <ConsentBanner />
    </div>
  )
}

function Home(){
  const lessons = [
    'Purpose & Basics',
    'Komponenten & Symbolik',
    'Luftführung & Druckprinzipien',
    'Regelstrategien & Betrieb',
    'Energie & Effizienz',
    'F&B-spezifische Anwendungen',
    'Monitoring, Compliance & Wirtschaftlichkeit'
  ]
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Lektionen</h2>
      <ol className="grid md:grid-cols-2 gap-3">
        {lessons.map((t,i)=>(
          <li key={i} className="p-4 border rounded-xl bg-white dark:bg-slate-800">
            <p className="font-medium">{i+1}. {t}</p>
            <a className="mt-2 inline-block px-3 py-1 rounded bg-emerald-600 text-white" href={`/lesson/${i+1}`}>Start</a>
          </li>
        ))}
      </ol>
    </div>
  )
}
