import React, { useMemo, useState } from 'react'
import Avatar from '@/features/avatar/Avatar'
import { Item, score } from '@/features/quiz/engine'
import ahu from './assets/ahuschema.svg'
import wrg from './assets/wrg_anim.svg'
import { Link } from 'react-router-dom'

// kleine Hilfskomponenten
const Card: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <section className="rounded-2xl border p-5 mb-6 bg-white/70 dark:bg-slate-800/50">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </section>
)

export default function Lesson() {
  // ---------- 1) Avatar Mini-Lektion (TTS) ----------
    const miniScript = `Willkommen zur Grundlagenlektion über Lüftungsanlagen in der Lebensmittel- und Getränkeindustrie.
In diesen Bereichen entscheidet die Luftqualität direkt über Produktsicherheit und Hygiene. Damit keine Partikel, Aerosole oder Gerüche von weniger reinen in reinere Zonen gelangen, arbeiten wir mit Druckkaskaden: Flure haben den niedrigsten Druck, Produktionsräume liegen leicht darüber und besonders schützenswerte Bereiche, wie Abfüll- oder Abpackzonen, stehen im leichten Überdruck. So strömt Luft kontrolliert in Richtung der reineren Zone.

Die Zuluft wird in mehreren Stufen gefiltert – je nach Anforderung bis zu ISO ePM1 oder HEPA –, konditioniert und über die Anlage verteilt. Eine Wärmerückgewinnung überträgt die in der Abluft enthaltene Wärme auf die Zuluft und senkt dadurch den Heiz- bzw. Kühlbedarf deutlich. Gleichzeitig achten wir auf einen bedarfsgerechten Betrieb: Sensoren für CO₂, Temperatur und Feuchte sowie Anwesenheitssignale steuern die Volumenströme dynamisch. Das spart Ventilatorleistung und Energie, ohne die Luftqualität zu gefährden.

Behalten Sie im Hinterkopf: Effizienz entsteht durch die Kombination aus guter Auslegung, sauberem Betrieb und kontinuierlichem Monitoring. Nach diesem kurzen Überblick prüfen wir die Kernpunkte mit drei Kontrollfragen und zeigen anschließend ein vereinfachtes Schema der Lüftungszentrale sowie eine kleine Animation zur Wärmerückgewinnung.`

  // ---------- 2) Kontrollfragen (themenspezifisch) ----------
  type CtrlAns = { a?: number; b?: boolean; c?: number }
  const [ctrl, setCtrl] = useState<CtrlAns>({})
  const ctrlCorrect = { a: 0, b: true, c: 2 } // richtige Antworten

  const ctrlScore =
    (Number(ctrl.a === ctrlCorrect.a) +
      Number(ctrl.b === ctrlCorrect.b) +
      Number(ctrl.c === ctrlCorrect.c)) / 3

  // ---------- 3) Abschluss-Quiz ----------
  const items: Item[] = useMemo(
    () => [
      {
        id: 'q1',
        type: 'MC',
        prompt:
          'Hauptziel einer Lüftungsanlage im F&B-Kontext ist …',
        choices: [
          'Hygiene-/Produktschutz & Mitarbeitersicherheit bei minimalem Energieeinsatz',
          'Möglichst niedrige Erstinvestition',
          'Ausschließlich Wärmerückgewinnung'
        ],
        answer: 0
      },
      {
        id: 'q2',
        type: 'Decision',
        prompt:
          'In reinen Abfüllbereichen wird i. d. R. ein leichter Überdruck gegenüber Fluren eingestellt.',
        correct: true
      },
      {
        id: 'q3',
        type: 'MC',
        prompt: 'Welches Bauteil entfernt Grob- bis Feinstaub aus der Zuluft?',
        choices: ['Tropfenabscheider', 'Filterstufen (z. B. ISO ePM1 / HEPA)', 'Befeuchter'],
        answer: 1
      },
      {
        id: 'q4',
        type: 'MC',
        prompt:
          'Welche Betriebsstrategie senkt typischerweise den Energieverbrauch am meisten?',
        choices: [
          'Konstante Volumenströme (CAV) bei fixem Soll',
          'Bedarfsgeführte Volumenströme (VAV) mit Nachtabsenkung',
          'Dauerhafte Frischluft 100 %'
        ],
        answer: 1
      },
      {
        id: 'q5',
        type: 'Decision',
        prompt:
          'Eine WRG mit 70–80 % Temperaturwirkungsgrad ist in F&B-Neuanlagen realistisch.',
        correct: true
      },
      {
        id: 'q6',
        type: 'MC',
        prompt:
          'Typische Druckkaskade in hygienischen Bereichen?',
        choices: [
          'Hochreinraum < Produktionsraum < Flur',
          'Flur < Produktionsraum < Hochreinraum (Überdruck zu „reineren“ Zonen)',
          'Alle Zonen gleicher Druck'
        ],
        answer: 1
      },
      {
        id: 'q7',
        type: 'MC',
        prompt: 'Welche Norm adressiert Energiemanagementsysteme?',
        choices: ['ISO 14001', 'ISO 50001', 'EN 16798-3'],
        answer: 1
      },
      {
        id: 'q8',
        type: 'MC',
        prompt:
          'ROI-Rechnung: Invest 10 000 €, Einsparung 12 000 kWh/a bei 0,20 €/kWh. ROI = ?',
        choices: ['≈ 2,1 Jahre', '≈ 4,2 Jahre', '≈ 6,0 Jahre'],
        answer: 1
      }
    ],
    []
  )

  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [submitted, setSubmitted] = useState(false)
  const quizScore = submitted ? score(items, answers) : 0

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Lektionen: Lüftungsanlagen – Grundlagen</h1>
        <Link to="/" className="underline">Zur Übersicht</Link>
      </header>

      {/* 1) Avatar Mini-Lektion */}
      <Card title="Avatar-Mini-Lektion (2–3 Min.)">
        <Avatar script={miniScript} />
      </Card>

      {/* 2) Kontrollfragen direkt nach der Mini-Lektion */}
      <Card title="Kontrollfragen (Sofort-Feedback)">
        <div className="space-y-4">
          {/* MC */}
          <div>
            <div className="font-medium mb-2">
              1) Was ist das primäre Ziel von Lüftungsanlagen in F&B?
            </div>
            {[
              'Hygiene & Mitarbeiterschutz bei minimalem Energieeinsatz',
              'Nur Geräuschreduzierung',
              'Nur Wärmerückgewinnung'
            ].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="ctrl-a"
                  checked={ctrl.a === i}
                  onChange={() => setCtrl(c => ({ ...c, a: i }))}
                />
                <span>{opt}</span>
              </label>
            ))}
            {ctrl.a !== undefined && (
              <p
                className={
                  'mt-1 text-sm ' +
                  (ctrl.a === ctrlCorrect.a ? 'text-emerald-700' : 'text-rose-700')
                }
                aria-live="polite"
              >
                {ctrl.a === ctrlCorrect.a ? 'Richtig.' : 'Nicht ganz: Fokus ist Hygiene/Schutz + Effizienz.'}
              </p>
            )}
          </div>

          {/* Decision */}
          <div>
            <div className="font-medium mb-2">
              2) Aussage: Reinere Zonen (z. B. Abfüllung) werden im Überdruck zu benachbarten Zonen gefahren.
            </div>
            <div className="space-x-2">
              <button
                className="px-3 py-1 rounded-lg bg-slate-200"
                onClick={() => setCtrl(c => ({ ...c, b: true }))}
              >
                Richtig
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-slate-200"
                onClick={() => setCtrl(c => ({ ...c, b: false }))}
              >
                Falsch
              </button>
            </div>
            {ctrl.b !== undefined && (
              <p
                className={
                  'mt-1 text-sm ' +
                  (ctrl.b === ctrlCorrect.b ? 'text-emerald-700' : 'text-rose-700')
                }
                aria-live="polite"
              >
                {ctrl.b === ctrlCorrect.b
                  ? 'Korrekt – damit strömt Luft in „reinere“ Bereiche.'
                  : 'Nicht korrekt – in der Regel herrscht leichter Überdruck in reinen Zonen.'}
              </p>
            )}
          </div>

          {/* MC themenspezifisch (Druckverluste) */}
          <div>
            <div className="font-medium mb-2">
              3) Welche Größe steigt bei zugesetzten Filtern typischerweise zuerst?
            </div>
            {['Luftfeuchte', 'Temperatur', 'Druckverlust über dem Filter'].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="ctrl-c"
                  checked={ctrl.c === i}
                  onChange={() => setCtrl(c => ({ ...c, c: i }))}
                />
                <span>{opt}</span>
              </label>
            ))}
            {ctrl.c !== undefined && (
              <p
                className={
                  'mt-1 text-sm ' +
                  (ctrl.c === ctrlCorrect.c ? 'text-emerald-700' : 'text-rose-700')
                }
                aria-live="polite"
              >
                {ctrl.c === ctrlCorrect.c
                  ? 'Richtig – der Druckverlust steigt, daher steigt auch die Ventilatorleistung.'
                  : 'Tipp: Schau auf den Differenzdruck am Filter.'}
              </p>
            )}
          </div>

          <div className="pt-2 text-sm">
            <strong>Score (Kontrollfragen):</strong> {(ctrlScore * 100).toFixed(0)} %
          </div>
        </div>
      </Card>

      {/* 3) Diagramme/Medien */}
      <Card title="Lüftungszentrale – vereinfachtes Schema">
        <figure className="flex flex-col items-center">
          <img src={ahu} alt="Vereinfachtes AHU-Schema: Außenluft → Filter → WRG → Heizen → Kühlen → Zuluft" className="max-w-full rounded-lg border" />
          <figcaption className="text-sm mt-2 text-slate-600">
            Außenluft → Filter → Wärmerückgewinnung → Heizen → Kühlen → Zuluft
          </figcaption>
        </figure>
        <div className="mt-4">
          <h4 className="font-medium mb-2">WRG – animierte Veranschaulichung</h4>
          <img src={wrg} alt="Animation des Wärmeübertrags in der WRG" className="max-w-full rounded border" />
        </div>
      </Card>

      {/* 4) Abschluss-Quiz (vollständig) */}
      <Card title="Abschluss-Quiz">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          {items.map((it) => (
            <div key={it.id} className="rounded-xl bg-slate-50 dark:bg-slate-900/30 p-4 border">
              <div className="font-medium mb-2">{it.prompt}</div>
              {it.type === 'MC' && 'choices' in it && (
                <div className="space-y-1">
                  {it.choices.map((c, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={it.id}
                        checked={answers[it.id] === idx}
                        onChange={() => setAnswers(a => ({ ...a, [it.id]: idx }))}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              )}
              {it.type === 'Decision' && (
                <div className="space-x-2">
                  <button
                    type="button"
                    className={'px-3 py-1 rounded-lg ' + (answers[it.id] === true ? 'bg-emerald-600 text-white' : 'bg-slate-200')}
                    onClick={() => setAnswers(a => ({ ...a, [it.id]: true }))}
                  >
                    Richtig
                  </button>
                  <button
                    type="button"
                    className={'px-3 py-1 rounded-lg ' + (answers[it.id] === false ? 'bg-emerald-600 text-white' : 'bg-slate-200')}
                    onClick={() => setAnswers(a => ({ ...a, [it.id]: false }))}
                  >
                    Falsch
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
          >
            Quiz auswerten
          </button>

          {submitted && (
            <div className="mt-3" aria-live="polite">
              <div>
                <strong>Ergebnis:</strong> {(quizScore * 100).toFixed(0)} %
                {quizScore >= 0.7 ? ' ✅ Bestanden' : ' ❌ Noch nicht bestanden'}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Hinweis: ROI immer in Jahren: <code>ROI = Invest / jährliche Einsparung</code>.
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}
