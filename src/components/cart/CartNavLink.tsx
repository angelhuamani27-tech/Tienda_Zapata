'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'

export default function CartNavLink() {
  const { count } = useCart()
  return <Link href="/carrito" aria-label={`Carrito, ${count} productos`}>Carrito{count > 0 ? ` (${count})` : ''}</Link>
}
