'use client'
import { useState } from 'react'

export default function ProductImage({ src, name, loading = 'lazy' }: { src: string; name: string; loading?: 'eager' | 'lazy' }) {
  const [failed, setFailed] = useState(false)
  return <div className="product-image">{failed || !src ? <span role="img" aria-label={`Imagen de ${name} no disponible`}>Imagen no disponible</span> : <img src={src} alt={name} loading={loading} decoding="async" onError={() => setFailed(true)} />}</div>
}
