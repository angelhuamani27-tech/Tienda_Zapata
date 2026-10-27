import Link from 'next/link'
import { getProducts } from '../lib/products/read'
import { whatsappHref } from '../lib/whatsapp/link'

export default async function Home() {
  const products = await getProducts()
  return <main className="shell"><header className="topbar"><Link className="brand" href="/">Tienda Zapata</Link><Link className="admin-link" href="/admin/login">Administración</Link></header><section className="hero"><p className="kicker">Catálogo abierto</p><h1>Lo que buscas, directo a WhatsApp.</h1><p className="lead">Explora productos, revisa sus detalles y conversa con la tienda en un solo paso.</p></section><section aria-labelledby="catalogo"><div className="section-head"><h2 id="catalogo">Productos</h2><span>{products.length} disponibles</span></div>{products.length === 0 ? <div className="empty"><h3>El catálogo está vacío</h3><p>Pronto encontrarás productos para consultar.</p></div> : <div className="grid">{products.map((p) => <article className="product" key={p.id}><div className="product-image">{p.image_path ? <img src={p.image_path} alt={p.name} /> : <span>Imagen no disponible</span>}</div><div className="product-body"><h3>{p.name}</h3><p>{p.description}</p><strong>S/ {p.price.toFixed(2)}</strong><a className="button" href={whatsappHref(p.name)} target="_blank" rel="noreferrer">Pedir por WhatsApp</a></div></article>)}</div>}</section><footer>Consultas directas, sin cuentas ni carrito.</footer></main>
}
