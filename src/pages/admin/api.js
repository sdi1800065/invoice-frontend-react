export async function api(method, path, body) {
  const opts = { method, headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'same-origin' }
  if (body) {
    opts.headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(body)
  }
  const res = await fetch(path, opts)
  if (res.status === 204) return null
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}
