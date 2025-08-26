import React from 'react'

type Media = { title: string; path: string; captions?: string }

export function MediaPlayer({ images = [], videos = [], animations = [], audio = [] } : { images?: Media[], videos?: Media[], animations?: Media[], audio?: Media[] }){
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {images.map(m => <figure key={m.path}><img src={m.path} alt={m.title} className="rounded"/><figcaption className="text-sm">{m.title}</figcaption></figure>)}
      {videos.map(m => <figure key={m.path}><video controls className="rounded" src={m.path}>{m.captions && <track kind="captions" src={m.captions} />}</video><figcaption className="text-sm">{m.title}</figcaption></figure>)}
      {animations.map(m => <figure key={m.path}><img src={m.path} alt={m.title} className="rounded"/><figcaption className="text-sm">{m.title}</figcaption></figure>)}
      {audio.map(m => <figure key={m.path}><audio controls className="w-full" src={m.path}></audio><figcaption className="text-sm">{m.title}</figcaption></figure>)}
    </div>
  )
}
