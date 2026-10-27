'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const router = useRouter()
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setBusy(true)
    try {
      const body = Object.fromEntries(new FormData(event.currentTarget))
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const result = await response.json()
      if (!response.ok) { setError(result.error); return }
      router.replace('/admin'); router.refresh()
    } catch { setError('No se pudo conectar. Inténtalo de nuevo.') }
    finally { setBusy(false) }
  }
  return <main className="auth shell"><header className="topbar"><a className="brand" href="/">Tienda Zapata</a></header><div className="auth-card"><h1>Administración</h1><form onSubmit={submit}><label>Correo<input name="email" type="email" autoComplete="username" required /></label><label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="error" role="alert">{error}</p>}<button className="button" disabled={busy} type="submit">Iniciar sesión</button></form></div></main>
}
