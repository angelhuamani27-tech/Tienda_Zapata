'use client'

import { useState } from 'react'
import type { Product } from '../../data/products'
import { useCart } from './CartProvider'

export default function AddToCartButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  return <button className={compact ? 'add-cart-link' : 'button add-cart-button'} type="button" onClick={() => {
    add(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }} aria-label={`Agregar ${product.name} al carrito`}>
    {added ? 'Añadido al carrito ✓' : 'Agregar al carrito'}
  </button>
}
