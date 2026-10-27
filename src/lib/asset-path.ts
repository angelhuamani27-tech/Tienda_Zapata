const basePath = process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH || ''

export function assetPath(path: string): string {
  return path.startsWith('/') ? `${basePath}${path}` : path
}
