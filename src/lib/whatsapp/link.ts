import { productUrl } from '../site-url'
import type { CartItem } from '../../components/cart/CartProvider'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51994431924'

function whatsappLink(message: string): string {
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) throw new Error('Número de WhatsApp inválido.')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function whatsappHref(name: string, id?: string): string {
  const url = id && !id.startsWith('personal-') ? productUrl(id) : undefined
  const model = id ? `${id} (${name})` : name
  const message = `Hola, me interesa el ${model} del catálogo. ¿Me das más información?`
  return whatsappLink(`${message}${url ? `\n${url}` : ''}`)
}

export const generalWhatsappHref = () => whatsappLink('Hola, tengo una consulta sobre el catálogo.')

export function cartWhatsappHref(items: readonly CartItem[]): string {
  if (items.length === 0) throw new Error('El carrito está vacío.')
  const lines = items.map(item => `• ${item.quantity} × ${item.name} (${item.id}) — S/ ${(item.price * item.quantity).toFixed(2)}`)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return whatsappLink(`Hola, quiero consultar este pedido:\n${lines.join('\n')}\nTotal: S/ ${total.toFixed(2)}\n¿Me confirmas los detalles?`)
}
