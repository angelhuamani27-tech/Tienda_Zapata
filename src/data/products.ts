/** Add one entry per real product after its photo has been prepared. */
export const MAX_PRODUCTS = 30

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  material?: string
  sizes?: string[]
}

// The catalogue stays empty until the owner supplies real photos and details.
export const products: Product[] = []

export function validateProducts(items: readonly Product[]): void {
  if (items.length > MAX_PRODUCTS) throw new Error(`El catálogo admite hasta ${MAX_PRODUCTS} productos.`)

  const ids = new Set<string>()
  for (const item of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id)) {
      throw new Error(`Identificador inválido o repetido: ${item.id}`)
    }
    ids.add(item.id)
    if (!item.name.trim() || item.name.length > 100) throw new Error(`Nombre inválido: ${item.id}`)
    if (!item.description.trim() || item.description.length > 1000) throw new Error(`Descripción inválida: ${item.id}`)
    if (!Number.isFinite(item.price) || item.price <= 0 || Math.abs(Math.round(item.price * 100) - item.price * 100) > 0.000001) {
      throw new Error(`Precio inválido: ${item.id}`)
    }
    if (!new RegExp(`^/images/products/${item.id}\\.(jpg|jpeg|png|webp)$`, 'i').test(item.image)) {
      throw new Error(`Ruta de foto inválida: ${item.id}`)
    }
  }
}

validateProducts(products)
export const getProduct = (id: string) => products.find(product => product.id === id)
