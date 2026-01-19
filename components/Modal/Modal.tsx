'use client'

import { useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default function Modal({ children }: Props) {
  const router = useRouter()

  return (
    <div className="backdrop" onClick={() => router.back()}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  )
}
