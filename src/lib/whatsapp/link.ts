import { productUrl } from '../site-url'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51994431924'

function whatsappLink(message: string): string {
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) throw new Error('Número de WhatsApp inválido.')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function whatsappHref(name: string, id?: string): string {
  const url = id ? productUrl(id) : undefined
  const model = id ? `${id} (${name})` : name
  const message = `Hola, me interesa el ${model} del catálogo. ¿Me das más información?`
  return whatsappLink(`${message}${url ? `\n${url}` : ''}`)
}

export const generalWhatsappHref = () => whatsappLink('Hola, tengo una consulta sobre el catálogo.')
