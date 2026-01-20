'use client'

type Props = {
  error: Error
  reset: () => void
}

export default function NotesFilterError({ error, reset }: Props) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>

      <button onClick={reset}>Try again</button>
    </div>
  )
}
