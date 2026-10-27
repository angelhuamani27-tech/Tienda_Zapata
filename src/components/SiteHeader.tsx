import Link from 'next/link'

export default function SiteHeader() {
  return <header className="site-header shell">
    <Link className="site-name" href="/" aria-label="Ir al inicio">Catálogo<span aria-hidden="true">.</span></Link>
    <nav aria-label="Navegación principal">
      <Link href="/#catalogo">Modelos</Link>
      <Link href="/#como-pedir">Cómo pedir</Link>
    </nav>
  </header>
}
