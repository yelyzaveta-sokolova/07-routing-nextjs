'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'

interface NoteFormProps {
  close: () => void
}

const schema = Yup.object({
  title: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
  tag: Yup.string().required('Required'),
})

export default function NoteForm({ close }: NoteFormProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      close()
    },
  })

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'general' }}
      validationSchema={schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" />

        <Field name="content" as="textarea" />
        <ErrorMessage name="content" />

        <Field name="tag" as="select">
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Field>

        <button type="submit">Create note</button>
        <button type="button" onClick={close}>Cancel</button>
      </Form>
    </Formik>
  )
}
