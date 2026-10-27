import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { products, getProduct } from '../src/data/products'
import { whatsappHref } from '../src/lib/whatsapp/link'

describe('catálogo y pedidos', () => {
  it('cada producto tiene datos completos y una imagen local única', () => {
    expect(products).toHaveLength(8)
    expect(new Set(products.map(product => product.id)).size).toBe(products.length)
    expect(new Set(products.map(product => product.image)).size).toBe(products.length)
    for (const product of products) {
      expect(product.name).not.toBe('')
      expect(product.description).not.toBe('')
      expect(product.price).toBeGreaterThan(0)
      expect(product.image).toMatch(/^\/images\/.+\.png$/)
      expect(existsSync(join(process.cwd(), 'public', product.image))).toBe(true)
      expect(getProduct(product.id)).toEqual(product)
      const url = new URL(whatsappHref(product.name))
      expect(url.hostname).toBe('wa.me')
      expect(url.pathname).toBe('/51994431924')
      expect(url.searchParams.get('text')).toBe(`Hola, quiero pedir: ${product.name}`)
    }
  })
  it('un producto desconocido no se muestra', () => { expect(getProduct('desconocido')).toBeUndefined() })
})
