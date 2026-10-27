const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')

export const siteUrl = configured && /^https:\/\/[^\s/]+(?:\/[^\s]*)?$/.test(configured)
  ? configured
  : undefined

export const productUrl = (id: string) => siteUrl ? `${siteUrl}/producto/${encodeURIComponent(id)}/` : undefined
