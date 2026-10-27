import { redirect } from 'next/navigation'
import { isAdmin } from '../../lib/supabase/server'
import { getProducts } from '../../lib/products/read'
import ProductManager from '../../components/admin/ProductManager'
import type { Product } from '../../types/domain'

export default async function Admin() {
  if (!await isAdmin()) redirect('/admin/login')
  let products: Product[]
  try { products = await getProducts() }
  catch { return <main className="shell"><h1>No se pudo cargar el catálogo</h1><p>Inténtalo de nuevo más tarde.</p></main> }
  return <main className="shell"><header className="topbar"><a className="brand" href="/">Tienda Zapata</a><form action="/api/admin/logout" method="post"><button className="admin-link" type="submit">Cerrar sesión</button></form></header><section className="admin-head"><p className="kicker">Panel privado</p><h1>Gestiona tu catálogo.</h1><p className="lead">Agrega productos con sus datos completos o elimínalos definitivamente.</p></section><ProductManager products={products}/></main>
}
