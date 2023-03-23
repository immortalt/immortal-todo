export function darkenColor (color: string): string {
  let r = parseInt(color.slice(1, 3), 16)
  let g = parseInt(color.slice(3, 5), 16)
  let b = parseInt(color.slice(5, 7), 16)

  r = Math.round(r * 0.8)
  g = Math.round(g * 0.8)
  b = Math.round(b * 0.8)

  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return `#${hexR}${hexG}${hexB}`
}

export function lightenColor (color: string): string {
  const r1 = parseInt(color.substr(1, 2), 16)
  const g1 = parseInt(color.substr(3, 2), 16)
  const b1 = parseInt(color.substr(5, 2), 16)

  const r2 = Math.round((r1 * 244) / 249)
  const g2 = Math.round((g1 * 221) / 232)
  const b2 = Math.round((b1 * 211) / 222)
  return `#${r2.toString(16)}${g2.toString(16)}${b2.toString(16)}`
}
