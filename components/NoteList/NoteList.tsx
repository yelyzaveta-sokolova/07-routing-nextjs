type Note = {
  id: string
  title: string
}

type Props = {
  notes: Note[]
}

export default function NoteList({ notes }: Props) {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  )
}
