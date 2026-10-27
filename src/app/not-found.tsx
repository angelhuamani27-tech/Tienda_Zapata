import Link from 'next/link'

export default function NotFound() {
  return <main className="shell"><header className="topbar"><Link className="brand" href="/">Tienda Zapata</Link></header><div className="empty"><h1>Producto no disponible</h1><p>El producto ya no existe o fue eliminado.</p><Link href="/">Volver al catálogo</Link></div></main>
}
