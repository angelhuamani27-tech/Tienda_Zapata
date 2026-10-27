export type Product = { id: string; name: string; description: string; price: number; image: string }
export const products: Product[] = [
  { id: 'urbana-arena', name: 'Urbana Arena', description: 'Zapatilla de lona y gamuza para todos los días.', price: 189, image: '/images/urbana-arena.png' },
  { id: 'botin-cacao', name: 'Botín Cacao', description: 'Cuero de tono cálido y un paso firme.', price: 249, image: '/images/botin-cacao.png' },
  { id: 'clasica-blanca', name: 'Clásica Blanca', description: 'Líneas limpias que combinan con todo.', price: 199, image: '/images/clasica-blanca.png' },
  { id: 'sandalia-negra', name: 'Sandalia Negra', description: 'Ligera, sencilla y lista para salir.', price: 159, image: '/images/sandalia-negra.png' },
]
export const getProduct = (id: string) => products.find(product => product.id === id)
