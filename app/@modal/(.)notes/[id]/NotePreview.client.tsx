'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'

export default function NotePreview() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  if (isLoading) return null
  if (isError || !data) return null

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <small>{new Date(data.createdAt).toLocaleDateString()}</small>
    </Modal>
  )
}
