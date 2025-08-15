import React, { useEffect, useMemo, useState } from 'react'
import { parseAmount, formatAmount } from '../utils/format.js'
import { fetchFiatRates, fetchTopCoins } from '../utils/api.js'
import { ArrowLeftRight, AlertCircle } from 'lucide-react'

const DEFAULT_BASE_FIAT = 'USD'

export default function Converter() {
  const [baseFiat, setBaseFiat] = useState(localStorage.getItem('baseFiat') || DEFAULT_BASE_FIAT)
  const [fiatState, setFiatState] = useState({ loading: true, error: null, data: null })
  const [cryptoState, setCryptoState] = useState({ loading: true, error: null, data: [] })

  const [fromCode, setFromCode] = useState(localStorage.getItem('fromCode') || 'USD')
  const [toCode, setToCode] = useState(localStorage.getItem('toCode') || 'EUR')
  const [amountStr, setAmountStr] = useState('1,00')
  const [err, setErr] = useState(null)

  // Load fiat rates
  useEffect(() => {
    async function loadFiat() {
      try {
        setFiatState(s => ({ ...s, loading: true, error: null }))
        const cached = localStorage.getItem('fiat:' + baseFiat)
        if (cached) setFiatState({ loading: false, error: null, data: JSON.parse(cached) })
        const fresh = await fetchFiatRates(baseFiat)
        localStorage.setItem('fiat:' + baseFiat, JSON.stringify(fresh))
        setFiatState({ loading: false, error: null, data: fresh })
      } catch (e) {
        setFiatState({ loading: false, error: e.message || 'Error', data: null })
      }
    }
    loadFiat()
  }, [baseFiat])

  // Load crypto prices vs baseFiat
  useEffect(() => {
    async function loadCrypto() {
      try {
        setCryptoState(s => ({ ...s, loading: true, error: null }))
        const data = await fetchTopCoins(baseFiat, 50)
        setCryptoState({ loading: false, error: null, data })
      } catch (e) {
        setCryptoState({ loading: false, error: e.message || 'Error', data: [] })
      }
    }
    loadCrypto()
  }, [baseFiat])

  useEffect(() => {
    localStorage.setItem('baseFiat', baseFiat)
    localStorage.setItem('fromCode', fromCode)
    localStorage.setItem('toCode', toCode)
  }, [baseFiat, fromCode, toCode])

  const fiatCodes = useMemo(() => fiatState.data ? [fiatState.data.base, ...Object.keys(fiatState.data.rates)].sort() : [baseFiat], [fiatState, baseFiat])
  const cryptoCodes = useMemo(() => cryptoState.data.map(c => c.symbol.toUpperCase()), [cryptoState])

  const ratesAll = useMemo(() => {
    const map = {}
    if (fiatState.data?.rates) {
      map[fiatState.data.base] = 1
      Object.entries(fiatState.data.rates).forEach(([code, rate]) => {
        map[code] = rate
      })
    }
    if (cryptoState.data?.length) {
      cryptoState.data.forEach(c => {
        if (c.price > 0) map[c.symbol.toUpperCase()] = 1 / c.price
      })
    }
    return map
  }, [fiatState, cryptoState])

  const allCodes = useMemo(() => {
    const list = [...new Set([...(fiatCodes || []), ...(cryptoCodes || [])])]
    return list.sort()
  }, [fiatCodes, cryptoCodes])

  const amount = useMemo(() => parseAmount(amountStr), [amountStr])

  const result = useMemo(() => {
    const fromRate = ratesAll[fromCode]
    const toRate = ratesAll[toCode]
    if (!fromRate || !toRate) return 0
    const inBase = amount / fromRate
    return inBase * toRate
  }, [amount, fromCode, toCode, ratesAll])

  const onAmountChange = (e) => {
    const v = e.target.value
    if (!/^[0-9.,\s]*$/.test(v)) return
    setAmountStr(v)
  }
  const onBlurFormat = () => {
    try {
      const n = parseAmount(amountStr)
      setAmountStr(formatAmount(n))
      setErr(null)
    } catch (e) {
      setErr('Invalid amount')
    }
  }
  const swap = () => {
    setFromCode(toCode); setToCode(fromCode)
  }

  return (
    <section className="grid gap-6">
      <div className="rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/10 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <div className="flex-1">
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Base (Fiat pivot)</label>
            <select
              value={baseFiat}
              onChange={(e) => setBaseFiat(e.target.value)}
              className="w-full rounded-xl border border-slate-300/50 dark:border-slate-700 bg-white/80 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {fiatCodes.map((c, i) => <option key={`bf-${c}-${i}`} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Amount</label>
            <input
              inputMode="decimal"
              value={amountStr}
              onChange={onAmountChange}
              onBlur={onBlurFormat}
              placeholder="0,00"
              className="w-full rounded-xl border border-slate-300/50 dark:border-slate-700 bg-white/80 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            {err && <p className="mt-1 text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {err}</p>}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">From</label>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300/50 dark:border-slate-700 bg-white/80 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {allCodes.map((c,i) => <option key={`f-${c}-${i}`} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={swap} className="p-2 rounded-xl border border-slate-300/50 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 mt-6" title="Swap">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path/></svg>
          </button>
          <div className="flex-1">
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">To</label>
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300/50 dark:border-slate-700 bg-white/80 dark:bg-slate-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {allCodes.map((c,i) => <option key={`t-${c}-${i}`} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Result</h3>
          <p className="text-3xl font-bold tracking-tight">
            {formatAmount(result)}
            <span className="text-base font-medium text-slate-500 dark:text-slate-400 ml-2">{toCode}</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {fiatState.loading ? 'Loading fiat rates…' : ''}
            {fiatState.error ? `Fiat error: ${fiatState.error}` : ''}
            {!fiatState.loading && !fiatState.error && fiatState.data ? `Base: ${fiatState.data.base} • Updated: ${fiatState.data.date}` : ''}
          </p>
        </div>
      </div>
    </section>
  )
}
