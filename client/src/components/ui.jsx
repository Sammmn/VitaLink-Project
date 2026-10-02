import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export function Btn({ variant = 'primary', size = 'md', loading, icon, children, className = '', ...props }) {
  const base =
    'inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-150 disabled:opacity-50 cursor-pointer'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    accent: 'bg-accent text-white hover:bg-accent-dark shadow-sm',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-danger text-white hover:bg-red-600 shadow-sm',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}

// ── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', onClick, hover }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

// ── Badge ───────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'neutral' }) {
  const map = {
    success: 'bg-success-light text-success',
    warning: 'bg-warning-light text-amber-700',
    danger: 'bg-danger-light text-danger',
    info: 'bg-info-light text-info',
    neutral: 'bg-gray-100 text-gray-600',
    accent: 'bg-accent-light text-accent',
    primary: 'bg-primary-light text-primary',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[variant]}`}>
      {children}
    </span>
  )
}

// ── Avatar ──────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 'md' }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' }
  const colors = ['bg-primary', 'bg-accent', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div
      className={`${sizes[size]} ${colors[idx]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  )
}

// ── Input ───────────────────────────────────────────────────────────────────
export function Input({ label, error, prefix, suffix, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-gray-400 flex items-center">{prefix}</span>}
        <input
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${error ? 'border-danger bg-danger-light' : 'border-gray-300 bg-white'} ${prefix ? 'pl-9' : ''} ${suffix ? 'pr-9' : ''} ${className}`}
          {...props}
        />
        {suffix && <span className="absolute right-3 text-gray-400 flex items-center">{suffix}</span>}
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}

// ── Select ──────────────────────────────────────────────────────────────────
export function Select({ label, options, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// ── Modal ───────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null
  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${widths[size]} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {title}
            </h3>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-500">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, trend, trendUp, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-light text-primary',
    accent: 'bg-accent-light text-accent',
    success: 'bg-success-light text-success',
    warning: 'bg-warning-light text-amber-600',
    danger: 'bg-danger-light text-danger',
  }
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {value}
          </p>
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-success' : 'text-danger'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors[color] || colors.primary}`}>{icon}</div>
      </div>
    </Card>
  )
}

// ── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ message, type = 'success', onClose }) {
  const config = {
    success: { icon: <CheckCircle size={18} />, cls: 'bg-success text-white' },
    error: { icon: <AlertCircle size={18} />, cls: 'bg-danger text-white' },
    warning: { icon: <AlertTriangle size={18} />, cls: 'bg-warning text-white' },
    info: { icon: <Info size={18} />, cls: 'bg-info text-white' },
  }
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-medium text-sm ${config[type].cls}`}
    >
      {config[type].icon}
      {message}
      <button onClick={onClose} className="ml-2 opacity-80 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  )
}

// ── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-gray-100 rounded-2xl text-gray-400 mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-700 text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {title}
      </h3>
      {description && <p className="text-sm text-gray-500 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

// ── LoadingSpinner ────────────────────────────────────────────────────────────
export function LoadingSpinner({ label = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

// ── PageHeader ────────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {title}
        </h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  )
}

// ── Table ─────────────────────────────────────────────────────────────────────
export function Table({ cols, data, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {cols.map((c) => (
              <th
                key={c.key}
                className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                style={{ width: c.width }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-100 last:border-0 ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''} transition-colors`}
            >
              {cols.map((c) => (
                <td key={c.key} className="py-3.5 px-4 text-gray-700">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === t.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t.label}
          {t.count !== undefined && (
            <span
              className={`text-xs rounded-full px-1.5 py-0.5 ${active === t.key ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
