import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, products } from '../../../data/products'
import { whatsappHref } from '../../../lib/whatsapp/link'
import ProductImage from '../../../components/products/ProductImage'

export function generateStaticParams() { return products.map(product => ({ id: product.id })) }
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()
  return <main className="shell detail-page"><header className="topbar"><Link className="brand" href="/">zapata<span>.</span></Link><Link className="top-link" href="/#catalogo">Volver al catálogo ←</Link></header><article className="detail"><div className="detail-photo"><ProductImage src={product.image} name={product.name} /></div><div className="detail-copy"><Link className="text-link" href="/#catalogo">← Todos los modelos</Link><h1>{product.name}</h1><p>{product.description}</p><strong>S/ {product.price.toFixed(2)}</strong><a className="order-link detail-order" href={whatsappHref(product.name)} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp <span aria-hidden="true">↗</span></a><small>Se abrirá WhatsApp con un mensaje listo para enviar. Tú decides si lo envías.</small></div></article></main>
}
