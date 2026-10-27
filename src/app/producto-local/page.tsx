'use client'

import { useEffect, useState } from 'react'
import LocalProductDetail from '../../components/catalogue/LocalProductDetail'
import SiteHeader from '../../components/SiteHeader'

export default function LocalProductPage() {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    setId(new URLSearchParams(window.location.search).get('id') || '')
  }, [])

  if (id === null) return <main><SiteHeader /><section className="shell not-found"><p>Cargando producto…</p></section></main>
  return <LocalProductDetail id={id} />
}
