export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '994431924'
export const whatsappHref = (name: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero pedir: ${name}`)}`
