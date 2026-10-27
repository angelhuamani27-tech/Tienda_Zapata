import { describe, expect, it } from 'vitest'
import { imageSchema, productSchema } from '../src/lib/validation/product'
import { whatsappHref } from '../src/lib/whatsapp/link'

describe('producto', () => {
  it('rechaza precio cero, más de dos decimales y nombre vacío', () => {
    expect(productSchema.safeParse({ name: 'A', description: 'B', price: '0' }).success).toBe(false)
    expect(productSchema.safeParse({ name: 'A', description: 'B', price: '1.001' }).success).toBe(false)
    expect(productSchema.safeParse({ name: '', description: 'B', price: '1.00' }).success).toBe(false)
  })
  it('acepta un producto válido y limita imágenes', () => {
    expect(productSchema.safeParse({ name: 'Zapato', description: 'Cuero', price: '50.00' }).success).toBe(true)
    expect(imageSchema.safeParse({ type: 'image/png', size: 5 * 1024 * 1024 }).success).toBe(true)
    expect(imageSchema.safeParse({ type: 'image/svg+xml', size: 100 }).success).toBe(false)
  })
  it('prepara el producto correcto para WhatsApp', () => {
    const link = whatsappHref('Zapato azul')
    expect(link).toContain('51994431924')
    expect(new URL(link).searchParams.get('text')).toBe('Hola, quiero pedir: Zapato azul')
  })
})
