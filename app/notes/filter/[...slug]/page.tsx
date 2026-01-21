import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'

type Props = {
  params: Promise<{ slug: string[] }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const tag = slug[0] === 'all' ? undefined : slug[0]

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  )
}
