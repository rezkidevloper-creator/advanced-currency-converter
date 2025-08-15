export function parseAmount(value) {
  if (value == null) return 0
  let v = String(value).trim().replace(/\s+/g, '')
  const lastComma = v.lastIndexOf(',')
  const lastDot = v.lastIndexOf('.')
  const decIndex = Math.max(lastComma, lastDot)
  if (decIndex > -1) {
    const intPart = v.slice(0, decIndex).replace(/[.,\s]/g, '')
    const fracPart = v.slice(decIndex + 1).replace(/[.,\s]/g, '')
    v = intPart + '.' + fracPart
  } else {
    v = v.replace(/[.,\s]/g, '')
  }
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

export function formatAmount(n, locale = navigator.language || 'fr-DZ') {
  if (!Number.isFinite(n)) n = 0
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(n)
}
