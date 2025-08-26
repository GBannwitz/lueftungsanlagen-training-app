export type MCItem = { id: string; type: 'MC'; prompt: string; choices: string[]; answer: number }
export type DDItem = { id: string; type: 'DragDrop'; prompt: string; options: string[]; correct: string[] }
export type DecisionItem = { id: string; type: 'Decision'; prompt: string; correct: boolean }
export type Item = MCItem | DDItem | DecisionItem

export function score(items: Item[], responses: Record<string, any>): number {
  let correct = 0
  for (const it of items) {
    const r = responses[it.id]
    if (!r) continue
    if (it.type === 'MC' && r === it.answer) correct++
    if (it.type === 'Decision' && r === it.correct) correct++
    if (it.type === 'DragDrop' && Array.isArray(r) && Array.isArray(it.correct) &&
        r.length === it.correct.length && r.every((v,i)=>v===it.correct[i])) correct++
  }
  return items.length ? correct / items.length : 0
}
