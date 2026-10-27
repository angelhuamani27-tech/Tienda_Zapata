import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getProduct, MAX_PRODUCTS, products, type Product, validateProducts } from '../src/data/products'
import { generalWhatsappHref, whatsappHref } from '../src/lib/whatsapp/link'

const sample = (id: string): Product => ({
  id, name: `Modelo ${id}`, description: 'Descripción real del modelo.', price: 120.50,
  image: `/images/products/${id}.jpg`,
})

describe('catálogo académico', () => {
  it('muestra 30 modelos con imagen, descripción y precio de ejemplo', () => {
    expect(products).toHaveLength(30)
    expect(products.every(product => product.isReference && product.price > 0 && product.description.length > 20)).toBe(true)
    expect(products.every(product => existsSync(join(process.cwd(), 'public', product.image)))).toBe(true)
    expect(getProduct('modelo-01')?.name).toBe('Urbana blanca')
    expect(getProduct('desconocido')).toBeUndefined()
    expect(() => validateProducts(products)).not.toThrow()
    expect(() => validateProducts(Array.from({ length: MAX_PRODUCTS + 1 }, (_, index) => sample(`modelo-${index + 1}`)))).toThrow()
  })

  it('rechaza fotos mal nombradas, datos inválidos e identificadores repetidos', () => {
    expect(() => validateProducts([sample('uno'), sample('uno')])).toThrow()
    expect(() => validateProducts([{ ...sample('uno'), image: '/images/products/otro.jpg' }])).toThrow()
    expect(() => validateProducts([{ ...sample('uno'), price: 0 }])).toThrow()
    expect(() => validateProducts([{ ...sample('uno'), price: -1 }])).toThrow()
  })

  it('prepara consultas de WhatsApp al número confirmado', () => {
    const product = new URL(whatsappHref('Zapato azul'))
    expect(product.hostname).toBe('wa.me')
    expect(product.pathname).toBe('/51994431924')
    expect(product.searchParams.get('text')).toContain('Zapato azul')
    const reference = new URL(whatsappHref('Urbana blanca', 'modelo-01'))
    expect(reference.searchParams.get('text')).toContain('modelo-01 (Urbana blanca)')
    expect(new URL(generalWhatsappHref()).searchParams.get('text')).toContain('consulta sobre el catálogo')
  })
})
