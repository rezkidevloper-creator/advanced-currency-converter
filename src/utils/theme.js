export function getSavedTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}
export function saveTheme(theme) {
  localStorage.setItem('theme', theme)
}
