export function driveLinkToDirect(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname !== 'drive.google.com') return url

    // Patterns:
    // 1) https://drive.google.com/file/d/FILE_ID/view?usp=share_link
    // 2) https://drive.google.com/open?id=FILE_ID
    // 3) https://drive.google.com/uc?id=FILE_ID

    const filePattern = /\/file\/d\/([^/]+)\//
    const m = u.pathname.match(filePattern)
    if (m && m[1]) {
      const id = m[1]
      return `https://drive.google.com/uc?export=view&id=${id}`
    }

    const id = u.searchParams.get('id')
    if (id) {
      return `https://drive.google.com/uc?export=view&id=${id}`
    }

    // Folder links or unknown pattern: return original
    return url
  } catch {
    return url
  }
}

export function generateId(prefix: string): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).slice(2, 7)
  return `${prefix}-${ts}-${rand}`
}

export function driveIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname !== 'drive.google.com') return null
    const filePattern = /\/file\/d\/([^/]+)\//
    const m = u.pathname.match(filePattern)
    if (m && m[1]) return m[1]
    const id = u.searchParams.get('id')
    return id
  } catch {
    return null
  }
}

export function driveThumbnailUrl(urlOrId: string, size: string = 'w1200'): string | null {
  const id = urlOrId.includes('http') ? driveIdFromUrl(urlOrId) : urlOrId
  if (!id) return null
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`
}

export function bestImageSrc(url: string | undefined): string | undefined {
  if (!url) return undefined
  const thumb = driveThumbnailUrl(url, 'w800')
  return thumb ?? url
}

const PROJECTS_KEY = 'furniture_projects_v1'

export function loadProjects<T = any[]>(): T {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    return raw ? JSON.parse(raw) : ([] as unknown as T)
  } catch {
    return ([] as unknown as T)
  }
}

export function saveProjects(value: unknown): void {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(value))
  } catch {}
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export async function tryLoadImageDataUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        const data = canvas.toDataURL('image/jpeg', 0.9)
        resolve(data)
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = url
  })
}

