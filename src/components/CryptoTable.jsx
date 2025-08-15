import React, { useEffect, useState } from 'react'
import { fetchTopCoins } from '../utils/api.js'

export default function CryptoTable({ vsCurrency }) {
  const [state, setState] = useState({ loading: true, error: null, data: [] })

  async function load() {
    try {
      setState(s => ({ ...s, loading: true, error: null }))
      const coins = await fetchTopCoins(vsCurrency, 50)
      setState({ loading: false, error: null, data: coins })
    } catch (e) {
      setState({ loading: false, error: e.message || 'Error', data: [] })
    }
  }

  useEffect(() => { load() }, [vsCurrency])

  useEffect(() => {
    const id = setInterval(load, 60_000) // refresh each minute
    return () => clearInterval(id)
  }, [vsCurrency])

  return (
    <div className="rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/10 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Top 50 Cryptos</h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">vs {vsCurrency.toUpperCase()}</span>
      </div>
      {state.loading && <p>Loading crypto prices…</p>}
      {state.error && <p className="text-red-500">Error: {state.error}</p>}
      {!state.loading && !state.error && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-slate-500 dark:text-slate-400">
              <tr>
                <th className="text-left py-2 pr-4">#</th>
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-right py-2 pr-4">Price</th>
                <th className="text-right py-2 pr-4">24h</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((c, idx) => (
                <tr key={c.id || `coin-${idx}`} className="border-t border-slate-200/10">
                  <td className="py-2 pr-4">{idx + 1}</td>
                  <td className="py-2 pr-4 flex items-center gap-2">
                    <img src={c.image} alt={c.name} className="h-5 w-5 rounded-full" />
                    <span className="font-medium">{c.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">({c.symbol})</span>
                  </td>
                  <td className="py-2 pr-4 text-right">{new Intl.NumberFormat(undefined, { maximumFractionDigits: 8 }).format(c.price)}</td>
                  <td className={`py-2 pr-4 text-right ${c.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {c.change24h?.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
