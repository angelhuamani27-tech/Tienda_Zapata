import { supabaseServer } from '../supabase/server'
import type { Product } from '../../types/domain'

const demo: Product[] = []
export async function getProducts(): Promise<Product[]> {
  const supabase = supabaseServer()
  if (!supabase) return demo
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  return (data || []) as Product[]
}
export async function getProduct(id: string) { return (await getProducts()).find((p) => p.id === id) }
