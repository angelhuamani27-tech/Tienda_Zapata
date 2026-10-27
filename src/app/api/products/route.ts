import { NextResponse } from 'next/server'
import { imageMatchesType, imageSchema, productSchema } from '../../../lib/validation/product'
import { adminStorageClient, isAdmin } from '../../../lib/supabase/server'

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Sesión vencida o acceso no autorizado.' }, { status: 401 })
  const db = adminStorageClient()
  if (!db) return NextResponse.json({ error: 'Falta configurar el almacenamiento.' }, { status: 503 })
  const form = await request.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: 'Formulario inválido.' }, { status: 400 })
  const parsed = productSchema.safeParse({ name: form.get('name'), description: form.get('description'), price: form.get('price') })
  const file = form.get('image')
  if (!parsed.success || !(file instanceof File) || !imageSchema.safeParse({ type: file.type, size: file.size }).success)
    return NextResponse.json({ error: 'Revisa los datos. La imagen debe ser JPG, PNG o WebP y pesar máximo 5 MB.' }, { status: 400 })
  if (!await imageMatchesType(file)) return NextResponse.json({ error: 'El archivo no es una imagen válida.' }, { status: 400 })
  const id = crypto.randomUUID()
  const extension = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp'
  const imagePath = `${id}.${extension}`
  const uploaded = await db.storage.from('product-images').upload(imagePath, file, { contentType: file.type, upsert: false })
  if (uploaded.error) return NextResponse.json({ error: 'No se pudo guardar la imagen. Inténtalo de nuevo.' }, { status: 503 })
  const { data: publicUrl } = db.storage.from('product-images').getPublicUrl(imagePath)
  const { error } = await db.from('products').insert({ id, ...parsed.data, image_path: publicUrl.publicUrl })
  if (error) {
    await db.storage.from('product-images').remove([imagePath])
    return NextResponse.json({ error: 'No se pudo guardar el producto. Inténtalo de nuevo.' }, { status: 503 })
  }
  return NextResponse.json({ ok: true, id })
}
