'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'

export default function NotePreview() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) {
    return (
      <Modal>
        <p>Loading...</p>
      </Modal>
    )
  }

  if (isError || !data) {
    return (
      <Modal>
        <p>Something went wrong</p>
      </Modal>
    )
  }

  return (
    <Modal>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.tag}</p>
      <small>
        {new Date(data.createdAt).toLocaleDateString()}
      </small>
    </Modal>
  )
}
