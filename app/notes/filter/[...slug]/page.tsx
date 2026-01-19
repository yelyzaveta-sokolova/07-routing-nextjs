import NotesList from '@/components/NoteList/NoteList'
import { fetchNotes } from '@/lib/api'

type Props = {
  params: Promise<{
    tag?: string[]
  }>
}

export default async function FilteredNotesPage({ params }: Props) {
  const resolvedParams = await params
  const tag = resolvedParams.tag?.[0] ?? 'all'

  const data = await fetchNotes({ tag })

  return <NotesList notes={data.notes} />
}