import axios from 'axios'
import { NotesResponse, Note } from '@/types/note'

const api = axios.create({
  baseURL: 'https://notehub-api.goit.global',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})

export const fetchNotes = async (): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>('/notes')
  return data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}
