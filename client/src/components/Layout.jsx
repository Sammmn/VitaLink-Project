import { useState } from 'react'
import { useApp } from '../AppContext'
import {
  Home,
  Calendar,
  Users,
  Clock,
  FileText,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Stethoscope,
  BarChart3,
  ClipboardList,
  FolderOpen,
  DollarSign,
  Activity,
} from 'lucide-react'

function getNavItems(role) {
  if (role === 'patient')
    return [
      { icon: <Home size={20} />, label: 'Dashboard', page: 'patient-dashboard' },
      { icon: <Calendar size={20} />, label: 'Agendar Consulta', page: 'patient-schedule' },
      { icon: <Clock size={20} />, label: 'Histórico', page: 'patient-history' },
      { icon: <DollarSign size={20} />, label: 'Orçamentos', page: 'patient-budgets' },
      { icon: <FolderOpen size={20} />, label: 'Documentos', page: 'patient-documents' },
      { icon: <Bell size={20} />, label: 'Notificações', page: 'patient-notifications', badge: 3 },
      { icon: <User size={20} />, label: 'Perfil', page: 'patient-profile' },
    ]
  if (role === 'doctor')
    return [
      { icon: <Home size={20} />, label: 'Dashboard', page: 'doctor-dashboard' },
      { icon: <Calendar size={20} />, label: 'Agenda', page: 'doctor-schedule' },
      { icon: <ClipboardList size={20} />, label: 'Atendimentos', page: 'doctor-consultations' },
      { icon: <Settings size={20} />, label: 'Disponibilidade', page: 'doctor-availability' },
      { icon: <Bell size={20} />, label: 'Notificações', page: 'doctor-notifications', badge: 2 },
      { icon: <User size={20} />, label: 'Perfil', page: 'doctor-profile' },
    ]
  return [
    { icon: <BarChart3 size={20} />, label: 'Dashboard', page: 'admin-dashboard' },
    { icon: <Stethoscope size={20} />, label: 'Médicos', page: 'admin-doctors' },
    { icon: <Users size={20} />, label: 'Pacientes', page: 'admin-patients' },
    { icon: <Calendar size={20} />, label: 'Consultas', page: 'admin-consultations' },
    { icon: <FileText size={20} />, label: 'Relatórios', page: 'admin-reports' },
    { icon: <User size={20} />, label: 'Perfil', page: 'admin-profile' },
  ]
}

function getRoleLabel(role) {
  return role === 'patient' ? 'Paciente' : role === 'doctor' ? 'Médico' : 'Administrador'
}

function getRoleBadge(role) {
  const map = {
    patient: 'bg-accent-light text-accent',
    doctor: 'bg-primary-light text-primary',
    admin: 'bg-amber-100 text-amber-700',
  }
  return map[role]
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose }) {
  const { navigate, page, role, user, logout } = useApp()
  if (!role) return null
  const items = getNavItems(role)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 260, background: '#1a3a6b' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ background: '#0e9f8e' }}
          >
            <Activity size={20} />
          </div>
          <div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              VitaLink
            </span>
            <p className="text-xs text-white/50">Sistema Clínico</p>
          </div>
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* User */}
        <div className="px-4 py-4 mx-3 mt-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: '#0e9f8e' }}
            >
              {user.name
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleBadge(role)}`}>
                {getRoleLabel(role)}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          {items.map((item) => {
            const active = page === item.page
            return (
              <button
                key={item.page}
                onClick={() => {
                  navigate(item.page)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${active ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/8'}`}
                style={active ? { background: '#0e9f8e' } : {}}
              >
                <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && !active && (
                  <span className="text-xs bg-danger text-white rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
                {active && <ChevronRight size={16} className="text-white/70" />}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-all"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}

// ── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ onMenu }) {
  const { navigate, page, role, user } = useApp()
  if (!role) return null
  const items = getNavItems(role)
  const currentItem = items.find((i) => i.page === page)
  const totalBadge = items.reduce((a, i) => a + (i.badge || 0), 0)

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0">
      <button onClick={onMenu} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden text-gray-500">
        <Menu size={20} />
      </button>
      <div className="lg:hidden">
        <h2 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {currentItem?.label || 'VitaLink'}
        </h2>
      </div>
      <div className="hidden lg:block">
        <p className="text-sm text-gray-400">Bem-vindo ao VitaLink</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => navigate(role === 'patient' ? 'patient-notifications' : 'doctor-notifications')}
          className="relative p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition"
        >
          <Bell size={20} />
          {totalBadge > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-xs rounded-full flex items-center justify-center font-bold">
              {totalBadge}
            </span>
          )}
        </button>
        <button
          onClick={() =>
            navigate(role === 'patient' ? 'patient-profile' : role === 'doctor' ? 'doctor-profile' : 'admin-profile')
          }
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 hover:opacity-90 transition"
          style={{ background: '#0e9f8e' }}
        >
          {user.name
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0])
            .join('')}
        </button>
      </div>
    </header>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: 0 }}>
        {/* Desktop sidebar space */}
        <div className="hidden lg:block absolute left-0 top-0 h-full" style={{ width: 260 }} />
        <div className="lg:pl-[260px] flex flex-col flex-1 overflow-hidden">
          <TopBar onMenu={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-surface">{children}</main>
        </div>
      </div>
    </div>
  )
}
