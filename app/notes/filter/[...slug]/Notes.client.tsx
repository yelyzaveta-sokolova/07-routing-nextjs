'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'

import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'

import type { Note } from '@/types/note'

type NotesResponse = {
  notes: Note[]
  totalPages: number
}

type Props = {
  tag?: string
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)

    return () => clearTimeout(t)
  }, [search])

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag,
      }),
  })

  if (isLoading) return <p>Loading...</p>
  if (isError || !data) return <p>Something went wrong</p>

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Add note
      </button>

      <SearchBox value={search} onChange={setSearch} />

      {data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isOpen && (
        <Modal>
          <NoteForm close={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  )
}
