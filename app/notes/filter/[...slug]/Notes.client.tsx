'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'

type Props = {
  tag?: string
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 500)
    return () => clearTimeout(t)
  }, [search])

  const { data } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
  })

  if (!data) return null

  return (
    <>
      <SearchBox value={search} onChange={setSearch} />
      <NoteList notes={data.notes} />
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </>
  )
}
