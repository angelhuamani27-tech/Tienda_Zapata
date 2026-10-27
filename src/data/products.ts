/** Replace these reference images with confirmed product data before selling. */
export const MAX_PRODUCTS = 30

export type Product = {
  id: string
  name: string
  description: string
  price?: number
  image: string
  isReference?: boolean
  material?: string
  sizes?: string[]
}

const referenceNames = [
  'Zapatillas urbanas blancas', 'Zapatillas deportivas negras', 'Zapatillas running gris y rosa',
  'Zapatillas altas rojo y negro', 'Zapatillas clásicas blancas', 'Deportivas azul marino',
  'Zapatillas con suela caramelo', 'Zapatillas blancas y beige', 'Deportivas azul oscuro',
  'Zapatillas running rosadas', 'Zapatillas de lona negras', 'Zapatillas casuales grises',
  'Zapatillas deportivas beige', 'Zapatos formales negros', 'Zapatillas blancas con verde',
  'Zapatillas voluminosas negras', 'Zapatillas casuales marrones', 'Zapatillas running blancas y azules',
  'Zapatillas de lona caña alta', 'Zapatillas sin cordones negras', 'Zapatillas infantiles rosadas',
  'Zapatillas blancas con gris', 'Sin cordones, suela blanca',
  'Botines color miel', 'Zapatos casuales marrones', 'Zapatillas blancas con rojo',
  'Zapatillas de colores pastel', 'Deportivas negro y rojo',
  'Zapatillas infantiles blancas', 'Trekking negro y naranja',
]

export const products: Product[] = referenceNames.map((name, index) => {
  const id = `modelo-${String(index + 1).padStart(2, '0')}`
  return {
    id, name,
    description: 'Imagen referencial. Precio y características por confirmar.',
    image: `/images/products/${id}.jpg`,
    isReference: true,
  }
})

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
    if (item.price === undefined && !item.isReference) throw new Error(`Precio no confirmado: ${item.id}`)
    if (item.price !== undefined && (!Number.isFinite(item.price) || item.price <= 0 || Math.abs(Math.round(item.price * 100) - item.price * 100) > 0.000001)) {
      throw new Error(`Precio inválido: ${item.id}`)
    }
    if (!new RegExp(`^/images/products/${item.id}\\.(jpg|jpeg|png|webp)$`, 'i').test(item.image)) {
      throw new Error(`Ruta de foto inválida: ${item.id}`)
    }
  }
}

validateProducts(products)
export const getProduct = (id: string) => products.find(product => product.id === id)
