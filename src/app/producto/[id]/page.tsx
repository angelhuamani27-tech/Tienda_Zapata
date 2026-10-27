import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct } from '../../../lib/products/read'
import { whatsappHref } from '../../../lib/whatsapp/link'
import ProductImage from '../../../components/products/ProductImage'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { id: string } }) {
  let product
  try { product = await getProduct(params.id) }
  catch { return <main className="shell"><Link href="/">Volver al catálogo</Link><h1>No se pudo cargar el producto</h1><p>Inténtalo de nuevo más tarde.</p></main> }
  if (!product) notFound()
  return <main className="shell"><header className="topbar"><Link className="brand" href="/">Tienda Zapata</Link><Link href="/">Volver al catálogo</Link></header><article className="detail"><ProductImage src={product.image_path} name={product.name}/><div><h1>{product.name}</h1><p>{product.description}</p><strong>S/ {Number(product.price).toFixed(2)}</strong><p><a className="button" href={whatsappHref(product.name)} target="_blank" rel="noreferrer">Pedir por WhatsApp</a></p></div></article></main>
}
