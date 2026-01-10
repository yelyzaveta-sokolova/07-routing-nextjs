'use client'

export default function NoteForm() {
  return (
    <form>
      <input type="text" placeholder="Title" />
      <textarea placeholder="Content" />
      <button type="submit">Save</button>
    </form>
  )
}
