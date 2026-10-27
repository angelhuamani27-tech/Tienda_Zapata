'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { MAX_PRODUCTS, products as initialProducts, type Product } from '../../data/products'
import { deleteLocalProduct, loadLocalCatalogue, prepareImage, saveHiddenProducts, saveLocalProduct } from '../../lib/local-catalogue'
import { useCart } from '../cart/CartProvider'

type NewProduct = { name: string; description: string; price: number; file: File }
type CatalogueValue = {
  products: Product[]
  ready: boolean
  error: string | null
  addProduct: (input: NewProduct) => Promise<void>
  removeProduct: (id: string) => Promise<void>
}

const CatalogueContext = createContext<CatalogueValue | null>(null)

export function CatalogueProvider({ children }: { children: ReactNode }) {
  const { remove: removeFromCart, updateImage, ready: cartReady } = useCart()
  const updateImageRef = useRef(updateImage)
  const [custom, setCustom] = useState<Product[]>([])
  const [hidden, setHidden] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { updateImageRef.current = updateImage }, [updateImage])

  useEffect(() => {
    if (!cartReady) return
    let cancelled = false
    loadLocalCatalogue().then(loaded => {
      if (cancelled) { loaded.custom.forEach(product => URL.revokeObjectURL(product.image)); return }
      setCustom(loaded.custom)
      setHidden(loaded.hidden)
      loaded.custom.forEach(product => updateImageRef.current(product.id, product.image))
      setReady(true)
    }).catch(() => { if (!cancelled) { setError('Este navegador no permitió abrir el almacenamiento local. No se podrán guardar cambios.'); setReady(true) } })
    return () => { cancelled = true }
  }, [cartReady])

  const products = useMemo(() => [...initialProducts.filter(product => !hidden.includes(product.id)), ...custom], [hidden, custom])

  const value = useMemo<CatalogueValue>(() => ({
    products, ready, error,
    async addProduct({ name, description, price, file }) {
      if (!ready || error) throw new Error(error || 'Espera a que cargue el catálogo.')
      const cleanName = name.trim()
      const cleanDescription = description.trim()
      if (!cleanName || cleanName.length > 100) throw new Error('El nombre debe tener entre 1 y 100 caracteres.')
      if (!cleanDescription || cleanDescription.length > 1000) throw new Error('La descripción debe tener entre 1 y 1000 caracteres.')
      if (!Number.isFinite(price) || price <= 0 || price > 999999 || Math.abs(Math.round(price * 100) - price * 100) > .000001) throw new Error('Ingresa un precio válido en soles.')
      if (products.length >= MAX_PRODUCTS) throw new Error(`El catálogo admite hasta ${MAX_PRODUCTS} modelos.`)
      const imageBlob = await prepareImage(file)
      const id = `personal-${crypto.randomUUID()}`
      const product: Product = { id, name: cleanName, description: cleanDescription, price, image: URL.createObjectURL(imageBlob) }
      try {
        await saveLocalProduct({ id, name: cleanName, description: cleanDescription, price, imageBlob })
        setCustom(current => [...current, product])
      } catch {
        URL.revokeObjectURL(product.image)
        throw new Error('No se pudo guardar el producto en este navegador. Revisa el espacio disponible.')
      }
    },
    async removeProduct(id) {
      if (!ready || error) throw new Error(error || 'Espera a que cargue el catálogo.')
      if (custom.some(product => product.id === id)) {
        try { await deleteLocalProduct(id) }
        catch { throw new Error('No se pudo quitar el producto de este navegador.') }
        setCustom(current => {
          const removed = current.find(product => product.id === id)
          if (removed) URL.revokeObjectURL(removed.image)
          return current.filter(product => product.id !== id)
        })
      } else if (initialProducts.some(product => product.id === id)) {
        const next = [...hidden, id]
        try { await saveHiddenProducts(next) }
        catch { throw new Error('No se pudo guardar el cambio en este navegador.') }
        setHidden(next)
      } else throw new Error('El producto ya no está en el catálogo.')
      removeFromCart(id)
    },
  }), [products, ready, error, custom, hidden, removeFromCart])

  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>
}

export function useCatalogue() {
  const value = useContext(CatalogueContext)
  if (!value) throw new Error('El catálogo no está disponible.')
  return value
}
