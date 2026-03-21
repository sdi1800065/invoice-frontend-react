import { useState, useEffect, useCallback, useRef } from 'react'
import { api } from './api'
import { fmtDate, fmtAmt, esc } from './helpers'
import './Admin.css'

// ── Pill helpers ───────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const cls = status === 'success' ? 'pill-success' : status === 'failed' ? 'pill-failed' : 'pill-pending'
  return <span className={`pill ${cls}`}>{esc(status)}</span>
}

function DocTypePill({ type }) {
  const cls = type === 'receipt' ? 'type-receipt' : 'type-invoice'
  const label = type === 'receipt' ? 'ΑΠΟΔΕΙΞΗ' : 'ΤΙΜΟΛΟΓΙΟ'
  return <span className={`pill ${cls}`}>{label}</span>
}

function SubscriptionPill({ status }) {
  if (!status) return <span className="pill pill-canceled">&mdash;</span>
  const map = {
    active: 'pill-paid', trialing: 'pill-pending', past_due: 'pill-pending',
    unpaid: 'pill-failed', canceled: 'pill-canceled', incomplete: 'pill-pending',
    incomplete_expired: 'pill-canceled', paused: 'pill-canceled',
  }
  return <span className={`pill ${map[status] || 'pill-canceled'}`}>{esc(status)}</span>
}

function StatusCell({ invoice }) {
  const i = invoice
  if (i.cancelled_at && i.requires_manual_cancellation && !i.mydata_cancellation_mark) {
    return (
      <div style={{ lineHeight: 1.6 }}>
        <div><span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: '#fef3c7', color: '#92400e' }}>ΕΚΚΡΕΜΕΙ ΑΚΥΡΩΣΗ</span></div>
        <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>{fmtDate(i.cancelled_at)}</div>
        <div style={{ fontSize: 10, color: '#92400e', marginTop: 2 }}>Αναμονή χειροκίνητης ακύρωσης</div>
      </div>
    )
  }
  if (i.cancelled_at) {
    return (
      <div style={{ lineHeight: 1.6 }}>
        <div><span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: '#fee2e2', color: '#b91c1c' }}>ΑΚΥΡΩΘΗΚΕ</span></div>
        <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>{fmtDate(i.cancelled_at)}</div>
        {i.mydata_cancellation_mark
          ? <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', marginTop: 2 }}>Ακ.ΜΑΡΚ: <code style={{ fontSize: 12, background: '#fee2e2', padding: '1px 4px', borderRadius: 3 }}>{esc(i.mydata_cancellation_mark)}</code></div>
          : <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2 }}>Ακ.ΜΑΡΚ: &mdash;</div>}
      </div>
    )
  }
  return <span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: '#dcfce7', color: '#15803d' }}>ΕΝΕΡΓΟ</span>
}

function AadeCell({ invoice }) {
  if (!invoice.mydata_url) return <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>&mdash;</span>
  return (
    <a href={invoice.mydata_url} target="_blank" rel="noopener noreferrer"
      title="Επαλήθευση στην ΑΑΔΕ"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
      ΑΑΔΕ
    </a>
  )
}

function ActionBadge({ action }) {
  const colors = {
    login_success: '#15803d', logout: 'var(--gray-600)',
    view_customer: 'var(--blue)', edit_customer: 'var(--yellow)',
    view_pdf: 'var(--blue-light)', retry_attempt: 'var(--green)',
    resend_email: '#0891b2', cancel_invoice: 'var(--red)', mydata_reconcile: '#0891b2',
  }
  return <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: colors[action] || 'var(--gray-400)', color: '#fff', whiteSpace: 'nowrap' }}>{esc(action)}</span>
}

// ── Sidebar nav icons ─────────────────────────────────────────────────────────
const ICONS = {
  business: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
  individuals: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  documents: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>,
  payments: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
  cancel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
  attempts: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  paymentEvents: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  reconcileAade: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>,
  reconcileStripe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>,
  plugins: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></svg>,
  mydataLog: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  audit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
  logout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ total, page, limit, onPage, label }) {
  const pages = Math.ceil(total / limit)
  if (pages <= 1) return <div className="pagination"><span>{total} {label}</span></div>
  return (
    <div className="pagination">
      <span>{total} σύνολο</span>
      <button className="abtn abtn-outline abtn-sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>← Προηγ.</button>
      <span>Σελίδα {page} από {pages}</span>
      <button className="abtn abtn-outline abtn-sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>Επόμ. →</button>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── MAIN ADMIN COMPONENT ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
export default function Admin() {
  const [authed, setAuthed] = useState(null) // null=checking, false=login, true=app
  const [view, setView] = useState('business')
  const [toasts, setToasts] = useState([])
  const [badges, setBadges] = useState({ failed: 0, paymentIssues: 0, pendingCancel: 0 })
  const [xmlModal, setXmlModal] = useState(null) // { title, content, meta }
  const [lastListView, setLastListView] = useState('business')
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const toastId = useRef(0)

  // ── Toast ────────────────────────────────────────────────────────────────
  const toast = useCallback((msg, type = 'ok') => {
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  // ── Auth check ───────────────────────────────────────────────────────────
  useEffect(() => {
    api('GET', '/admin/customers?limit=1&customerType=BUSINESS')
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
  }, [])

  // ── Load badges ──────────────────────────────────────────────────────────
  const loadBadges = useCallback(async () => {
    try {
      const [att, iss, pc] = await Promise.allSettled([
        api('GET', '/admin/attempts?status=failed&limit=1'),
        api('GET', '/admin/customers-with-issues'),
        api('GET', '/admin/invoices/pending-cancellation'),
      ])
      setBadges({
        failed: att.status === 'fulfilled' ? att.value.total : 0,
        paymentIssues: iss.status === 'fulfilled' ? iss.value.total : 0,
        pendingCancel: pc.status === 'fulfilled' ? pc.value.total : 0,
      })
    } catch { /* ignore */ }
  }, [])

  useEffect(() => { if (authed) loadBadges() }, [authed, loadBadges]) // eslint-disable-line react-hooks/set-state-in-effect

  // ── Login ────────────────────────────────────────────────────────────────
  if (authed === null) return <div className="admin-root"><div className="admin-login-screen"><div className="admin-login-box"><p>Loading...</p></div></div></div>
  if (authed === false) return <LoginScreen onSuccess={() => { setAuthed(true); loadBadges() }} />

  const navigate = (v, id) => {
    if (v === 'business' || v === 'individuals') setLastListView(v)
    if (v === 'customer' && id) setSelectedCustomerId(id)
    setView(v)
  }

  return (
    <div className="admin-root">
      <div className="admin-app">
        <Sidebar view={view} navigate={navigate} badges={badges} lastListView={lastListView}
          onLogout={async () => { await api('POST', '/admin/logout').catch(() => {}); setAuthed(false) }} />
        <div className="admin-main">
          {view === 'business' && <CustomersList key="biz" customerType="BUSINESS" navigate={navigate} />}
          {view === 'individuals' && <CustomersList key="ind" customerType="INDIVIDUAL" navigate={navigate} />}
          {view === 'customer' && <CustomerDetail customerId={selectedCustomerId} navigate={navigate} toast={toast} loadBadges={loadBadges} lastListView={lastListView} openXml={setXmlModal} />}
          {view === 'documents' && <Documents navigate={navigate} toast={toast} openXml={setXmlModal} loadBadges={loadBadges} />}
          {view === 'payments' && <Payments navigate={navigate} />}
          {view === 'pending-cancellations' && <PendingCancellations toast={toast} loadBadges={loadBadges} />}
          {view === 'attempts' && <Attempts navigate={navigate} toast={toast} loadBadges={loadBadges} />}
          {view === 'payment-events' && <PaymentEvents navigate={navigate} />}
          {view === 'mydata-reconcile' && <ReconcileAade toast={toast} />}
          {view === 'stripe-reconcile' && <ReconcileStripe navigate={navigate} />}
          {view === 'plugins' && <><Plugins toast={toast} /><Settings toast={toast} /></>}
          {view === 'mydata-log' && <MyDataLog navigate={navigate} />}
          {view === 'mydata-log-detail' && <MyDataLogDetail navigate={navigate} openXml={setXmlModal} />}
          {view === 'audit' && <AuditLog />}
        </div>
      </div>

      {/* XML Modal */}
      {xmlModal && (
        <div className="xml-modal-overlay" onClick={() => setXmlModal(null)}>
          <div className="xml-modal-box" onClick={e => e.stopPropagation()}>
            <div className="xml-modal-header">
              <h3>{xmlModal.title}</h3>
              <button className="abtn abtn-outline abtn-sm" onClick={() => setXmlModal(null)}>✕ Κλείσιμο</button>
            </div>
            <div className="xml-modal-body">
              {xmlModal.meta && <div style={{ marginBottom: 12, fontSize: 12, color: 'var(--gray-600)' }}>{xmlModal.meta}</div>}
              <pre>{xmlModal.content}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className="toast-container">
        {toasts.map(t => <div key={t.id} className={`toast-msg ${t.type}`}>{t.msg}</div>)}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── LOGIN SCREEN ────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function LoginScreen({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await api('POST', '/admin/login', { username, password })
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally { setBusy(false) }
  }

  return (
    <div className="admin-root">
      <div className="admin-login-screen">
        <div className="admin-login-box">
          <h1>Invoice Admin</h1>
          <p>Sign in to manage customers and invoices</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label>Username</label>
              <input type="text" autoComplete="username" required value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label>Password</label>
              <input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 14 }}>{error}</div>}
            <button type="submit" className="abtn abtn-primary" style={{ width: '100%' }} disabled={busy}>
              {busy ? 'Signing in\u2026' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── SIDEBAR ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function Sidebar({ view, navigate, badges, lastListView, onLogout }) {
  const sidebarView = view === 'customer' ? lastListView : (view === 'mydata-log-detail' ? 'mydata-log' : view)
  const items = [
    { key: 'business', label: 'Επιχειρήσεις', icon: ICONS.business },
    { key: 'individuals', label: 'Ιδιώτες', icon: ICONS.individuals },
    { key: 'documents', label: 'Παραστατικά', icon: ICONS.documents },
    { key: 'payments', label: 'Πληρωμές', icon: ICONS.payments },
    { key: 'pending-cancellations', label: 'Ακυρώσεις', icon: ICONS.cancel, badge: badges.pendingCancel },
    { key: 'attempts', label: 'Failed Attempts', icon: ICONS.attempts, badge: badges.failed },
    { key: 'payment-events', label: 'Payment Issues', icon: ICONS.paymentEvents, badge: badges.paymentIssues > 0 ? '!' : 0 },
    { key: 'mydata-reconcile', label: 'Reconcile ΑΑΔΕ', icon: ICONS.reconcileAade },
    { key: 'stripe-reconcile', label: 'Reconcile Stripe', icon: ICONS.reconcileStripe },
    { key: 'plugins', label: 'Plugins', icon: ICONS.plugins },
    { divider: true },
    { key: 'mydata-log', label: 'MyData Log', icon: ICONS.mydataLog },
    { key: 'audit', label: 'Audit Log', icon: ICONS.audit },
  ]
  const navItems = items.filter(item => !item.divider)

  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>Invoice Admin</h2>
        <p>Management Panel</p>
      </div>
      <nav className="sidebar-nav">
        {items.map((item, i) => {
          if (item.divider) return <div key={i} className="sidebar-divider">Logs</div>
          return (
            <button key={item.key} className={`nav-item ${sidebarView === item.key ? 'active' : ''}`} onClick={() => navigate(item.key)}>
              {item.icon} {item.label}
              {item.badge > 0 && <span className="badge">{item.badge}</span>}
            </button>
          )
        })}
      </nav>
      <div className="mobile-nav-select-wrap">
        <select
          className="mobile-nav-select"
          value={sidebarView}
          onChange={e => navigate(e.target.value)}
          aria-label="Επιλογή ενότητας admin"
        >
          {navItems.map(item => (
            <option key={item.key} value={item.key}>
              {item.label}{item.badge > 0 ? ` (${item.badge})` : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>{ICONS.logout} Logout</button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── CUSTOMERS LIST ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function CustomersList({ customerType, navigate }) {
  const isBusiness = customerType === 'BUSINESS'
  const title = isBusiness ? 'Επιχειρήσεις' : 'Ιδιώτες'
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setError('')
    try {
      const q = new URLSearchParams({ page, limit: 20, customerType, ...(search && { search }) })
      const d = await api('GET', `/admin/customers?${q}`)
      setData(d)
    } catch (e) { setError(e.message) }
  }, [page, search, customerType])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const doSearch = () => { setPage(1); setSearch(searchInput) }

  return (
    <>
      <div className="page-header"><h1>{title}</h1></div>
      <div className="card">
        <div className="card-header"><h2>{isBusiness ? 'Πελάτες με Τιμολόγιο' : 'Πελάτες με Απόδειξη'}</h2></div>
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <div className="search-bar">
            <input type="text" placeholder={isBusiness ? 'Αναζήτηση με όνομα, email ή ΑΦΜ\u2026' : 'Αναζήτηση με όνομα ή email\u2026'}
              value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()} />
            <button className="abtn abtn-primary" onClick={doSearch}>Αναζήτηση</button>
          </div>
        </div>
        <div className="table-wrap">
          {error && <div className="empty">Error: {error}</div>}
          {!error && !data && <div className="empty">Loading\u2026</div>}
          {!error && data && !data.data.length && <div className="empty">Δεν βρέθηκαν {title.toLowerCase()}.</div>}
          {!error && data?.data.length > 0 && (
            <table>
              <thead><tr>
                {isBusiness ? <><th>Επωνυμία</th><th>Email</th><th>ΑΦΜ</th><th>ΔΟΥ</th><th>Συνδρομή</th><th>Παραστατικά</th><th>Τελευταία</th><th>Εγγραφή</th></>
                  : <><th>Όνομα / Email</th><th>Email</th><th>Συνδρομή</th><th>Αποδείξεις</th><th>Τελευταία</th><th>Εγγραφή</th></>}
              </tr></thead>
              <tbody>
                {data.data.map(c => (
                  <tr key={c.id}>
                    <td className="clickable" onClick={() => navigate('customer', c.id)}>{esc(c.name || c.email || '\u2014')}</td>
                    <td>{esc(c.email || '\u2014')}</td>
                    {isBusiness && <td>{esc(c.afm || '\u2014')}</td>}
                    {isBusiness && <td>{esc(c.doy || '\u2014')}</td>}
                    <td><SubscriptionPill status={c.subscription_status} /></td>
                    <td style={{ textAlign: 'center' }}>{c.invoice_count}</td>
                    <td>{c.last_invoice_at ? fmtDate(c.last_invoice_at) : '\u2014'}</td>
                    <td>{fmtDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {data && <Pagination total={data.total} page={page} limit={20} onPage={setPage} label={isBusiness ? 'επιχείρηση/ες' : 'ιδιώτης/ες'} />}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── CUSTOMER DETAIL ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function CustomerDetail({ customerId, navigate, toast, loadBadges, lastListView, openXml }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [editValues, setEditValues] = useState({})

  const loadCustomer = useCallback(async (id) => {
    setError(''); setEditing(false)
    try {
      const d = await api('GET', `/admin/customers/${id}`)
      setData(d)
      setEditValues({
        name: d.customer.name || '', email: d.customer.email || '',
        afm: d.customer.afm || '', doy: d.customer.doy || '',
        address: d.customer.address || '', city: d.customer.city || '',
        postal_code: d.customer.postal_code || '', country: d.customer.country || '',
      })
    } catch (e) { setError(e.message) }
  }, [])

  useEffect(() => {
    if (customerId) loadCustomer(customerId) // eslint-disable-line react-hooks/set-state-in-effect
  }, [customerId, loadCustomer])

  const backLabel = lastListView === 'business' ? 'Επιχειρήσεις' : 'Ιδιώτες'

  const saveCustomer = async () => {
    const body = {}
    const c = data.customer
    const hasInvoices = data.invoices.length > 0;
    ['name', 'email', 'address', 'city', 'postal_code', 'country'].forEach(f => { body[f] = editValues[f] })
    if (c.customer_type === 'BUSINESS' && !hasInvoices) {
      body.afm = editValues.afm; body.doy = editValues.doy
    }
    try {
      await api('PUT', `/admin/customers/${c.id}`, body)
      toast('Customer updated successfully.')
      loadCustomer(c.id)
    } catch (e) { toast(e.message, 'err') }
  }

  const resendEmail = async (invoiceId) => {
    try {
      const r = await api('POST', `/admin/invoices/${invoiceId}/resend-email`)
      toast(`✓ Email στάλθηκε στο ${r.to}`)
      loadCustomer(customerId)
    } catch (e) { toast(e.message, 'err') }
  }

  const cancelDocument = async (invoiceId, invoiceNumber) => {
    if (!window.confirm(`Ακύρωση παραστατικού ${invoiceNumber} στην ΑΑΔΕ;\n\nΑυτή η ενέργεια είναι μόνιμη και δεν αναιρείται.`)) return
    try {
      const r = await api('POST', `/admin/invoices/${invoiceId}/cancel`)
      toast(`✓ Ακυρώθηκε ${r.invoice_number} — Ακ. ΜΑΡΚ: ${r.cancellationMark}`)
      loadCustomer(customerId)
      loadBadges()
    } catch (e) { toast(e.message, 'err') }
  }

  const viewXml = async (invoiceId, invoiceNumber) => {
    try {
      const d = await api('GET', `/admin/invoices/${invoiceId}/xml`)
      let meta = `ΜΑΡΚ: ${d.mydata_mark || '\u2014'}  |  Υποβλήθηκε: ${d.submitted_at ? fmtDate(d.submitted_at) : '\u2014'}`
      if (d.cancelled_at) {
        meta += `  |  ⛔ ΑΚΥΡΩΘΗΚΕ: ${fmtDate(d.cancelled_at)}`
        if (d.mydata_cancellation_mark) meta += `  |  Ακ.ΜΑΡΚ: ${d.mydata_cancellation_mark}`
      }
      openXml({ title: `XML — ${invoiceNumber}`, content: d.xml_sent || '', meta })
    } catch (e) { toast(e.message, 'err') }
  }

  const manualIssue = async () => {
    const input = window.prompt('Συνολικό ποσό με ΦΠΑ (EUR):\nπ.χ. 37,1876\n\nΧρησιμοποιήστε όταν η πληρωμή έγινε αλλά το παραστατικό δεν εκδόθηκε (π.χ. διακοπή server).')
    if (!input || !input.trim()) return
    const amount = parseFloat(input.trim().replace(',', '.'))
    if (isNaN(amount) || amount <= 0) { toast('Μη έγκυρο ποσό.', 'err'); return }
    try {
      const r = await api('POST', `/admin/customers/${customerId}/issue-invoice`, { amountTotal: amount })
      toast(`✓ Εκδόθηκε ${r.invoiceNumber} — ΜΑΡΚ: ${r.mark}`)
      loadCustomer(customerId)
    } catch (e) { toast(e.message, 'err') }
  }

  if (error) return <><button className="back-btn" onClick={() => navigate(lastListView)}>← {backLabel}</button><div className="empty">Error: {error}</div></>
  if (!data) return <><button className="back-btn" onClick={() => navigate(lastListView)}>← {backLabel}</button><div className="empty">Loading\u2026</div></>

  const { customer: c, invoices } = data
  const hasInvoices = invoices.length > 0
  const isBusiness = c.customer_type === 'BUSINESS'
  const docLabel = isBusiness ? 'Τιμολόγια' : 'Αποδείξεις'

  return (
    <>
      <button className="back-btn" onClick={() => navigate(lastListView)}>← {backLabel}</button>

      {/* Info card */}
      <div className="card">
        <div className="card-header">
          <h2>{esc(c.name || 'Customer')} <span className={`pill ${isBusiness ? 'type-business' : 'type-individual'}`} style={{ fontSize: 11, marginLeft: 8 }}>{isBusiness ? 'ΕΠΙΧΕΙΡΗΣΗ' : 'ΙΔΙΩΤΗΣ'}</span></h2>
          <button className="abtn abtn-outline abtn-sm" onClick={() => setEditing(!editing)}>Επεξεργασία</button>
        </div>
        <div className="card-body">
          {!editing ? (
            <div className="info-grid">
              <div className="info-item"><label>ΟΝΟΜΑ</label><span>{esc(c.name || '\u2014')}</span></div>
              <div className="info-item"><label>EMAIL</label><span>{esc(c.email || '\u2014')}</span></div>
              {isBusiness && <div className="info-item"><label>ΑΦΜ</label><span>{esc(c.afm || '\u2014')}</span></div>}
              {isBusiness && <div className="info-item"><label>ΔΟΥ</label><span>{esc(c.doy || '\u2014')}</span></div>}
              <div className="info-item"><label>ΔΙΕΥΘΥΝΣΗ</label><span>{esc(c.address || '\u2014')}</span></div>
              <div className="info-item"><label>ΠΟΛΗ</label><span>{esc(c.city || '\u2014')}</span></div>
              <div className="info-item"><label>ΤΚ</label><span>{esc(c.postal_code || '\u2014')}</span></div>
              <div className="info-item"><label>ΧΩΡΑ</label><span>{esc(c.country || '\u2014')}</span></div>
              <div className="info-item"><label>ΣΥΝΔΡΟΜΗ</label><div style={{ marginTop: 4 }}><SubscriptionPill status={c.subscription_status} /></div></div>
            </div>
          ) : (
            <>
              {hasInvoices && isBusiness && (
                <div style={{ background: 'var(--blue-pale)', border: '1px solid var(--blue)', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: 12, color: 'var(--blue)', marginBottom: 16 }}>
                  ⚠️ Ο πελάτης έχει {invoices.length} εκδοθέν/τα παραστατικό/ά. <strong>ΑΦΜ και ΔΟΥ δεν μπορούν να αλλαχτούν</strong> — έχουν ήδη καταχωρηθεί στην ΑΑΔΕ.
                </div>
              )}
              <div className="form-grid">
                {['name', 'email', ...(isBusiness ? ['afm', 'doy'] : []), 'address', 'city', 'postal_code', 'country'].map(f => (
                  <div className="form-group" key={f}>
                    <label>{f.toUpperCase()}</label>
                    <input type="text" value={editValues[f] || ''} readOnly={(f === 'afm' || f === 'doy') && hasInvoices}
                      onChange={e => setEditValues(prev => ({ ...prev, [f]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <div className="gap-8 mt16">
                <button className="abtn abtn-primary abtn-sm" onClick={saveCustomer}>Αποθήκευση</button>
                <button className="abtn abtn-outline abtn-sm" onClick={() => setEditing(false)}>Ακύρωση</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="card mt24">
        <div className="card-header">
          <h2>{docLabel} ({invoices.length})</h2>
          <div className="gap-8">
            {invoices.length > 0 && <a href={`/admin/customers/${c.id}/invoices/zip`} className="abtn abtn-outline abtn-sm">↓ Λήψη Όλων (ZIP)</a>}
            <button className="abtn abtn-primary abtn-sm" onClick={manualIssue}>+ Χειροκίνητη Έκδοση</button>
          </div>
        </div>
        <div className="table-wrap">
          {!invoices.length ? <div className="empty">Δεν υπάρχουν {docLabel.toLowerCase()} ακόμα.</div> : (
            <table>
              <thead><tr>
                <th>Τύπος</th><th>Αριθμός</th><th>Ημερομηνία</th><th>Καθαρή</th><th>ΦΠΑ</th><th>Σύνολο</th><th>ΜΑΡΚ</th><th>Κατάσταση</th><th>ΑΑΔΕ</th><th>Email</th><th>Αρχεία</th>
              </tr></thead>
              <tbody>
                {invoices.map(i => (
                  <tr key={i.id}>
                    <td><DocTypePill type={i.document_type} /></td>
                    <td><strong>{esc(i.invoice_number)}</strong></td>
                    <td>{fmtDate(i.issued_at)}</td>
                    <td>{fmtAmt(i.amount_net)} {esc(i.currency)}</td>
                    <td>{fmtAmt(i.vat_amount)} {esc(i.currency)}</td>
                    <td><strong>{fmtAmt(i.amount_total)} {esc(i.currency)}</strong></td>
                    <td>
                      <code style={{ fontSize: 12 }}>{esc(i.mydata_mark || '\u2014')}</code>
                      {i.mydata_uid && <><br /><span style={{ fontSize: 9, color: 'var(--gray-400)' }} title={`UID: ${i.mydata_uid}`}>UID: {i.mydata_uid.slice(0, 8)}\u2026</span></>}
                    </td>
                    <td><StatusCell invoice={i} /></td>
                    <td><AadeCell invoice={i} /></td>
                    <td>
                      {i.cancelled_at
                        ? (i.email_sent_at ? <span style={{ fontSize: 11, color: 'var(--gray-400)' }} title="Στάλθηκε πριν την ακύρωση">✓ {fmtDate(i.email_sent_at)}</span> : <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>&mdash;</span>)
                        : !i.mydata_mark ? <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>&mdash;</span>
                          : i.email_sent_at ? <><span style={{ fontSize: 11, color: '#15803d' }}>✓ {fmtDate(i.email_sent_at)}</span> <button className="abtn abtn-outline abtn-sm" style={{ marginLeft: 6 }} onClick={() => resendEmail(i.id)}>↺</button></>
                            : <button className="abtn abtn-danger abtn-sm" onClick={() => resendEmail(i.id)}>Αποστολή</button>}
                    </td>
                    <td className="gap-8">
                      <a href={`/admin/invoices/${i.id}/pdf`} target="_blank" rel="noopener noreferrer" className="abtn abtn-outline abtn-sm">PDF</a>
                      <button className="abtn abtn-outline abtn-sm" onClick={() => viewXml(i.id, i.invoice_number)}>XML</button>
                      {i.mydata_mark && !i.cancelled_at && <button className="abtn abtn-danger abtn-sm" onClick={() => cancelDocument(i.id, i.invoice_number)}>Ακύρωση</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── DOCUMENTS (INVOICES/RECEIPTS) ───────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function Documents({ navigate, toast, openXml, loadBadges }) {
  const [docType, setDocType] = useState('invoice')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setError('')
    try {
      const q = new URLSearchParams({ page, limit: 20, documentType: docType, ...(search && { search }) })
      setData(await api('GET', `/admin/invoices?${q}`))
    } catch (e) { setError(e.message) }
  }, [page, search, docType])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const switchType = (t) => { setDocType(t); setPage(1); setSearch(''); setSearchInput('') }
  const doSearch = () => { setPage(1); setSearch(searchInput) }

  const viewXml = async (invoiceId, invoiceNumber) => {
    try {
      const d = await api('GET', `/admin/invoices/${invoiceId}/xml`)
      let meta = `ΜΑΡΚ: ${d.mydata_mark || '\u2014'}  |  Υποβλήθηκε: ${d.submitted_at ? fmtDate(d.submitted_at) : '\u2014'}`
      if (d.cancelled_at) { meta += `  |  ⛔ ΑΚΥΡΩΘΗΚΕ: ${fmtDate(d.cancelled_at)}`; if (d.mydata_cancellation_mark) meta += `  |  Ακ.ΜΑΡΚ: ${d.mydata_cancellation_mark}` }
      openXml({ title: `XML — ${invoiceNumber}`, content: d.xml_sent || '', meta })
    } catch (e) { toast(e.message, 'err') }
  }

  const cancelDoc = async (id, num) => {
    if (!window.confirm(`Ακύρωση παραστατικού ${num} στην ΑΑΔΕ;\n\nΑυτή η ενέργεια είναι μόνιμη και δεν αναιρείται.`)) return
    try {
      const r = await api('POST', `/admin/invoices/${id}/cancel`)
      toast(`✓ Ακυρώθηκε ${r.invoice_number} — Ακ. ΜΑΡΚ: ${r.cancellationMark}`)
      load(); loadBadges()
    } catch (e) { toast(e.message, 'err') }
  }

  const isInvoice = docType === 'invoice'
  const tabLabel = isInvoice ? 'τιμολόγια' : 'αποδείξεις'

  return (
    <>
      <div className="page-header"><h1>Παραστατικά</h1></div>
      <div className="card">
        <div className="card-header">
          <div className="tab-bar" style={{ marginBottom: 0, borderBottom: 'none' }}>
            <button className={`tab-btn ${isInvoice ? 'active' : ''}`} onClick={() => switchType('invoice')}>Τιμολόγια</button>
            <button className={`tab-btn ${!isInvoice ? 'active' : ''}`} onClick={() => switchType('receipt')}>Αποδείξεις</button>
          </div>
          <div className="gap-8" style={{ marginLeft: 'auto' }}>
            <input type="text" placeholder="Αριθμός, πελάτης ή email\u2026" value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()} style={{ width: 220 }} />
            <button className="abtn abtn-primary abtn-sm" onClick={doSearch}>Αναζήτηση</button>
            <button className="abtn abtn-outline abtn-sm" onClick={() => { window.location.href = `/admin/invoices/zip?documentType=${docType}${search ? `&search=${encodeURIComponent(search)}` : ''}` }}>↓ ZIP</button>
          </div>
        </div>
        <div className="table-wrap">
          {error && <div className="empty">Error: {error}</div>}
          {!error && !data && <div className="empty">Loading\u2026</div>}
          {!error && data && !data.data.length && <div className="empty">Δεν βρέθηκαν {tabLabel}.</div>}
          {!error && data?.data.length > 0 && (
            <table>
              <thead><tr>
                <th>Αριθμός</th><th>Πελάτης</th><th>Email</th><th>Ημερομηνία</th><th>Καθαρή</th><th>ΦΠΑ</th><th>Σύνολο</th><th>ΜΑΡΚ</th><th>Κατάσταση</th><th>ΑΑΔΕ</th><th>Αρχεία</th>
              </tr></thead>
              <tbody>
                {data.data.map(i => (
                  <tr key={i.id}>
                    <td><strong>{esc(i.invoice_number)}</strong></td>
                    <td>{i.customer_id ? <span className="clickable" onClick={() => navigate('customer', i.customer_id)}>{esc(i.customer_name || '\u2014')}</span> : esc(i.customer_name || '\u2014')}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-600)' }}>{esc(i.customer_email || '\u2014')}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(i.issued_at)}</td>
                    <td>{fmtAmt(i.amount_net)} {esc(i.currency)}</td>
                    <td>{fmtAmt(i.vat_amount)} {esc(i.currency)}</td>
                    <td><strong>{fmtAmt(i.amount_total)} {esc(i.currency)}</strong></td>
                    <td><code style={{ fontSize: 11 }}>{esc(i.mydata_mark || '\u2014')}</code>{i.mydata_uid && <><br /><span style={{ fontSize: 9, color: 'var(--gray-400)' }}>UID: {i.mydata_uid.slice(0, 8)}\u2026</span></>}</td>
                    <td><StatusCell invoice={i} /></td>
                    <td><AadeCell invoice={i} /></td>
                    <td className="gap-8">
                      <a href={`/admin/invoices/${i.id}/pdf`} target="_blank" rel="noopener noreferrer" className="abtn abtn-outline abtn-sm">PDF</a>
                      <button className="abtn abtn-outline abtn-sm" onClick={() => viewXml(i.id, i.invoice_number)}>XML</button>
                      {i.mydata_mark && !i.cancelled_at && <button className="abtn abtn-danger abtn-sm" onClick={() => cancelDoc(i.id, i.invoice_number)}>Ακύρωση</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {data && <Pagination total={data.total} page={page} limit={20} onPage={setPage} label={isInvoice ? 'τιμολόγιο/α' : 'απόδειξη/εις'} />}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── PAYMENTS ────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function Payments({ navigate }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [source, setSource] = useState('')
  const [docType, setDocType] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const sourceLabel = { checkout: 'Checkout', renewal: 'Ανανέωση', payment_link: 'Payment Link', manual_admin: 'Χειροκίνητη', unknown: 'Άγνωστη' }

  const load = useCallback(async () => {
    setError('')
    try {
      const q = new URLSearchParams({ page, limit: 20, ...(search && { search }), ...(source && { source }), ...(docType && { documentType: docType }), ...(statusFilter && { status: statusFilter }) })
      setData(await api('GET', `/admin/payments?${q}`))
    } catch (e) { setError(e.message) }
  }, [page, search, source, docType, statusFilter])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const doSearch = () => { setPage(1); setSearch(searchInput); setSource(document.getElementById('pay-source-s')?.value || ''); setDocType(document.getElementById('pay-doctype-s')?.value || ''); setStatusFilter(document.getElementById('pay-status-s')?.value || '') }

  return (
    <>
      <div className="page-header"><h1>Πληρωμές</h1></div>
      <div className="card">
        <div className="card-header"><h2>Όλες οι Πληρωμές</h2></div>
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <div className="search-bar">
            <input type="text" placeholder="Αναζήτηση με όνομα, email, αρ. παραστατικού, pi\u2026" value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()} />
            <select id="pay-status-s" defaultValue={statusFilter} style={{ width: 140 }}>
              <option value="">Όλες οι καταστάσεις</option><option value="success">Επιτυχία</option><option value="failed">Αποτυχία</option><option value="pending">Εκκρεμεί</option>
            </select>
            <select id="pay-source-s" defaultValue={source} style={{ width: 160 }}>
              <option value="">Όλες οι πηγές</option><option value="checkout">Checkout</option><option value="renewal">Ανανέωση</option><option value="payment_link">Payment Link</option><option value="manual_admin">Χειροκίνητη</option>
            </select>
            <select id="pay-doctype-s" defaultValue={docType} style={{ width: 150 }}>
              <option value="">Τιμολόγια & Αποδείξεις</option><option value="invoice">Τιμολόγια (B2B)</option><option value="receipt">Αποδείξεις (B2C)</option>
            </select>
            <button className="abtn abtn-primary" onClick={doSearch}>Αναζήτηση</button>
          </div>
        </div>
        <div className="table-wrap">
          {error && <div className="empty">Error: {error}</div>}
          {!error && !data && <div className="empty">Loading\u2026</div>}
          {!error && data && !data.data.length && <div className="empty">Δεν βρέθηκαν πληρωμές.</div>}
          {!error && data?.data.length > 0 && (
            <table>
              <thead><tr>
                <th>Ημερομηνία</th><th>Πελάτης</th><th>Email</th><th>Τύπος</th><th>Αριθμός</th><th style={{ textAlign: 'right' }}>Ποσό</th><th>Νόμ.</th><th>Πηγή</th><th>Κατάσταση</th><th>Λεπτομέρειες</th><th></th>
              </tr></thead>
              <tbody>
                {data.data.map((p, idx) => {
                  const cancelled = !!p.cancelled_at
                  const failed = p.attempt_status === 'failed'
                  const pending = p.attempt_status === 'pending'
                  const rowStyle = cancelled ? { opacity: 0.5, textDecoration: 'line-through' } : failed ? { background: '#fef2f2' } : pending ? { background: '#fffbeb' } : {}
                  return (
                    <tr key={idx} style={rowStyle}>
                      <td>{fmtDate(p.attempted_at)}</td>
                      <td>{p.customer_id ? <span className="clickable" onClick={() => navigate('customer', p.customer_id)}>{esc(p.customer_name || p.customer_email || '\u2014')}</span> : <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>}</td>
                      <td>{esc(p.customer_email || '\u2014')}</td>
                      <td><DocTypePill type={p.document_type} /></td>
                      <td>{p.invoice_number ? <strong>{esc(p.invoice_number)}</strong> : <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>}</td>
                      <td style={{ textAlign: 'right' }}><strong>{fmtAmt(p.amount_total)}</strong></td>
                      <td>{esc(p.currency)}</td>
                      <td><span className={`pill pill-${p.payment_source === 'renewal' ? 'pending' : p.payment_source === 'manual_admin' ? 'failed' : 'success'}`} style={{ fontSize: 10 }}>{esc(sourceLabel[p.payment_source] || p.payment_source || '\u2014')}</span></td>
                      <td><StatusPill status={p.attempt_status} /></td>
                      <td style={{ fontSize: 11, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.error_message || ''}>{failed ? esc(p.error_message || '\u2014') : p.email_sent_at ? <span style={{ color: 'var(--green)' }}>✓ Email</span> : <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>}</td>
                      <td>{cancelled ? <span className="pill pill-failed" style={{ fontSize: 10 }}>ΑΚΥΡΩΘΗΚΕ</span> : null}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        {data && <Pagination total={data.total} page={page} limit={20} onPage={setPage} label="πληρωμή/ές" />}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── FAILED ATTEMPTS ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function Attempts({ navigate, toast, loadBadges }) {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('failed')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setError('')
    try {
      const q = new URLSearchParams({ page, limit: 20, ...(status && { status }) })
      setData(await api('GET', `/admin/attempts?${q}`))
    } catch (e) { setError(e.message) }
  }, [page, status])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const retry = async (id) => {
    try {
      const r = await api('POST', `/admin/attempts/${id}/retry`)
      toast(`✓ Issued ${r.invoiceNumber} — ΜΑΡΚ ${r.mark}`)
      loadBadges(); load()
    } catch (e) { toast(e.message, 'err') }
  }

  return (
    <>
      <div className="page-header"><h1>Failed Attempts</h1></div>
      <div className="card">
        <div className="card-header">
          <h2>Παραστατικά που χρειάζονται προσοχή</h2>
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
            <option value="failed">Failed</option><option value="">All</option><option value="success">Success</option><option value="pending">Pending</option>
          </select>
        </div>
        <div className="table-wrap">
          {error && <div className="empty">Error: {error}</div>}
          {!error && !data && <div className="empty">Loading\u2026</div>}
          {!error && data && !data.data.length && <div className="empty">Δεν βρέθηκαν {status || ''} απόπειρες.</div>}
          {!error && data?.data.length > 0 && (
            <table>
              <thead><tr><th>Τύπος</th><th>Ημερομηνία</th><th>Πελάτης</th><th>Κατάσταση</th><th>Στάδιο</th><th>Αριθμός</th><th>ΜΑΡΚ</th><th>Ποσό</th><th>Σφάλμα</th><th></th></tr></thead>
              <tbody>
                {data.data.map(a => (
                  <tr key={a.id}>
                    <td><DocTypePill type={a.document_type} /></td>
                    <td>{fmtDate(a.attempted_at)}</td>
                    <td>{a.customer_id ? <span className="clickable" onClick={() => navigate('customer', a.customer_id)}>{esc(a.customer_name || '\u2014')}</span> : esc(a.stripe_customer_id || '\u2014')}</td>
                    <td><StatusPill status={a.status} /></td>
                    <td>{a.error_stage ? <code style={{ fontSize: 11 }}>{esc(a.error_stage)}</code> : '\u2014'}</td>
                    <td>{a.invoice_number ? esc(a.invoice_number) : '\u2014'}</td>
                    <td><code style={{ fontSize: 11 }}>{esc(a.mydata_mark || '\u2014')}</code></td>
                    <td>{fmtAmt(a.amount_total)} {esc(a.currency)}</td>
                    <td style={{ maxWidth: 180, fontSize: 11, color: 'var(--red)' }}>{esc(a.error_message || '')}</td>
                    <td>{a.status === 'failed' && <button className="abtn abtn-success abtn-sm" onClick={() => retry(a.id)}>Retry</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {data && <Pagination total={data.total} page={page} limit={20} onPage={setPage} label="απόπειρα/ες" />}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── PAYMENT EVENTS ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function PaymentEvents({ navigate }) {
  const [page, setPage] = useState(1)
  const [issues, setIssues] = useState(null)
  const [events, setEvents] = useState(null)

  useEffect(() => {
    Promise.allSettled([
      api('GET', '/admin/customers-with-issues'),
      api('GET', `/admin/payment-events?page=${page}&limit=20`),
    ]).then(([iss, ev]) => {
      if (iss.status === 'fulfilled') setIssues(iss.value)
      if (ev.status === 'fulfilled') setEvents(ev.value)
    })
  }, [page])

  return (
    <>
      <div className="page-header"><h1>Payment Status</h1></div>
      <div className="card">
        <div className="card-header"><h2>Ενεργά Προβλήματα Πληρωμής</h2></div>
        <div className="table-wrap">
          {!issues ? <div className="empty">Loading\u2026</div> : !issues.data.length ? <div className="empty" style={{ color: '#15803d' }}>✓ Δεν υπάρχουν ενεργά προβλήματα πληρωμής.</div> : (
            <table>
              <thead><tr><th>Πελάτης</th><th>Email</th><th>Τύπος</th><th>Κατάσταση</th><th>Αποτυχίες</th><th>Τελευταία Αποτυχία</th><th>Τελευταία Πληρωμή</th></tr></thead>
              <tbody>
                {issues.data.map(c => (
                  <tr key={c.id} style={{ background: '#fff7ed' }}>
                    <td className="clickable" onClick={() => navigate('customer', c.id)}>{esc(c.name || c.email || '\u2014')}</td>
                    <td>{esc(c.email || '\u2014')}</td>
                    <td><span className={`pill ${c.customer_type === 'BUSINESS' ? 'type-business' : 'type-individual'}`}>{esc(c.customer_type)}</span></td>
                    <td><SubscriptionPill status={c.subscription_status} /></td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--red)' }}>{c.failure_count}</td>
                    <td>{c.last_failure_at ? fmtDate(c.last_failure_at) : '\u2014'}</td>
                    <td>{c.last_paid_at ? fmtDate(c.last_paid_at) : '\u2014'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="card mt24">
        <div className="card-header"><h2>Ιστορικό Αποτυχιών Πληρωμής</h2></div>
        <div className="table-wrap">
          {!events ? <div className="empty">Loading\u2026</div> : !events.data.length ? <div className="empty">Δεν υπάρχουν αποτυχίες πληρωμής.</div> : (
            <table>
              <thead><tr><th>Ημερομηνία</th><th>Πελάτης</th><th>Ποσό</th><th>Απόπειρα #</th><th>Λόγος</th><th>Τρέχουσα Κατάσταση</th></tr></thead>
              <tbody>
                {events.data.map((e, i) => {
                  const resolved = e.subscription_status === 'active' || e.subscription_status === 'trialing'
                  return (
                    <tr key={i} style={resolved ? { opacity: 0.55 } : {}}>
                      <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(e.processed_at)}</td>
                      <td>{e.customer_id ? <span className="clickable" onClick={() => navigate('customer', e.customer_id)}>{esc(e.customer_name || '\u2014')}</span> : <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>{esc(e.stripe_customer_id || '\u2014')}</span>}</td>
                      <td>{e.amount_due != null ? `${fmtAmt(e.amount_due)} ${esc(e.currency || '')}` : '\u2014'}</td>
                      <td style={{ textAlign: 'center' }}>{e.attempt_count != null ? `#${e.attempt_count}` : '\u2014'}</td>
                      <td style={{ fontSize: 11, color: 'var(--gray-600)' }}>{esc(e.billing_reason || '\u2014')}</td>
                      <td><SubscriptionPill status={e.subscription_status} />{resolved && <span style={{ fontSize: 10, color: '#15803d', marginLeft: 4 }}>✓ resolved</span>}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        {events && <Pagination total={events.total} page={page} limit={20} onPage={setPage} label="συμβάν/τα" />}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── PENDING CANCELLATIONS ───────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function PendingCancellations({ toast, loadBadges }) {
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    try { setData(await api('GET', '/admin/invoices/pending-cancellation')) } catch { /* */ }
  }, [])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const settle = async (id) => {
    const input = document.getElementById(`cm-${id}`)
    const mark = input?.value?.trim()
    if (!mark) { toast('Εισάγετε το Cancellation Mark.', 'err'); return }
    try {
      await api('POST', `/admin/invoices/${id}/settle-cancellation`, { cancellationMark: mark })
      toast('Το Cancellation Mark καταχωρίστηκε.')
      load(); loadBadges()
    } catch (e) { toast(e.message, 'err') }
  }

  return (
    <>
      <div className="page-header"><h1>Εκκρεμείς Ακυρώσεις</h1></div>
      <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid var(--yellow)', padding: '16px 20px', background: '#fffbeb' }}>
        <strong>Τι χρειάζεται;</strong> Τα παραστατικά παρακάτω έχουν επιστραφεί (refund) μέσω Stripe αλλά ο ενεργός πάροχος (Etimologiera) δεν διαθέτει API ακύρωσης.
        Ακυρώστε κάθε παραστατικό <strong>χειροκίνητα</strong> στην πλατφόρμα του παρόχου και καταχωρίστε το Cancellation Mark εδώ.
      </div>
      {!data ? <div className="empty">Φόρτωση\u2026</div> : !data.data.length ? (
        <div className="card"><div className="card-body"><div className="empty">Δεν υπάρχουν εκκρεμείς ακυρώσεις.</div></div></div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Αρ. Παραστατικού</th><th>Τύπος</th><th>Πελάτης</th><th>ΜΑΡΚ</th><th>Ποσό</th><th>Ακυρώθηκε</th><th>Cancellation Mark</th></tr></thead>
              <tbody>
                {data.data.map(inv => (
                  <tr key={inv.id}>
                    <td>{esc(inv.invoice_number)}</td>
                    <td>{inv.document_type === 'invoice' ? 'Τιμολόγιο' : 'Απόδειξη'}</td>
                    <td>{esc(inv.customer_name || '\u2014')}<br /><small style={{ color: 'var(--gray-400)' }}>{esc(inv.customer_email || '')}</small></td>
                    <td>{esc(String(inv.mydata_mark || '\u2014'))}</td>
                    <td>{parseFloat(inv.amount_total).toFixed(2)} {esc(inv.currency)}</td>
                    <td>{inv.cancelled_at ? new Date(inv.cancelled_at).toLocaleDateString('el-GR') : '\u2014'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <input type="text" id={`cm-${inv.id}`} placeholder="Cancellation Mark" style={{ width: 160, fontSize: 13 }} />
                        <button className="abtn abtn-primary abtn-sm" onClick={() => settle(inv.id)}>Καταχώριση</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── RECONCILE ΑΑΔΕ ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function ReconcileAade({ toast }) {
  const [fromMark, setFromMark] = useState('0')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    try {
      setResult(await api('GET', `/admin/mydata-reconcile?fromMark=${encodeURIComponent(fromMark || '0')}`))
    } catch (e) { toast(e.message, 'err') }
    setLoading(false)
  }

  return (
    <>
      <div className="page-header"><h1>Reconcile ΑΑΔΕ</h1></div>
      <div className="card">
        <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div className="gap-8" style={{ flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, color: 'var(--gray-600)' }}>Από ΜΑΡΚ:</label>
            <input type="number" value={fromMark} onChange={e => setFromMark(e.target.value)} style={{ width: 150 }} placeholder="0 = αρχή" />
            <button className="abtn abtn-primary abtn-sm" onClick={run} disabled={loading}>{loading ? 'Φόρτωση\u2026' : 'Εκτέλεση'}</button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Καλεί το RequestTransmittedDocs της ΑΑΔΕ και συγκρίνει τα επιστρεφόμενα ΜΑΡΚ με την τοπική βάση.</div>
        </div>
        {!result ? <div className="empty">Συμπληρώστε το εύρος και πατήστε Εκτέλεση.</div> : (
          <div>
            <div style={{ display: 'flex', gap: 16, padding: 16, flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--blue-pale)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--blue)' }}>{result.aadeCount}</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>ΜΑΡΚ στην ΑΑΔΕ</div></div>
              <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: '#15803d' }}>{result.localCount}</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Τοπικά παραστατικά</div></div>
              {result.onlyInAade.length ? (
                <div style={{ background: '#fef2f2', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--red)' }}>{result.onlyInAade.length}</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Μόνο στην ΑΑΔΕ ⚠</div></div>
              ) : (
                <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: '#15803d' }}>✓</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Καμία απόκλιση</div></div>
              )}
            </div>
            {result.onlyInAade.length > 0 && (
              <div style={{ padding: '0 16px 16px' }}>
                <h3 style={{ color: 'var(--red)', marginBottom: 8 }}>⚠ ΜΑΡΚ που έχει η ΑΑΔΕ αλλά λείπουν τοπικά</h3>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 4, padding: 10, fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{result.onlyInAade.join(', ')}</div>
              </div>
            )}
            {result.onlyLocal.length > 0 && (
              <div style={{ padding: '0 16px 16px' }}>
                <h3 style={{ color: 'var(--gray-600)', marginBottom: 8 }}>Τοπικά ΜΑΡΚ εκτός batch ΑΑΔΕ</h3>
                <div className="table-wrap"><table><thead><tr><th>ΜΑΡΚ</th><th>Αριθμός</th><th>Τύπος</th><th>Κατάσταση</th></tr></thead><tbody>
                  {result.onlyLocal.map((r, i) => (<tr key={i}><td><code style={{ fontSize: 11 }}>{esc(r.mark)}</code></td><td>{esc(r.invoice_number)}</td><td><DocTypePill type={r.document_type} /></td><td>{r.cancelled_at ? <span style={{ color: '#b91c1c', fontSize: 11, fontWeight: 600 }}>Ακυρωμένο</span> : <span style={{ color: '#15803d', fontSize: 11, fontWeight: 600 }}>Ενεργό</span>}</td></tr>))}
                </tbody></table></div>
              </div>
            )}
            {result.pagination && <div style={{ padding: '0 16px 16px', fontSize: 11, color: 'var(--gray-600)' }}>Υπάρχουν περισσότερα αποτελέσματα — χρησιμοποιήστε μεγαλύτερο fromMark.</div>}
          </div>
        )}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── RECONCILE STRIPE ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function ReconcileStripe({ navigate }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('missingInvoices')

  const run = async () => {
    setLoading(true)
    try { setData(await api('GET', '/admin/stripe-reconcile')); setFilter('missingInvoices') } catch { /* */ }
    setLoading(false)
  }

  const categories = data ? [
    { key: 'missingInvoices', label: 'Χωρίς Παραστατικό', count: data.missingInvoices.length, sev: 'red' },
    { key: 'statusMismatches', label: 'Κατάσταση Συνδρομής', count: data.statusMismatches.length, sev: 'yellow' },
    { key: 'emailMismatches', label: 'Email', count: data.emailMismatches.length, sev: 'yellow' },
    { key: 'missingLocally', label: 'Μόνο στο Stripe', count: data.missingLocally.length, sev: 'gray' },
    { key: 'missingInStripe', label: 'Μόνο Τοπικά', count: data.missingInStripe.length, sev: 'red' },
  ] : []

  return (
    <>
      <div className="page-header"><h1>Reconcile Stripe</h1></div>
      <div className="card">
        <div className="card-header"><h2>Σύγκριση Stripe με τοπική βάση</h2><button className="abtn abtn-primary abtn-sm" onClick={run} disabled={loading}>{loading ? 'Φόρτωση\u2026' : 'Εκτέλεση'}</button></div>
        <div style={{ padding: '12px 20px', fontSize: 12, color: 'var(--gray-600)', borderBottom: '1px solid var(--gray-100)' }}>Ανακτά πελάτες, συνδρομές και χρεώσεις (τελευταίοι 6 μήνες) από το Stripe API και τα συγκρίνει με τα τοπικά δεδομένα.</div>
        {!data ? <div className="empty">Πατήστε Εκτέλεση για να ξεκινήσει ο έλεγχος.</div> : (
          <>
            <div style={{ display: 'flex', gap: 16, padding: 16, flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--blue-pale)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--blue)' }}>{data.summary.stripeCustomers}</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Stripe Customers</div></div>
              <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: '#15803d' }}>{data.summary.localCustomers}</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Local Customers</div></div>
              <div style={{ background: '#fef3c7', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 700, color: '#b45309' }}>{data.summary.stripeSubscriptions}</div><div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Stripe Subscriptions</div></div>
            </div>
            <div className="tab-bar" style={{ padding: '0 16px', marginBottom: 0 }}>
              {categories.map(c => c.count > 0
                ? <button key={c.key} className={`tab-btn ${filter === c.key ? 'active' : ''}`} onClick={() => setFilter(c.key)}>{c.label} <span className={`badge`}>{c.count}</span></button>
                : <button key={c.key} className="tab-btn" disabled style={{ opacity: 0.4 }}>{c.label} (0)</button>)}
            </div>
            {filter === 'missingInvoices' && data.missingInvoices.length > 0 && (
              <div className="table-wrap" style={{ margin: 16 }}><table><thead><tr><th>Payment Intent</th><th>Ποσό</th><th>Πελάτης</th><th>Email</th><th>Ημερομηνία</th><th>Refunded</th><th>Attempt</th></tr></thead><tbody>
                {data.missingInvoices.map((m, i) => (<tr key={i}><td><code style={{ fontSize: 11 }}>{esc(m.payment_intent)}</code></td><td><strong>{fmtAmt(m.amount)} {esc(m.currency)}</strong></td><td style={{ fontSize: 12 }}>{esc(m.customer_name || '\u2014')}</td><td style={{ fontSize: 12 }}>{esc(m.customer_email || '\u2014')}</td><td style={{ whiteSpace: 'nowrap' }}>{new Date(m.created * 1000).toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td><td>{m.refunded ? <span className="pill pill-failed">YES</span> : <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>}</td><td>{m.attempt_status ? <StatusPill status={m.attempt_status} /> : <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>}</td></tr>))}
              </tbody></table></div>
            )}
            {filter === 'statusMismatches' && data.statusMismatches.length > 0 && (
              <div className="table-wrap" style={{ margin: 16 }}><table><thead><tr><th>Πελάτης</th><th>Email</th><th>Τοπική</th><th>Stripe</th></tr></thead><tbody>
                {data.statusMismatches.map((m, i) => (<tr key={i}><td className="clickable" onClick={() => navigate('customer', m.id)}>{esc(m.name || '\u2014')}</td><td>{esc(m.email || '\u2014')}</td><td><SubscriptionPill status={m.local_status} /></td><td><SubscriptionPill status={m.stripe_status} /></td></tr>))}
              </tbody></table></div>
            )}
            {filter === 'emailMismatches' && data.emailMismatches.length > 0 && (
              <div className="table-wrap" style={{ margin: 16 }}><table><thead><tr><th>Πελάτης</th><th>Τοπικό Email</th><th>Stripe Email</th></tr></thead><tbody>
                {data.emailMismatches.map((m, i) => (<tr key={i}><td className="clickable" onClick={() => navigate('customer', m.id)}>{esc(m.name || '\u2014')}</td><td>{esc(m.local_email)}</td><td>{esc(m.stripe_email)}</td></tr>))}
              </tbody></table></div>
            )}
            {filter === 'missingLocally' && data.missingLocally.length > 0 && (
              <div className="table-wrap" style={{ margin: 16 }}><table><thead><tr><th>Stripe ID</th><th>Email</th><th>Όνομα</th><th>Δημιουργία</th></tr></thead><tbody>
                {data.missingLocally.map((m, i) => (<tr key={i}><td><code style={{ fontSize: 11 }}>{esc(m.stripe_id)}</code></td><td>{esc(m.email || '\u2014')}</td><td>{esc(m.name || '\u2014')}</td><td>{new Date(m.created * 1000).toLocaleDateString('el-GR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td></tr>))}
              </tbody></table></div>
            )}
            {filter === 'missingInStripe' && data.missingInStripe.length > 0 && (
              <div className="table-wrap" style={{ margin: 16 }}><table><thead><tr><th>ID</th><th>Stripe ID</th><th>Email</th><th>Όνομα</th></tr></thead><tbody>
                {data.missingInStripe.map((m, i) => (<tr key={i}><td>{m.id}</td><td><code style={{ fontSize: 11 }}>{esc(m.stripe_customer_id)}</code></td><td>{esc(m.email || '\u2014')}</td><td>{esc(m.name || '\u2014')}</td></tr>))}
              </tbody></table></div>
            )}
          </>
        )}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── PLUGINS ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function Plugins({ toast }) {
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    try { setData(await api('GET', '/admin/plugins')) } catch { /* */ }
  }, [])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const toggle = async (name, enable) => {
    try {
      await api('PUT', `/admin/plugins/${encodeURIComponent(name)}/${enable ? 'enable' : 'disable'}`)
      toast(enable ? `Plugin "${name}" ενεργοποιήθηκε.` : `Plugin "${name}" απενεργοποιήθηκε.`)
      load()
    } catch (e) { toast(e.message, 'err') }
  }

  if (!data) return <><div className="page-header"><h1>Plugins</h1></div><div className="empty">Φόρτωση\u2026</div></>

  const byType = {}
  for (const p of data.data) { if (!byType[p.plugin_type]) byType[p.plugin_type] = []; byType[p.plugin_type].push(p) }

  return (
    <>
      <div className="page-header"><h1>Plugins</h1></div>
      {Object.entries(byType).map(([type, plugins]) => {
        const typeLabel = type === 'submission_provider' ? 'Πάροχος Υποβολής (ΑΑΔΕ)' : type === 'validation_provider' ? 'Επικύρωση & Άντληση Στοιχείων' : type
        return (
          <div className="card" key={type} style={{ marginBottom: 16 }}>
            <div className="card-header"><h2>{typeLabel}</h2><small style={{ color: 'var(--gray-400)' }}>Μόνο ένας μπορεί να είναι ενεργός τη φορά</small></div>
            <div className="card-body" style={{ padding: 0 }}>
              {plugins.map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: '1px solid var(--gray-100)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{esc(p.display_name)}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 2 }}>{esc(p.description || '')}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>Τελευταία αλλαγή: {p.updated_at ? new Date(p.updated_at).toLocaleString('el-GR') : '\u2014'}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: p.enabled ? 'var(--green)' : 'var(--gray-400)', background: p.enabled ? '#dcfce7' : 'var(--gray-100)', padding: '3px 10px', borderRadius: 99 }}>{p.enabled ? 'ΕΝΕΡΓΟΣ' : 'ΑΝΕΝΕΡΓΟΣ'}</span>
                  {p.enabled
                    ? <button className="abtn abtn-outline abtn-sm" onClick={() => toggle(p.name, false)}>Απενεργοποίηση</button>
                    : <button className="abtn abtn-primary abtn-sm" onClick={() => toggle(p.name, true)}>Ενεργοποίηση</button>}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── SETTINGS (Stripe Price IDs etc.) ────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function Settings({ toast }) {
  const [data, setData] = useState(null)
  const [editing, setEditing] = useState({})

  const load = useCallback(async () => {
    try { setData(await api('GET', '/admin/settings')) } catch { /* */ }
  }, [])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  const save = async (key) => {
    try {
      await api('PUT', `/admin/settings/${encodeURIComponent(key)}`, { value: editing[key] ?? '' })
      toast('Αποθηκεύτηκε.')
      setEditing(prev => { const n = { ...prev }; delete n[key]; return n })
      load()
    } catch (e) { toast(e.message, 'err') }
  }

  if (!data) return null

  const LABELS = {
    stripe_price_webdesign: 'Web Design & Maintenance',
    stripe_price_invoicing: 'Ηλεκτρονική Τιμολόγηση',
    stripe_price_bundle: 'Πακέτο (και τα δύο)',
  }

  return (
    <>
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header"><h2>Stripe Τιμές</h2><small style={{ color: 'var(--gray-400)' }}>Stripe Price IDs για κάθε υπηρεσία</small></div>
        <div className="card-body" style={{ padding: 0 }}>
          {data.data.filter(s => s.setting_key.startsWith('stripe_price_')).map(s => {
            const isEditing = s.setting_key in editing
            return (
              <div key={s.setting_key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{esc(LABELS[s.setting_key] || s.setting_key)}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{esc(s.setting_key)}</div>
                </div>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editing[s.setting_key]}
                      onChange={e => setEditing(prev => ({ ...prev, [s.setting_key]: e.target.value }))}
                      placeholder="price_..."
                      style={{ flex: 1, padding: '6px 10px', border: '1px solid var(--gray-200)', borderRadius: 6, fontSize: 13, fontFamily: 'monospace' }}
                    />
                    <button className="abtn abtn-primary abtn-sm" onClick={() => save(s.setting_key)}>Αποθήκευση</button>
                    <button className="abtn abtn-outline abtn-sm" onClick={() => setEditing(prev => { const n = { ...prev }; delete n[s.setting_key]; return n })}>Ακύρωση</button>
                  </>
                ) : (
                  <>
                    <code style={{ fontSize: 12, color: s.setting_value ? 'var(--gray-700)' : 'var(--red)', background: 'var(--gray-50)', padding: '4px 8px', borderRadius: 4, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.setting_value || '(δεν έχει οριστεί)'}
                    </code>
                    <button className="abtn abtn-outline abtn-sm" onClick={() => setEditing(prev => ({ ...prev, [s.setting_key]: s.setting_value }))}>Επεξεργασία</button>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── MYDATA LOG ──────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function MyDataLog({ navigate }) {
  const [page, setPage] = useState(1)
  const [invoiceFilter, setInvoiceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ page, limit: 20, ...(invoiceFilter && { invoiceNumber: invoiceFilter }), ...(statusFilter && { status: statusFilter }) })
      setData(await api('GET', `/admin/mydata-log?${q}`))
    } catch { /* */ }
  }, [page, invoiceFilter, statusFilter])

  useEffect(() => { load() }, [load]) // eslint-disable-line react-hooks/set-state-in-effect

  function MydataStatusPill({ status }) {
    return status === 'success' ? <span className="pill pill-success">SUCCESS</span> : <span className="pill pill-failed">FAILURE</span>
  }

  return (
    <>
      <div className="page-header"><h1>MyData Log</h1></div>
      <div className="card">
        <div className="card-header">
          <h2>Αρχείο Υποβολών στην ΑΑΔΕ</h2>
          <div className="gap-8">
            <input type="text" placeholder="Αριθμός παραστατικού\u2026" style={{ width: 180 }} value={invoiceFilter} onChange={e => setInvoiceFilter(e.target.value)} />
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
              <option value="">Όλες</option><option value="success">Success</option><option value="failure">Failure</option>
            </select>
            <button className="abtn abtn-primary abtn-sm" onClick={() => { setPage(1); load() }}>Αναζήτηση</button>
          </div>
        </div>
        <div className="table-wrap">
          {!data ? <div className="empty">Loading\u2026</div> : !data.data.length ? <div className="empty">Δεν βρέθηκαν εγγραφές.</div> : (
            <table>
              <thead><tr><th>Ημερομηνία</th><th>Παραστατικό</th><th>Τύπος</th><th>Πάροχος</th><th>Πελάτης</th><th>Κατάσταση</th><th>ΜΑΡΚ</th><th>Σφάλμα</th><th></th></tr></thead>
              <tbody>
                {data.data.map(l => (
                  <tr key={l.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(l.submitted_at)}</td>
                    <td><strong>{esc(l.invoice_number || '\u2014')}</strong></td>
                    <td><DocTypePill type={l.document_type} /></td>
                    <td><code style={{ fontSize: 10 }}>{esc(l.provider || '\u2014')}</code></td>
                    <td>{l.customer_id ? <span className="clickable" onClick={() => navigate('customer', l.customer_id)}>{esc(l.customer_name || '\u2014')}</span> : '\u2014'}</td>
                    <td><MydataStatusPill status={l.status} /></td>
                    <td><code style={{ fontSize: 11 }}>{esc(l.mydata_mark || '\u2014')}</code></td>
                    <td style={{ maxWidth: 200, fontSize: 11, color: 'var(--red)' }}>{esc(l.error_message || '')}</td>
                    <td><button className="abtn abtn-outline abtn-sm" onClick={() => { MyDataLogDetail._id = l.id; navigate('mydata-log-detail') }}>Λεπτομέρειες</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {data && <Pagination total={data.total} page={page} limit={20} onPage={setPage} label="εγγραφή/ές" />}
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── MYDATA LOG DETAIL ───────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function MyDataLogDetail({ navigate, openXml }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const id = MyDataLogDetail._id
    if (!id) return
    api('GET', `/admin/mydata-log/${id}`).then(setData).catch(e => setError(e.message))
  }, [])

  if (error) return <><button className="back-btn" onClick={() => navigate('mydata-log')}>← MyData Log</button><div className="empty">Error: {error}</div></>
  if (!data) return <><button className="back-btn" onClick={() => navigate('mydata-log')}>← MyData Log</button><div className="empty">Loading\u2026</div></>

  const l = data

  return (
    <>
      <button className="back-btn" onClick={() => navigate('mydata-log')}>← MyData Log</button>
      <div className="card">
        <div className="card-header">
          <h2>Υποβολή #{l.id} — {esc(l.invoice_number)}</h2>
          <span className={`pill ${l.status === 'success' ? 'pill-success' : 'pill-failed'}`}>{l.status === 'success' ? 'SUCCESS' : 'FAILURE'}</span>
        </div>
        <div className="card-body">
          <div className="info-grid" style={{ marginBottom: 20 }}>
            <div className="info-item"><label>ΠΑΡΑΣΤΑΤΙΚΟ</label><span>{esc(l.invoice_number)}</span></div>
            <div className="info-item"><label>ΤΥΠΟΣ</label><span>{l.document_type === 'receipt' ? 'ΑΠΟΔΕΙΞΗ' : 'ΤΙΜΟΛΟΓΙΟ'}</span></div>
            <div className="info-item"><label>ΠΑΡΟΧΟΣ</label><span>{esc(l.provider || '\u2014')}</span></div>
            <div className="info-item"><label>ΗΜΕΡΟΜΗΝΙΑ</label><span>{fmtDate(l.submitted_at)}</span></div>
            <div className="info-item"><label>ΜΑΡΚ</label><span>{esc(l.mydata_mark || '\u2014')}</span></div>
            <div className="info-item"><label>ΠΕΛΑΤΗΣ</label><span>{l.customer_name ? `${l.customer_name} (${l.customer_email})` : '\u2014'}</span></div>
          </div>
          {l.error_message && <div style={{ background: '#fee2e2', border: '1px solid var(--red)', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: 13, color: '#b91c1c', marginBottom: 16 }}><strong>Σφάλμα:</strong> {esc(l.error_message)}</div>}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '.4px' }}>Δεδομένα Αποστολής</label>
              <button className="abtn abtn-outline abtn-sm" onClick={() => openXml({ title: 'Data Sent', content: l.xml_sent || '' })}>Άνοιγμα σε Modal</button>
            </div>
            <pre style={{ fontFamily: "'Courier New',monospace", fontSize: 11, whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', padding: 12, maxHeight: 300, overflow: 'auto' }}>{esc(l.xml_sent || '\u2014')}</pre>
          </div>
          {l.raw_response && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '.4px' }}>Απόκριση Παρόχου</label>
                <button className="abtn abtn-outline abtn-sm" onClick={() => openXml({ title: 'Provider Response', content: l.raw_response })}>Άνοιγμα σε Modal</button>
              </div>
              <pre style={{ fontFamily: "'Courier New',monospace", fontSize: 11, whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', padding: 12, maxHeight: 200, overflow: 'auto' }}>{esc(l.raw_response)}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
MyDataLogDetail._id = null

// ══════════════════════════════════════════════════════════════════════════════
// ── AUDIT LOG ───────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function AuditLog() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)

  useEffect(() => {
    api('GET', `/admin/audit-log?page=${page}&limit=50`).then(setData).catch(() => {})
  }, [page])

  return (
    <>
      <div className="page-header"><h1>Audit Log</h1></div>
      <div className="card">
        <div className="card-header"><h2>Admin activity</h2></div>
        <div className="table-wrap">
          {!data ? <div className="empty">Loading\u2026</div> : !data.data.length ? <div className="empty">No activity yet.</div> : (
            <table>
              <thead><tr><th>Time</th><th>Admin</th><th>Action</th><th>Detail</th><th>Target</th><th>IP</th></tr></thead>
              <tbody>
                {data.data.map((l, i) => (
                  <tr key={i}>
                    <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(l.created_at)}</td>
                    <td>{l.username ? esc(l.username) : <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>}</td>
                    <td><ActionBadge action={l.action} /></td>
                    <td style={{ fontSize: 12, maxWidth: 300 }}>{formatAuditDetail(l.action, l.detail)}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-600)' }}>{l.target_type ? `${esc(l.target_type)} #${esc(l.target_id)}` : '\u2014'}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{esc(l.ip || '\u2014')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {data && <Pagination total={data.total} page={page} limit={50} onPage={setPage} label="entries" />}
      </div>
    </>
  )
}

function formatAuditDetail(action, raw) {
  if (!raw) return <span style={{ color: 'var(--gray-400)' }}>&mdash;</span>
  let d
  try { d = typeof raw === 'string' ? JSON.parse(raw) : raw } catch { return esc(String(raw).slice(0, 80)) }
  if (action === 'login_success' || action === 'logout') return <>User: <strong>{esc(d.username)}</strong></>
  if (action === 'view_customer') return <>{esc(d.name || '\u2014')} &bull; {esc(d.email || '\u2014')} &bull; ΑΦΜ: {esc(d.afm || '\u2014')}</>
  if (action === 'edit_customer') return esc(d.name || '\u2014')
  if (action === 'retry_attempt') return <>Issued <strong>{esc(d.invoice_number || '\u2014')}</strong> &bull; ΜΑΡΚ <code>{esc(d.mydata_mark || '\u2014')}</code></>
  if (action === 'view_pdf') return <>Invoice: <strong>{esc(d.invoice_number || '\u2014')}</strong></>
  if (action === 'resend_email') return <>{esc(d.invoice_number || '\u2014')} → <strong>{esc(d.to || '\u2014')}</strong></>
  if (action === 'cancel_invoice') return <>{esc(d.invoice_number || '\u2014')} &bull; Ακ.ΜΑΡΚ <code>{esc(d.cancellation_mark || '\u2014')}</code></>
  return <span style={{ color: 'var(--gray-400)', fontSize: 11 }}>{esc(JSON.stringify(d).slice(0, 100))}</span>
}
