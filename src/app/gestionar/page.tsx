'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import { useCatalogue } from '../../components/catalogue/CatalogueProvider'

export default function ManagePage() {
  const { products, ready, error: storageError, addProduct, removeProduct } = useCatalogue()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const file = data.get('image')
    if (!(file instanceof File) || file.size === 0) { setError('Selecciona una imagen.'); return }
    setBusy(true); setError(''); setMessage('')
    try {
      await addProduct({
        name: String(data.get('name') || ''),
        description: String(data.get('description') || ''),
        price: Number(String(data.get('price') || '').replace(',', '.')),
        file,
      })
      form.reset()
      setMessage('Producto agregado a este navegador. Ya aparece en el catálogo.')
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo agregar el producto.') }
    finally { setBusy(false) }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`¿Quitar definitivamente «${name}» del catálogo de este navegador?`)) return
    setBusy(true); setError(''); setMessage('')
    try { await removeProduct(id); setMessage('Producto quitado del catálogo de este navegador.') }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo quitar el producto.') }
    finally { setBusy(false) }
  }

  return <main>
    <SiteHeader />
    <section className="shell manage-page" aria-labelledby="manage-title">
      <Link className="back-link" href="/#catalogo">← Volver al catálogo</Link>
      <div className="manage-heading">
        <h1 id="manage-title">Organiza tu catálogo</h1>
        <p>Agrega o quita productos sin crear una cuenta. Los cambios se guardan solo en este navegador; otros dispositivos siguen viendo su propio catálogo.</p>
      </div>
      {storageError && <p className="form-error" role="alert">{storageError}</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p className="form-success" role="status">{message}</p>}
      <div className="manage-layout">
        <section className="manage-form-panel" aria-labelledby="add-title">
          <h2 id="add-title">Agregar producto</h2>
          <form onSubmit={handleAdd}>
            <label htmlFor="product-name">Nombre</label>
            <input id="product-name" name="name" type="text" maxLength={100} required placeholder="Ej. Zapatilla urbana azul" disabled={!ready || !!storageError || busy} />
            <label htmlFor="product-price">Precio en soles</label>
            <input id="product-price" name="price" type="number" min="0.01" max="999999" step="0.01" inputMode="decimal" required placeholder="129.00" disabled={!ready || !!storageError || busy} />
            <label htmlFor="product-description">Descripción</label>
            <textarea id="product-description" name="description" maxLength={1000} rows={4} required placeholder="Describe el modelo y sus detalles." disabled={!ready || !!storageError || busy} />
            <label htmlFor="product-image">Imagen</label>
            <input id="product-image" name="image" type="file" accept="image/jpeg,image/png,image/webp" required disabled={!ready || !!storageError || busy} />
            <p className="form-hint">JPG, PNG o WebP. Hasta 5 MB. La imagen también se guarda solo en este navegador.</p>
            <button className="button" type="submit" disabled={!ready || !!storageError || busy}>{busy ? 'Guardando…' : 'Agregar al catálogo'} <span aria-hidden="true">→</span></button>
          </form>
        </section>
        <section className="manage-list-panel" aria-labelledby="current-title">
          <div className="manage-list-heading"><h2 id="current-title">Productos actuales</h2><span>{products.length}</span></div>
          {!ready ? <p>Cargando productos guardados…</p> : products.length === 0 ? <p>No hay productos. Agrega el primero con el formulario.</p> :
            <div className="manage-list">{products.map(product => <article className="manage-row" key={product.id}>
              <img src={product.image} alt="" />
              <div><h3>{product.name}</h3><p>S/ {product.price.toFixed(2)}</p></div>
              <button type="button" onClick={() => handleDelete(product.id, product.name)} disabled={busy || !!storageError} aria-label={`Quitar ${product.name}`}>Quitar</button>
            </article>)}</div>}
        </section>
      </div>
    </section>
  </main>
}
