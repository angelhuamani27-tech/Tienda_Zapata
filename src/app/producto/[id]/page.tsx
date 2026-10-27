import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '../../../components/SiteHeader'
import ProductImage from '../../../components/products/ProductImage'
import AddToCartButton from '../../../components/cart/AddToCartButton'
import ProductAvailability from '../../../components/catalogue/ProductAvailability'
import { getProduct, products } from '../../../data/products'
import { siteUrl } from '../../../lib/site-url'
import { whatsappHref } from '../../../lib/whatsapp/link'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return products.map(product => ({ id: product.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: 'Producto no disponible' }

  return {
    title: `${product.name} | Catálogo de calzado`,
    description: product.description,
    openGraph: siteUrl ? {
      title: product.name,
      description: product.description,
      images: [{ url: `${siteUrl}${product.image}`, alt: `${product.isReference ? 'Ilustración referencial de' : 'Foto de'} ${product.name}` }],
    } : undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  return <ProductAvailability id={id}><main>
    <SiteHeader />
    <article className="detail shell">
      <div className="detail-photo"><ProductImage src={product.image} name={product.name} isReference={product.isReference} loading="eager" sizes="(max-width: 720px) 100vw, 60vw" /></div>
      <div className="detail-info">
        <Link className="back-link" href="/#catalogo">← Volver a los modelos</Link>
        <h1>{product.name}</h1>
        <p className="detail-description">{product.description}</p>
        {product.material && <p className="detail-fact"><strong>Material</strong><span>{product.material}</span></p>}
        {product.sizes?.length ? <p className="detail-fact"><strong>Tallas</strong><span>{product.sizes.join(', ')}</span></p> : null}
        <p className="detail-price">S/ {product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
        <a className="button detail-button" href={whatsappHref(product.name, product.id)} target="_blank" rel="noopener noreferrer">
          Pedir este modelo por WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className="detail-note">WhatsApp abrirá un mensaje preparado. El envío lo haces tú.</p>
      </div>
    </article>
  </main></ProductAvailability>
}
