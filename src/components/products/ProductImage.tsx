'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  name: string
  loading?: 'eager' | 'lazy'
  sizes?: string
  isReference?: boolean
}

export default function ProductImage({ src, name, loading = 'lazy', sizes = '(max-width: 600px) 100vw, (max-width: 1050px) 50vw, 33vw', isReference = false }: Props) {
  const [failed, setFailed] = useState(false)

  return <div className="product-image">
    {failed ? <span role="img" aria-label={`Imagen de ${name} no disponible`}>Imagen no disponible</span> :
      <Image src={src} alt={`${isReference ? 'Ilustración referencial de' : 'Foto de'} ${name}`} fill sizes={sizes} loading={loading} quality={80} unoptimized={src.startsWith('blob:')} onError={() => setFailed(true)} />}
  </div>
}
