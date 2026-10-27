/** Academic demo: names, prices and descriptions below are examples. */
export const MAX_PRODUCTS = 200

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  isReference?: boolean
  material?: string
  sizes?: string[]
}

const demoModels: ReadonlyArray<readonly [name: string, price: number, description: string]> = [
  ['Urbana blanca', 129, 'Líneas limpias y acabado blanco para un estilo casual de todos los días.'],
  ['Deportiva negra', 149, 'Diseño oscuro con detalles claros y una silueta dinámica.'],
  ['Running gris y rosa', 159, 'Tonos grises con acentos rosados para un look deportivo suave.'],
  ['Caña alta rojo y negro', 189, 'Contraste de rojo, negro y blanco en una silueta de caña alta.'],
  ['Clásica blanca', 139, 'Volumen discreto y acabado blanco de inspiración urbana.'],
  ['Deportiva azul marino', 169, 'Azul profundo y detalles naranjas que resaltan el perfil deportivo.'],
  ['Negra con suela caramelo', 145, 'Parte superior negra y suela color caramelo de aire casual.'],
  ['Blanca y beige', 155, 'Paneles claros en blanco y beige para combinar con facilidad.'],
  ['Deportiva azul oscuro', 165, 'Silueta deportiva azul oscuro con base blanca.'],
  ['Running rosada', 159, 'Un diseño de tonos rosados con textura visual ligera.'],
  ['Lona negra', 119, 'Perfil bajo en negro y blanco, un clásico del estilo urbano.'],
  ['Casual gris', 139, 'Capas en gris y blanco para un conjunto relajado.'],
  ['Deportiva beige', 159, 'Tonos arena y líneas suaves en una silueta deportiva.'],
  ['Formal negro', 199, 'Zapato de vestir negro con acabado liso y líneas sobrias.'],
  ['Blanca con verde', 145, 'Base blanca con acentos verdes para un toque de color.'],
  ['Voluminosa negra', 179, 'Silueta marcada y monocromática para un estilo más audaz.'],
  ['Casual marrón', 159, 'Tonos cálidos y base clara en un diseño informal.'],
  ['Running blanca y azul', 169, 'Blanco luminoso con detalles azules de inspiración deportiva.'],
  ['Lona de caña alta', 129, 'Caña alta negra con cordones blancos y puntera clara.'],
  ['Sin cordones negra', 139, 'Diseño negro de líneas simples y perfil compacto.'],
  ['Infantil rosada', 99, 'Combinación de blanco y rosa con cierre visual de tiras.'],
  ['Blanca con gris', 145, 'Capas en blanco y gris para un acabado discreto.'],
  ['Sin cordones bicolor', 139, 'Parte superior negra y base blanca en un diseño minimalista.'],
  ['Botín color miel', 219, 'Caña media en tono miel y detalles oscuros de inspiración outdoor.'],
  ['Casual marrón oscuro', 189, 'Zapato marrón de perfil clásico con base contrastante.'],
  ['Blanca con rojo', 149, 'Contraste en blanco, rojo y negro de carácter deportivo.'],
  ['Multicolor pastel', 159, 'Mezcla de tonos pastel para un estilo alegre y casual.'],
  ['Deportiva negro y rojo', 169, 'Negro intenso con acentos rojos y una base clara.'],
  ['Infantil blanca y celeste', 99, 'Diseño claro con detalles celestes y cierre visual de tiras.'],
  ['Trekking negro y naranja', 229, 'Silueta robusta en negro y gris con acentos naranjas.'],
]

export const products: Product[] = demoModels.map(([name, price, description], index) => {
  const id = `modelo-${String(index + 1).padStart(2, '0')}`
  return {
    id, name, price, description,
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
