import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@/features/avatar/Avatar'
import { ControlCheck } from '@/components/ControlCheck'
import { Glossary } from '@/components/Glossary'
import { Checklist } from '@/components/Checklist'
import { MediaPlayer } from '@/components/MediaPlayer'
import { ROI } from '@/components/ROI'
import { useProgress } from '@/features/progress/store'

const LESSONS = [
  'purpose-basics.mdx',
  'komponenten-symbolik.mdx',
  'luftfuehrung-druck.mdx',
  'regelstrategien-betrieb.mdx',
  'energie-effizienz.mdx',
  'fnb-anwendungen.mdx',
  'monitoring-compliance-wirtschaft.mdx'
]

export default function Lesson(){
  const { idx } = useParams()
  const i = Math.max(1, Math.min(LESSONS.length, Number(idx || '1')))
  const id = `lv-lesson-${i}`
  const { updateLesson } = useProgress()

  React.useEffect(()=>{
    updateLesson(id, l => { l.lastBlockId = 'start' })
  }, [id])

  const commonMedia = {
    images: [{ title: 'Lüftungszentrale Schema', path: '/assets/diagrams/ahuschema.svg' }],
    videos: [],
    animations: [{ title: 'WRG Animation', path: '/assets/diagrams/wrg_anim.svg' }],
    audio: []
  }

  const controlItems = [
    { id: 'c1', type: 'MC', prompt: 'Welche Aufgabe hat die WRG?', choices: ['Außenluft filtern', 'Energie aus Abluft zurückgewinnen', 'Luft befeuchten'], answer: 1 },
    { id: 'c2', type: 'Decision', prompt: 'SFP beschreibt die Leistungsaufnahme pro Volumenstrom.', correct: true }
  ] as any

  return (
    <div className="space-y-6">
      <Avatar text="Willkommen! Ich bin Ihr KI-Avatar. In 2 Minuten klären wir die Kernideen dieser Lektion." captionsVtt="/assets/captions/intro.vtt" fallbackVideo="/assets/video/avatar_fallback.mp4" />
      <ControlCheck lessonId={id} items={controlItems} />
      <section>
        <h2 className="text-xl font-bold">Lernziele</h2>
        <ul className="list-disc ml-6">
          <li>Aufbau und Hauptkomponenten benennen</li>
          <li>Typische Verluste und Ursachen erklären</li>
          <li>Wesentliche Effizienzhebel identifizieren</li>
        </ul>
      </section>
      <MediaPlayer {...commonMedia} />
      <Glossary items={[
        { term: 'SFP (Spezifische Ventilatorleistung)', def: 'kW pro m³/s Volumenstrom (Orientierung für Effizienz).' },
        { term: 'WRG', def: 'Wärmerückgewinnung, z. B. Rotationswärmetauscher oder Plattenwärmetauscher.' },
        { term: 'Zonen', def: 'Druckstufenkonzept: rein → weniger rein (Überdruck, Schleusen).' }
      ]} />
      <Checklist items={[
        { id: 'chk1', label: 'Filterzustände regelmäßig prüfen (Druckdifferenz)' },
        { id: 'chk2', label: 'Leckagen im Kanalnetz suchen' },
        { id: 'chk3', label: 'Bedarfsgeführte Regelung aktivieren/testen' }
      ]} />
      <div className="p-4 border rounded-xl">
        <h3 className="font-semibold mb-1">Kurz-Case</h3>
        <p>WRG-Nachrüstung: CAPEX 50.000 €, jährliche Einsparung 12.000 € → <ROI capex={50000} savingsPerYear={12000} /></p>
      </div>
      <div className="p-4 border rounded-xl">
        <h3 className="font-semibold">Abschluss</h3>
        <p>Abschluss-Quiz folgt in vollwertiger App; hier exemplarisch.</p>
        <button className="mt-2 px-3 py-1 rounded bg-emerald-600 text-white" onClick={()=>{
          updateLesson(id, l => { if (!l.completedBlocks.includes('quiz_done')) l.completedBlocks.push('quiz_done') })
        }}>Quiz als bestanden markieren</button>
      </div>
    </div>
  )
}
