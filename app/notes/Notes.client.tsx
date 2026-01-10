'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import { Note } from '@/types/note'

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !data) return <p>Something went wrong.</p>

  return (
    <ul>
      {data.notes.map((note: Note) => (
        <li key={note.id}>
          <a href={`/notes/${note.id}`}>{note.title}</a>
        </li>
      ))}
    </ul>
  )
}
