type Props = {
  title: string
  content: string
}

export default function NoteDetails({ title, content }: Props) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  )
}
