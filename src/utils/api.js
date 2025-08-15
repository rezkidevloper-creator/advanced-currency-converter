// Fiat rates via open.er-api.com (direct API call)
export async function fetchFiatRates(base = 'USD') {
  const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`)
  if (!res.ok) throw new Error('Network error (fiat)')
  const data = await res.json()
  if (!data || !data.rates) throw new Error('Invalid fiat rates response')
  return {
    base: data.base_code,
    date: data.time_last_update_utc,
    rates: data.rates
  }
}

// Top 50 crypto via CoinGecko (direct API call)
export async function fetchTopCoins(vsCurrency = 'usd', perPage = 50) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${encodeURIComponent(vsCurrency.toLowerCase())}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error (crypto)')
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Invalid crypto response')
  return data.map(c => ({
    id: c.id,
    symbol: (c.symbol || '').toUpperCase(),
    name: c.name,
    price: c.current_price,
    change24h: c.price_change_percentage_24h,
    image: c.image
  }))
}
