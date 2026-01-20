'use client'

import styles from './Modal.module.css'

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  )
}
