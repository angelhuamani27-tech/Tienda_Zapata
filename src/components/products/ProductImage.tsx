'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  name: string
  loading?: 'eager' | 'lazy'
  sizes?: string
}

export default function ProductImage({ src, name, loading = 'lazy', sizes = '(max-width: 600px) 100vw, (max-width: 1050px) 50vw, 33vw' }: Props) {
  const [failed, setFailed] = useState(false)

  return <div className="product-image">
    {failed ? <span role="img" aria-label={`Foto de ${name} no disponible`}>Foto no disponible</span> :
      <Image src={src} alt={name} fill sizes={sizes} loading={loading} quality={80} onError={() => setFailed(true)} />}
  </div>
}
