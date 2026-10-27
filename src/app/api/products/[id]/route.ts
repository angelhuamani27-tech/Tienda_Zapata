import { NextResponse } from 'next/server'
import { adminStorageClient, isAdmin } from '../../../../lib/supabase/server'

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Sesión vencida o acceso no autorizado.' }, { status: 401 })
  const db = adminStorageClient()
  if (!db) return NextResponse.json({ error: 'Falta configurar el almacenamiento.' }, { status: 503 })
  const { data: product, error: lookupError } = await db.from('products').select('image_path').eq('id', params.id).maybeSingle()
  if (lookupError) return NextResponse.json({ error: 'No se pudo consultar el producto.' }, { status: 503 })
  if (!product) return NextResponse.json({ error: 'El producto ya no existe.' }, { status: 404 })
  const { error } = await db.from('products').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: 'No se pudo eliminar el producto. Inténtalo de nuevo.' }, { status: 503 })
  let imagePath: string | undefined
  try { imagePath = new URL(product.image_path).pathname.split('/').pop() } catch { /* Product deletion succeeded; no image path to clean up. */ }
  if (imagePath) await db.storage.from('product-images').remove([imagePath])
  return NextResponse.json({ ok: true })
}
