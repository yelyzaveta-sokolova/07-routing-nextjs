import axios from 'axios'
import type { Note } from '@/types/note'

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})


export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export interface FetchNotesParams {
  page?: number
  search?: string
  tag?: string
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<NotesResponse> => {
  const { page, search, tag } = params

  const queryParams: Record<string, string | number> = {}

  if (page) queryParams.page = page
  if (search) queryParams.search = search

  if (tag && tag !== 'all') {
    queryParams.tag = tag
  }

  const { data } = await api.get<NotesResponse>('/notes', {
    params: queryParams,
  })

  return data
}

export const getNotes = fetchNotes


export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}


export const getNoteById = fetchNoteById


export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note)
  return data
}

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`)
}
