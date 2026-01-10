'use client'

import { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null

  return (
    <div>
      <div onClick={onClose} />
      <div>
        <button onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  )
}
