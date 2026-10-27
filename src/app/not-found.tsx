import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'

export default function NotFound() {
  return <main>
    <SiteHeader />
    <section className="not-found shell">
      <h1>Ese producto no está disponible.</h1>
      <p>Puede que el enlace haya cambiado. Vuelve al catálogo para ver los modelos publicados.</p>
      <Link className="button" href="/#catalogo">Volver al catálogo <span aria-hidden="true">↗</span></Link>
    </section>
  </main>
}
