'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'

type Params = {
  id: string
}

export default function NotePreview() {
  const params = useParams<Params>()
  const router = useRouter()

  const id = params?.id

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  })

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    )
  }

  if (isError || !data) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Something went wrong</p>
        <button onClick={() => router.back()}>Close</button>
      </Modal>
    )
  }

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: {data.tag}</p>
      <small>
        Created at:{' '}
        {new Date(data.createdAt).toLocaleDateString()}
      </small>

      <button onClick={() => router.back()}>
        Close
      </button>
    </Modal>
  )
}
