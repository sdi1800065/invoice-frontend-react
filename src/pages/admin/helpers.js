export function fmtDate(iso) {
  if (!iso) return '\u2014'
  return new Date(iso).toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function fmtAmt(n) {
  return Number(n || 0).toLocaleString('el-GR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function esc(str) {
  if (str == null) return ''
  return String(str)
}
