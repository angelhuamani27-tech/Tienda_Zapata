import { describe, expect, it } from 'vitest'
import { getProduct, MAX_PRODUCTS, products, type Product, validateProducts } from '../src/data/products'
import { generalWhatsappHref, whatsappHref } from '../src/lib/whatsapp/link'

const sample = (id: string): Product => ({
  id, name: `Modelo ${id}`, description: 'Descripción real del modelo.', price: 120.50,
  image: `/images/products/${id}.jpg`,
})

describe('catálogo preparado para fotos reales', () => {
  it('permanece vacío y admite hasta 30 productos válidos', () => {
    expect(products).toHaveLength(0)
    expect(getProduct('desconocido')).toBeUndefined()
    expect(() => validateProducts(Array.from({ length: MAX_PRODUCTS }, (_, index) => sample(`modelo-${index + 1}`)))).not.toThrow()
    expect(() => validateProducts(Array.from({ length: MAX_PRODUCTS + 1 }, (_, index) => sample(`modelo-${index + 1}`)))).toThrow()
  })

  it('rechaza fotos mal nombradas, datos inválidos e identificadores repetidos', () => {
    expect(() => validateProducts([sample('uno'), sample('uno')])).toThrow()
    expect(() => validateProducts([{ ...sample('uno'), image: '/images/products/otro.jpg' }])).toThrow()
    expect(() => validateProducts([{ ...sample('uno'), price: 0 }])).toThrow()
  })

  it('prepara consultas de WhatsApp al número confirmado', () => {
    const product = new URL(whatsappHref('Zapato azul'))
    expect(product.hostname).toBe('wa.me')
    expect(product.pathname).toBe('/51994431924')
    expect(product.searchParams.get('text')).toBe('Hola, quiero pedir: Zapato azul')
    expect(new URL(generalWhatsappHref()).searchParams.get('text')).toContain('consulta sobre el catálogo')
  })
})
