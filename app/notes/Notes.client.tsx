'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import SearchBox from '@/components/SearchBox/SearchBox'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'

export default function NotesClient() {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: (prev) => prev,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError || !data) return <p>Error loading notes</p>

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add note</button>

      <SearchBox value={search} onChange={setSearch} />

      <NoteList notes={data.notes} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm close={() => setIsOpen(false)} />
      </Modal>
    </>
  )
}
