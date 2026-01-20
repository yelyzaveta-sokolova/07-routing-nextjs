'use client'

import { Note } from '@/types/note'
import NoteList from '@/components/NoteList/NoteList'

type Props = {
  notes: Note[]
  title: string
}

export default function NotesClient({ notes, title }: Props) {
  return (
    <section>
      <h1>{title}</h1>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found</p>
      )}
    </section>
  )
}
