import type { Product } from '../data/products'

type StoredProduct = Omit<Product, 'image'> & { imageBlob: Blob }
const DB_NAME = 'catalogo-whatsapp-local-v1'

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in globalThis)) { reject(new Error('Este navegador no permite guardar productos.')); return }
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      db.createObjectStore('products', { keyPath: 'id' })
      db.createObjectStore('settings')
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function loadLocalCatalogue(): Promise<{ custom: Product[]; hidden: string[] }> {
  const db = await openDatabase()
  try {
    const transaction = db.transaction(['products', 'settings'], 'readonly')
    const done = transactionDone(transaction)
    const productsRequest = requestResult(transaction.objectStore('products').getAll() as IDBRequest<StoredProduct[]>)
    const hiddenRequest = requestResult(transaction.objectStore('settings').get('hidden') as IDBRequest<string[] | undefined>)
    const [stored, hidden] = await Promise.all([productsRequest, hiddenRequest])
    await done
    return {
      custom: stored.filter(item =>
        item && /^personal-[a-f0-9-]{36}$/.test(item.id) &&
        typeof item.name === 'string' && item.name.length > 0 && item.name.length <= 100 &&
        typeof item.description === 'string' && item.description.length > 0 && item.description.length <= 1000 &&
        typeof item.price === 'number' && Number.isFinite(item.price) && item.price > 0 &&
        item.imageBlob instanceof Blob && item.imageBlob.type === 'image/webp',
      ).map(({ imageBlob, ...item }) => ({ ...item, image: URL.createObjectURL(imageBlob) })),
      hidden: Array.isArray(hidden) ? hidden.filter(id => typeof id === 'string') : [],
    }
  } finally { db.close() }
}

export async function saveLocalProduct(product: StoredProduct): Promise<void> {
  const db = await openDatabase()
  try {
    const transaction = db.transaction('products', 'readwrite')
    const done = transactionDone(transaction)
    transaction.objectStore('products').put(product)
    await done
  } finally { db.close() }
}

export async function deleteLocalProduct(id: string): Promise<void> {
  const db = await openDatabase()
  try {
    const transaction = db.transaction('products', 'readwrite')
    const done = transactionDone(transaction)
    transaction.objectStore('products').delete(id)
    await done
  } finally { db.close() }
}

export async function saveHiddenProducts(ids: string[]): Promise<void> {
  const db = await openDatabase()
  try {
    const transaction = db.transaction('settings', 'readwrite')
    const done = transactionDone(transaction)
    transaction.objectStore('settings').put(ids, 'hidden')
    await done
  } finally { db.close() }
}

export async function prepareImage(file: File): Promise<Blob> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('La imagen debe ser JPG, PNG o WebP.')
  if (file.size === 0 || file.size > 5 * 1024 * 1024) throw new Error('La imagen debe pesar menos de 5 MB.')
  let bitmap: ImageBitmap
  try { bitmap = await createImageBitmap(file) }
  catch { throw new Error('No se pudo abrir la imagen. Prueba con otro archivo JPG, PNG o WebP.') }
  try {
    if (bitmap.width < 320 || bitmap.height < 320 || bitmap.width > 6000 || bitmap.height > 6000) {
      throw new Error('La imagen debe medir entre 320 y 6000 píxeles por lado.')
    }
    const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const context = canvas.getContext('2d')
    if (!context) throw new Error('No se pudo preparar la imagen.')
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const result = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', .82))
    if (!result || result.type !== 'image/webp') throw new Error('No se pudo guardar la imagen.')
    return result
  } finally { bitmap.close() }
}
