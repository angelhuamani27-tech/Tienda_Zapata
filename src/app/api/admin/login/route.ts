import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const adminId = process.env.ADMIN_USER_ID
  if (!url || !key || !adminId) return NextResponse.json({ error: 'Falta configurar la administración.' }, { status: 503 })
  const body = await request.json().catch(() => null)
  if (typeof body?.email !== 'string' || typeof body?.password !== 'string')
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 })
  const response = NextResponse.json({ ok: true })
  const client = createServerClient(url, key, {
    cookies: {
      get(name: string) { return request.cookies.get(name)?.value },
      set(name: string, value: string, options: CookieOptions) { response.cookies.set(name, value, options) },
      remove(name: string, options: CookieOptions) { response.cookies.set(name, '', { ...options, maxAge: 0 }) },
    },
  })
  const { data, error } = await client.auth.signInWithPassword({ email: body.email, password: body.password })
  if (error || data.user?.id !== adminId) {
    await client.auth.signOut()
    return NextResponse.json({ error: 'Credenciales inválidas.' }, { status: 401 })
  }
  return response
}
