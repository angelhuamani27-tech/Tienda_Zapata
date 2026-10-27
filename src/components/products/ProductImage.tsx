'use client'
import { useState } from 'react'

export default function ProductImage({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false)
  return <div className="product-image">{failed || !src ? <span role="img" aria-label={`Imagen de ${name} no disponible`}>Imagen no disponible</span> : <img src={src} alt={name} onError={() => setFailed(true)} />}</div>
}
