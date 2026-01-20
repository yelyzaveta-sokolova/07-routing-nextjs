import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
type Tag = (typeof TAGS)[number]

type Props = {
  params: {
    slug?: string[]
  }
}

export default async function NotesByCategory({ params }: Props) {
  const rawTag = params.slug?.[0]

  const tag =
    rawTag === 'all' || !rawTag
      ? undefined
      : (TAGS.includes(rawTag as Tag) ? rawTag : undefined)

  const data = await fetchNotes({ tag })

  return (
    <NotesClient
      notes={data.notes}
      title={tag ? `Notes: ${tag}` : 'All notes'}
    />
  )
}
