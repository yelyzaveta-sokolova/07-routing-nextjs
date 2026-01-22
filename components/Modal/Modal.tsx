'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Modal.module.css'

type Props = {
  children: ReactNode
}

export default function Modal({ children }: Props) {
  const router = useRouter()

  return (
    <div className={styles.backdrop} onClick={() => router.back()}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles.close}
          onClick={() => router.back()}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}
