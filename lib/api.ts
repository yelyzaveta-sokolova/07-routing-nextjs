import axios from 'axios'
import type { Note } from '@/types/note'

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})

/* ===================== TYPES ===================== */

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export interface FetchNotesParams {
  page?: number
  search?: string
  tag?: string
}

/* ===================== NOTES ===================== */

// основной метод получения заметок (с фильтрацией)
export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<NotesResponse> => {
  const { page, search, tag } = params

  const queryParams: Record<string, string | number> = {}

  if (page) queryParams.page = page
  if (search) queryParams.search = search

  // ⚠️ backend НЕ принимает tag=all
  if (tag && tag !== 'all') {
    queryParams.tag = tag
  }

  const { data } = await api.get<NotesResponse>('/notes', {
    params: queryParams,
  })

  return data
}

// 🔁 алиас для старых импортов (ВАЖНО)
export const getNotes = fetchNotes

/* ===================== SINGLE NOTE ===================== */

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

// 🔁 алиас для модального окна
export const getNoteById = fetchNoteById

/* ===================== MUTATIONS ===================== */

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note)
  return data
}

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`)
}
