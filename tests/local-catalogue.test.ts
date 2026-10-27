import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { deleteLocalProduct, loadLocalCatalogue, prepareImage, saveHiddenProducts, saveLocalProduct } from '../src/lib/local-catalogue'
import { cartWhatsappHref } from '../src/lib/whatsapp/link'

describe('catálogo del navegador', () => {
  it('guarda y elimina un producto con su imagen, y recuerda los modelos quitados', async () => {
    const id = 'personal-11111111-1111-4111-8111-111111111111'
    await saveLocalProduct({ id, name: 'Modelo de prueba', description: 'Producto agregado en este navegador.', price: 88.5, imageBlob: new Blob(['imagen'], { type: 'image/webp' }) })
    await saveHiddenProducts(['modelo-02'])
    const loaded = await loadLocalCatalogue()
    expect(loaded.custom).toHaveLength(1)
    expect(loaded.custom[0]).toMatchObject({ id, name: 'Modelo de prueba', price: 88.5 })
    expect(loaded.custom[0].image).toMatch(/^blob:/)
    expect(loaded.hidden).toContain('modelo-02')
    URL.revokeObjectURL(loaded.custom[0].image)
    await deleteLocalProduct(id)
    expect((await loadLocalCatalogue()).custom).toHaveLength(0)
  })

  it('prepara el pedido de varios productos con cantidades y total correctos', () => {
    const href = cartWhatsappHref([
      { id: 'modelo-01', name: 'Urbana blanca', price: 129, image: '/images/products/modelo-01.jpg', quantity: 2 },
      { id: 'modelo-02', name: 'Deportiva negra', price: 149, image: '/images/products/modelo-02.jpg', quantity: 1 },
    ])
    const link = new URL(href)
    expect(link.hostname).toBe('wa.me')
    expect(link.pathname).toBe('/51994431924')
    expect(link.searchParams.get('text')).toContain('2 × Urbana blanca (modelo-01) — S/ 258.00')
    expect(link.searchParams.get('text')).toContain('1 × Deportiva negra (modelo-02) — S/ 149.00')
    expect(link.searchParams.get('text')).toContain('Total: S/ 407.00')
    expect(() => cartWhatsappHref([])).toThrow('vacío')
  })

  it('rechaza formatos y tamaños de imagen no permitidos', async () => {
    await expect(prepareImage(new File(['svg'], 'modelo.svg', { type: 'image/svg+xml' }))).rejects.toThrow('JPG, PNG o WebP')
    await expect(prepareImage(new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'grande.jpg', { type: 'image/jpeg' }))).rejects.toThrow('5 MB')
  })
})
