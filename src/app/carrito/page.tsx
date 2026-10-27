'use client'

import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import { useCart } from '../../components/cart/CartProvider'
import { cartWhatsappHref } from '../../lib/whatsapp/link'

export default function CartPage() {
  const { items, count, total, ready, storageError, setQuantity, remove, clear } = useCart()

  return <main>
    <SiteHeader />
    <section className="shell cart-page" aria-labelledby="cart-title">
      <div className="cart-topline"><Link href="/#catalogo">← Seguir viendo modelos</Link></div>
      <h1 id="cart-title">Tu carrito</h1>
      {storageError && <p className="form-error" role="alert">El navegador no pudo guardar el carrito. Podrás usarlo en esta pestaña, pero quizá se pierda al cerrarla.</p>}
      {!ready ? <p>Cargando carrito…</p> : items.length === 0 ? <div className="cart-empty">
        <p>Aún no agregaste productos.</p>
        <Link className="button" href="/#catalogo">Ver modelos <span aria-hidden="true">→</span></Link>
      </div> : <>
        <p className="cart-intro">Revisa los {count} {count === 1 ? 'producto' : 'productos'} antes de abrir WhatsApp.</p>
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => <article className="cart-item" key={item.id}>
              <div className="cart-item-image"><img src={item.image} alt="" /></div>
              <div className="cart-item-main">
                <h2>{item.name}</h2>
                <p>S/ {item.price.toFixed(2)} por unidad</p>
                <div className="cart-item-actions">
                  <div className="quantity-control" aria-label={`Cantidad de ${item.name}`}>
                    <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Quitar una unidad de ${item.name}`} disabled={item.quantity <= 1}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Agregar una unidad de ${item.name}`} disabled={item.quantity >= 99}>+</button>
                  </div>
                  <button className="text-button" type="button" onClick={() => remove(item.id)}>Quitar</button>
                </div>
              </div>
              <strong className="cart-line-total">S/ {(item.price * item.quantity).toFixed(2)}</strong>
            </article>)}
          </div>
          <aside className="cart-summary" aria-label="Resumen del carrito">
            <h2>Resumen</h2>
            <p><span>{count} {count === 1 ? 'producto' : 'productos'}</span><strong>S/ {total.toFixed(2)}</strong></p>
            <a className="button" href={cartWhatsappHref(items)} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp <span aria-hidden="true">↗</span></a>
            <small>WhatsApp abrirá un mensaje preparado. Tú decides si lo envías.</small>
            <button className="text-button clear-cart" type="button" onClick={clear}>Vaciar carrito</button>
          </aside>
        </div>
      </>}
    </section>
  </main>
}
