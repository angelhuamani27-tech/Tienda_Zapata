import { NextResponse } from 'next/server'
export async function POST(){const r=NextResponse.redirect(new URL('/admin/login',process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'));r.cookies.delete('admin_session');return r}
