'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes, NotesResponse } from '@/lib/api'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import SearchBox from '../SearchBox/SearchBox'

export default function NotesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: (prev) => prev,
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1) 
  }

  if (isLoading && !data) {
    return <p>Loading...</p>
  }

  if (error || !data) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />

      <NoteList notes={data.notes} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </>
  )
}
