import React, { useEffect, useState } from 'react'
import { Sun, Moon, Github } from 'lucide-react'
import Converter from './components/Converter.jsx'
import CryptoTable from './components/CryptoTable.jsx'
import { getSavedTheme, saveTheme } from './utils/theme.js'

export default function App() {
  const [theme, setTheme] = useState(getSavedTheme())
  const [vsCurrency, setVsCurrency] = useState(localStorage.getItem('vsCurrency') || 'USD')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('vsCurrency', vsCurrency)
  }, [vsCurrency])

  return (
    <div className="min-h-screen selection:bg-indigo-500/20">
      <header className="sticky top-0 z-30 border-b border-slate-200/10 backdrop-blur bg-white/75 dark:bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-xl bg-indigo-600 dark:bg-indigo-500"></span>
            <h1 className="text-lg font-semibold">Advanced Currency & Crypto Converter</h1>
          </div>
          <div className="flex items-center gap-2">
            <select
              title="Crypto list currency"
              value={vsCurrency}
              onChange={(e) => setVsCurrency(e.target.value)}
              className="rounded-xl border border-slate-300/50 dark:border-slate-700 bg-white/80 dark:bg-slate-950 px-3 py-2"
            >
              {['USD','EUR','DZD','GBP','JPY','CNY','TRY','SAR','AED'].map(c => <option key={`hdr-${c}`} value={c}>{c}</option>)}
            </select>
            <button
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href="https://github.com/"
              target="_blank"
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Source"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-8">
        <Converter />
        <CryptoTable vsCurrency={vsCurrency} />
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <div>React + Vite + Tailwind • Fiat: open.er-api.com • Crypto: CoinGecko (Top 50)</div>
        <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M8 4h8M6 8h12v12H6z"/></svg>
          <span className="font-medium">Developed by <span className="text-indigo-600 dark:text-indigo-400">Rezki-dev</span></span>
        </div>
      </footer>
    </div>
  )
}
