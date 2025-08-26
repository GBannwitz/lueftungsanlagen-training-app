import { Link, Routes, Route } from 'react-router-dom'
import Lesson from '@/lessons/lueftungsanlagen-grundlagen' // zeigt unsere Lektionen-Seite
import './styles/index.css'

const lessons = [
  { id: '1', title: '1. Purpose & Basics' },
  { id: '2', title: '2. Komponenten & Symbolik' },
  { id: '3', title: '3. Luftführung & Druckprinzipien' },
  { id: '4', title: '4. Regelstrategien & Betrieb' },
  { id: '5', title: '5. Energie & Effizienz' },
  { id: '6', title: '6. F&B-spezifische Anwendungen' },
  { id: '7', title: '7. Monitoring, Compliance & Wirtschaftlichkeit' },
]

function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Lüftungsanlagen – Training</h1>
        <nav className="space-x-4 text-sm underline">
          <Link to="/export">Export</Link>
          <Link to="/import">Import</Link>
          <Link to="/reset">Reset</Link>
        </nav>
      </header>

      <h2 className="text-2xl font-bold mb-2">Lernfortschritt</h2>
      <div className="h-2 bg-gray-200 rounded mb-6" aria-hidden />

      <h3 className="text-lg font-semibold mb-4">Lektionen</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {lessons.map(l => (
          <div key={l.id} className="rounded-2xl border p-5">
            <div className="mb-3">{l.title}</div>
            {/* WICHTIG: React-Router-Link -> respektiert <BrowserRouter basename> */}
            <Link
              to={`/lesson/${l.id}`}
              className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Start
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple Platzhalter-Routen für Demo (Export/Import/Reset)
function Placeholder({ title }: { title: string }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-2">{title}</h1>
      <Link to="/" className="underline">Zurück</Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* unsere eigentliche Lektionen-Ansicht */}
      <Route path="/lesson/:id" element={<Lesson />} />
      <Route path="/export" element={<Placeholder title="Export" />} />
      <Route path="/import" element={<Placeholder title="Import" />} />
      <Route path="/reset" element={<Placeholder title="Reset" />} />
    </Routes>
  )
}
