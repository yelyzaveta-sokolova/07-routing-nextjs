import { getNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'
import NotePreview from '@/components/NotePreview/NotePreview'

type Props = {
  params: { id: string }
}

export default async function NotePreviewModal({ params }: Props) {
  const note = await getNoteById(params.id)

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  )
}
