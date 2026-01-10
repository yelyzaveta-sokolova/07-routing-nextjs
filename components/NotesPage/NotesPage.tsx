'use client'

import { useState } from 'react'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import NoteList from '../NoteList/NoteList'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'

export default function NotesPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const mockNotes = [
    { id: '1', title: 'First note' },
    { id: '2', title: 'Second note' },
  ]

  return (
    <section>
      <SearchBox value={search} onChange={setSearch} />

      <button onClick={() => setIsOpen(true)}>Add note</button>

      <NoteList notes={mockNotes} />

      <Pagination page={page} totalPages={5} onPageChange={setPage} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm />
      </Modal>
    </section>
  )
}
