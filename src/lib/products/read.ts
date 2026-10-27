import { publicClient } from '../supabase/server'
import type { Product } from '../../types/domain'

export async function getProducts(): Promise<Product[]> {
  const db = publicClient()
  if (!db) throw new Error('La tienda aún no está configurada.')
  const { data, error } = await db.from('products').select('*').order('created_at', { ascending: false })
  if (error) throw new Error('No se pudo cargar el catálogo.')
  return data as Product[]
}

export async function getProduct(id: string) {
  const db = publicClient()
  if (!db) throw new Error('La tienda aún no está configurada.')
  const { data, error } = await db.from('products').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error('No se pudo cargar el producto.')
  return data as Product | null
}
