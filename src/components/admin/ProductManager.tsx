'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '../../types/domain'

export default function ProductManager({ products }: { products: Product[] }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/products', { method: 'POST', body: new FormData(form) })
      const result = await response.json()
      if (!response.ok) { setError(result.error); return }
      form.reset()
      router.refresh()
    } catch { setError('No se pudo conectar. Inténtalo de nuevo.') }
    finally { setBusy(false) }
  }

  async function remove(product: Product) {
    if (!window.confirm(`¿Eliminar definitivamente “${product.name}”?`)) return
    setBusy(true); setError('')
    try {
      const response = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      const result = await response.json()
      if (!response.ok) { setError(result.error); return }
      router.refresh()
    } catch { setError('No se pudo conectar. Inténtalo de nuevo.') }
    finally { setBusy(false) }
  }

  return <>
    <section className="admin-card"><h2>Agregar producto</h2><form onSubmit={add} className="form-grid"><label>Nombre<input name="name" minLength={1} maxLength={100} required /></label><label>Precio (S/)<input name="price" type="number" min="0.01" step="0.01" required /></label><label className="wide">Descripción<textarea name="description" minLength={1} maxLength={1000} required /></label><label className="wide">Imagen<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required /></label><button className="button" type="submit" disabled={busy}>Agregar producto</button></form></section>
    {error && <p className="error" role="alert">{error}</p>}
    <section><div className="section-head"><h2>Productos publicados</h2><span>{products.length}</span></div><div className="admin-list">{products.map(product => <div className="admin-row" key={product.id}><div><strong>{product.name}</strong><span>S/ {Number(product.price).toFixed(2)}</span></div><button className="delete" disabled={busy} onClick={() => remove(product)}>Eliminar</button></div>)}</div></section>
  </>
}
