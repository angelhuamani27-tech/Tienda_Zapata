'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../../data/products'

export type CartItem = { id: string; name: string; price: number; image: string; quantity: number }
type CartContextValue = {
  items: CartItem[]
  ready: boolean
  storageError: boolean
  count: number
  total: number
  add: (product: Product) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  updateImage: (id: string, image: string) => void
  clear: () => void
}

const STORAGE_KEY = 'catalogo-whatsapp-cart-v1'
const CartContext = createContext<CartContextValue | null>(null)

function validItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is CartItem =>
    typeof item?.id === 'string' && /^[a-z0-9-]{1,80}$/.test(item.id) &&
    typeof item.name === 'string' && item.name.length > 0 && item.name.length <= 100 &&
    typeof item.price === 'number' && Number.isFinite(item.price) && item.price > 0 &&
    typeof item.image === 'string' && item.image.length < 1000000 &&
    Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99,
  ).slice(0, 100)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try { setItems(validItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))) } catch { setItems([]) }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); setStorageError(false) } catch { setStorageError(true) }
  }, [items, ready])

  const value = useMemo<CartContextValue>(() => ({
    items, ready, storageError,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    add(product) {
      setItems(current => {
        const existing = current.find(item => item.id === product.id)
        if (existing) return current.map(item => item.id === product.id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item)
        if (current.length >= 100) return current
        return [...current, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }]
      })
    },
    setQuantity(id, quantity) { setItems(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(1, Math.min(99, Math.trunc(quantity) || 1)) } : item)) },
    remove(id) { setItems(current => current.filter(item => item.id !== id)) },
    updateImage(id, image) { setItems(current => current.map(item => item.id === id ? { ...item, image } : item)) },
    clear() { setItems([]) },
  }), [items, ready, storageError])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('El carrito no está disponible.')
  return value
}
