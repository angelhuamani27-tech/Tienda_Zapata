import { createClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const url = () => process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function publicClient() {
  if (!url() || !anon()) return null
  return createClient(url()!, anon()!, { auth: { persistSession: false } })
}

export function adminStorageClient() {
  if (!url() || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  return createClient(url()!, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
}

export function sessionClient() {
  if (!url() || !anon()) return null
  const store = cookies()
  return createServerClient(url()!, anon()!, {
    cookies: {
      get(name: string) { return store.get(name)?.value },
      set(name: string, value: string, options: CookieOptions) { try { store.set(name, value, options) } catch {} },
      remove(name: string, options: CookieOptions) { try { store.set(name, '', { ...options, maxAge: 0 }) } catch {} },
    },
  })
}

export async function isAdmin() {
  if (!process.env.ADMIN_USER_ID) return false
  const client = sessionClient()
  if (!client) return false
  const { data: { user }, error } = await client.auth.getUser()
  return !error && user?.id === process.env.ADMIN_USER_ID
}
