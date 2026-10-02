import { useState } from 'react'
import { useApp } from '../AppContext'
import { Card, Btn, Badge, Avatar, Input, Modal, StatCard, PageHeader, Tabs, Table } from '../components/ui'
import { useToast } from '../components/useToast'
import { Users, Calendar, Plus, Search, Edit3, CheckCircle, X, AlertCircle, Download, Stethoscope } from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ── Data ──────────────────────────────────────────────────────────────────────
const consultationsData = [
  { month: 'Abr', total: 342, completed: 298, cancelled: 44 },
  { month: 'Mai', total: 398, completed: 361, cancelled: 37 },
  { month: 'Jun', total: 415, completed: 380, cancelled: 35 },
  { month: 'Jul', total: 389, completed: 352, cancelled: 37 },
  { month: 'Ago', total: 441, completed: 409, cancelled: 32 },
  { month: 'Set', total: 467, completed: 432, cancelled: 35 },
]

const specialtyData = [
  { name: 'Cardiologia', value: 24, color: '#ef4444' },
  { name: 'Dermatologia', value: 18, color: '#8b5cf6' },
  { name: 'Ortopedia', value: 21, color: '#f59e0b' },
  { name: 'Pediatria', value: 15, color: '#10b981' },
  { name: 'Neurologia', value: 12, color: '#3b82f6' },
  { name: 'Outros', value: 10, color: '#6b7280' },
]

const weeklyData = [
  { day: 'Seg', consultas: 82 },
  { day: 'Ter', consultas: 91 },
  { day: 'Qua', consultas: 88 },
  { day: 'Qui', consultas: 95 },
  { day: 'Sex', consultas: 74 },
  { day: 'Sáb', consultas: 37 },
]

const adminDoctors = [
  { id: 1, name: 'Dr. Carlos Mendes', specialty: 'Cardiologia', crm: 'CRM-SP 45823', patients: 247, status: 'active' },
  { id: 2, name: 'Dra. Marina Silva', specialty: 'Dermatologia', crm: 'CRM-SP 38291', patients: 198, status: 'active' },
  { id: 3, name: 'Dr. Rafael Torres', specialty: 'Ortopedia', crm: 'CRM-SP 52047', patients: 312, status: 'active' },
  { id: 4, name: 'Dra. Juliana Costa', specialty: 'Pediatria', crm: 'CRM-SP 29384', patients: 156, status: 'active' },
  { id: 5, name: 'Dr. Marcos Oliveira', specialty: 'Neurologia', crm: 'CRM-SP 61823', patients: 289, status: 'active' },
  {
    id: 6,
    name: 'Dra. Fernanda Lima',
    specialty: 'Ginecologia',
    crm: 'CRM-SP 44912',
    patients: 203,
    status: 'inactive',
  },
  {
    id: 7,
    name: 'Dr. André Vieira',
    specialty: 'Clínica Geral',
    crm: 'CRM-SP 33871',
    patients: 421,
    status: 'pending',
  },
]

const adminPatients = [
  { id: 1, name: 'Xiko Pikadinha', lastVisit: '12/09/2026', status: 'active' },
  { id: 2, name: 'Roberto Andrade', lastVisit: '12/09/2026', status: 'active' },
  { id: 3, name: 'Luciana Ferreira', lastVisit: '12/09/2026', status: 'active' },
  { id: 4, name: 'Marcelo Santos', lastVisit: '12/09/2026', status: 'active' },
  { id: 5, name: 'Carla Mendonça', lastVisit: '12/09/2026', status: 'new' },
  { id: 6, name: 'Eduardo Lima', lastVisit: '12/09/2026', status: 'active' },
  { id: 7, name: 'Patrícia Souza', lastVisit: '05/08/2026', status: 'inactive' },
]

const adminConsultations = [
  {
    id: 1,
    patient: 'Roberto Andrade',
    doctor: 'Dr. Bilola Cilola',
    specialty: 'Cardiologia',
    date: '12/09/2026',
    time: '08:30',
    status: 'completed',
  },
  {
    id: 2,
    patient: 'Marcelo Santos',
    doctor: 'Dr. Bilola Cilola',
    specialty: 'Cardiologia',
    date: '12/09/2026',
    time: '09:30',
    status: 'in-progress',
  },
  {
    id: 3,
    patient: 'Carla Mendonça',
    doctor: 'Dr. Bilola Cilola',
    specialty: 'Cardiologia',
    date: '12/09/2026',
    time: '10:00',
    status: 'waiting',
  },
  {
    id: 4,
    patient: 'Ana Beatriz Santos',
    doctor: 'Dra. Marina Silva',
    specialty: 'Dermatologia',
    date: '15/10/2026',
    time: '09:30',
    status: 'confirmed',
  },
  {
    id: 5,
    patient: 'Eduardo Lima',
    doctor: 'Dr. Rafael Torres',
    specialty: 'Ortopedia',
    date: '15/10/2026',
    time: '11:00',
    status: 'pending',
  },
  {
    id: 6,
    patient: 'Luciana Ferreira',
    doctor: 'Dra. Fernanda Lima',
    specialty: 'Ginecologia',
    date: '20/10/2026',
    time: '14:00',
    status: 'pending',
  },
]

const statusBadge = {
  active: 'success',
  inactive: 'neutral',
  pending: 'warning',
  new: 'info',
  completed: 'success',
  'in-progress': 'accent',
  waiting: 'warning',
  confirmed: 'primary',
  cancelled: 'danger',
}
const statusLabel = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Pendente',
  new: 'Novo',
  completed: 'Realizado',
  'in-progress': 'Em andamento',
  waiting: 'Aguardando',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
export function AdminDashboard() {
  const { user } = useApp()
  const { show, ToastEl } = useToast()
  const [pending, setPending] = useState(adminConsultations.filter((c) => c.status === 'pending'))
  const pendingApprovals = pending.length

  const resolve = (id, approved) => {
    setPending((list) => list.filter((c) => c.id !== id))
    show(approved ? 'Consulta aprovada!' : 'Consulta recusada.', approved ? 'success' : 'error')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {ToastEl}
      <PageHeader title={`Painel Administrativo`} subtitle={`Olá, ${user.name} — visão geral da clínica`} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Pacientes Ativos"
          value="12.400"
          icon={<Users size={20} />}
          trend="148 este mês"
          trendUp
          color="primary"
        />
        <StatCard
          label="Médicos Ativos"
          value="34"
          icon={<Stethoscope size={20} />}
          trend="2 novos"
          trendUp
          color="accent"
        />
        <StatCard
          label="Consultas Hoje"
          value="467"
          icon={<Calendar size={20} />}
          trend="6% vs ontem"
          trendUp
          color="success"
        />
        <StatCard
          label="Aprovações Pendentes"
          value={pendingApprovals}
          icon={<AlertCircle size={20} />}
          color="warning"
        />
      </div>

      {/* Pending approvals */}
      {pendingApprovals > 0 && (
        <Card className="p-5 mb-6 border-l-4 border-l-warning">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Aprovações Pendentes{' '}
              <span className="ml-2 bg-warning text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingApprovals}
              </span>
            </h3>
          </div>
          <div className="space-y-2">
            {pending.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-4 p-3 bg-warning-light rounded-xl">
                <div className="flex items-center gap-3">
                  <Avatar name={c.patient} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.patient}</p>
                    <p className="text-xs text-gray-500">
                      {c.doctor} · {c.date} {c.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Btn size="sm" variant="accent" icon={<CheckCircle size={14} />} onClick={() => resolve(c.id, true)}>
                    Aprovar
                  </Btn>
                  <Btn size="sm" variant="outline" icon={<X size={14} />} onClick={() => resolve(c.id, false)}>
                    Recusar
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Consultas — Últimos 6 Meses
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={consultationsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Area
                type="monotone"
                dataKey="completed"
                stackId="1"
                stroke="#0e9f8e"
                fill="#0e9f8e"
                fillOpacity={0.2}
                name="Realizadas"
              />
              <Area
                type="monotone"
                dataKey="cancelled"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.2}
                name="Canceladas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Por Especialidade
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {specialtyData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {specialtyData.slice(0, 4).map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="font-medium text-gray-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly bar + recent */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Consultas Esta Semana
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="consultas" fill="#1a3a6b" radius={[4, 4, 0, 0]} name="Consultas" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Atendimentos Recentes
          </h3>
          <div className="space-y-3">
            {adminConsultations
              .filter((c) => c.status !== 'pending')
              .slice(0, 4)
              .map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <Avatar name={c.patient} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.patient}</p>
                    <p className="text-xs text-gray-400">
                      {c.doctor} · {c.date}
                    </p>
                  </div>
                  <Badge variant={statusBadge[c.status]}>{statusLabel[c.status]}</Badge>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ── Admin Doctors ──────────────────────────────────────────────────────────────
export function AdminDoctorsPage() {
  const { show, ToastEl } = useToast()
  const [doctors, setDoctors] = useState(adminDoctors)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null) // cópia do médico que está sendo editado
  const [showAdd, setShowAdd] = useState(false)
  const emptyForm = { name: '', crm: '', specialty: '', email: '', phone: '' }
  const [newDoc, setNewDoc] = useState(emptyForm)
  const [addError, setAddError] = useState('')

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()),
  )

  const toggleStatus = (id) => {
    const doc = doctors.find((d) => d.id === id)
    if (!doc) return
    const activate = doc.status !== 'active'
    setDoctors((list) => list.map((d) => (d.id === id ? { ...d, status: activate ? 'active' : 'inactive' } : d)))
    setSelected(null)
    show(`${doc.name} ${activate ? 'ativado' : 'desativado'}!`, 'info')
  }

  const saveEdit = () => {
    if (!selected.name.trim() || !selected.crm.trim() || !selected.specialty.trim()) return
    setDoctors((list) =>
      list.map((d) =>
        d.id === selected.id
          ? { ...d, name: selected.name.trim(), crm: selected.crm.trim(), specialty: selected.specialty.trim() }
          : d,
      ),
    )
    setSelected(null)
    show('Médico atualizado!', 'success')
  }

  const addDoctor = () => {
    if (
      !newDoc.name.trim() ||
      !newDoc.crm.trim() ||
      !newDoc.specialty.trim() ||
      !/^\S+@\S+\.\S+$/.test(newDoc.email.trim())
    ) {
      setAddError('Preencha nome, CRM, especialidade e um e-mail válido.')
      return
    }
    setDoctors((list) => [
      ...list,
      {
        id: Date.now(),
        name: newDoc.name.trim(),
        specialty: newDoc.specialty.trim(),
        crm: newDoc.crm.trim(),
        patients: 0,
        status: 'active',
      },
    ])
    setNewDoc(emptyForm)
    setAddError('')
    setShowAdd(false)
    show('Médico cadastrado com sucesso!', 'success')
  }

  const setNew = (k) => (e) => {
    setNewDoc((f) => ({ ...f, [k]: e.target.value }))
    setAddError('')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {ToastEl}
      <PageHeader
        title="Gestão de Médicos"
        subtitle={`${doctors.length} médicos cadastrados`}
        actions={
          <Btn variant="accent" icon={<Plus size={16} />} onClick={() => setShowAdd(true)}>
            Novo Médico
          </Btn>
        }
      />
      <div className="mb-5">
        <Input
          placeholder="Buscar médico ou especialidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<Search size={16} />}
        />
      </div>
      <Card>
        <Table
          cols={[
            {
              key: 'name',
              label: 'Médico',
              render: (r) => (
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} size="sm" />
                  <div>
                    <p className="font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.crm}</p>
                  </div>
                </div>
              ),
            },
            { key: 'specialty', label: 'Especialidade' },
            { key: 'patients', label: 'Pacientes', render: (r) => <span className="font-semibold">{r.patients}</span> },
            {
              key: 'status',
              label: 'Status',
              render: (r) => <Badge variant={statusBadge[r.status]}>{statusLabel[r.status]}</Badge>,
            },
            {
              key: 'actions',
              label: '',
              render: (r) => (
                <div className="flex gap-1">
                  <button
                    title="Editar"
                    onClick={() => setSelected({ ...r })}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    title={r.status === 'active' ? 'Desativar' : 'Ativar'}
                    onClick={() => toggleStatus(r.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-danger transition"
                  >
                    {r.status === 'active' ? <X size={16} /> : <CheckCircle size={16} />}
                  </button>
                </div>
              ),
            },
          ]}
          data={filtered}
          onRowClick={(r) => setSelected({ ...r })}
        />
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Editar Médico" size="md">
        {selected && (
          <div>
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <Avatar name={selected.name} size="lg" />
              <div>
                <p className="font-bold text-gray-900">{selected.name}</p>
                <p className="text-gray-500 text-sm">{selected.specialty}</p>
              </div>
              <Badge variant={statusBadge[selected.status]}>{statusLabel[selected.status]}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Nome"
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
              />
              <Input
                label="CRM"
                value={selected.crm}
                onChange={(e) => setSelected({ ...selected, crm: e.target.value })}
              />
              <Input
                label="Especialidade"
                value={selected.specialty}
                onChange={(e) => setSelected({ ...selected, specialty: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Btn variant="primary" className="flex-1 justify-center" onClick={saveEdit}>
                Salvar
              </Btn>
              <Btn
                variant={selected.status === 'active' ? 'danger' : 'accent'}
                icon={selected.status === 'active' ? <X size={14} /> : <CheckCircle size={14} />}
                onClick={() => toggleStatus(selected.id)}
              >
                {selected.status === 'active' ? 'Desativar' : 'Ativar'}
              </Btn>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={showAdd}
        onClose={() => {
          setShowAdd(false)
          setAddError('')
        }}
        title="Cadastrar Novo Médico"
        size="md"
      >
        <div className="space-y-4">
          {addError && (
            <div className="px-4 py-3 bg-danger-light text-danger rounded-lg text-sm font-medium">{addError}</div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nome completo"
              placeholder="Dr. Nome Sobrenome"
              value={newDoc.name}
              onChange={setNew('name')}
            />
            <Input label="CRM" placeholder="CRM-SP 00000" value={newDoc.crm} onChange={setNew('crm')} />
            <Input
              label="Especialidade"
              placeholder="Cardiologia"
              value={newDoc.specialty}
              onChange={setNew('specialty')}
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="medico@email.com"
              value={newDoc.email}
              onChange={setNew('email')}
            />
            <Input label="Telefone" placeholder="(11) 9xxxx-xxxx" value={newDoc.phone} onChange={setNew('phone')} />
          </div>
          <Btn variant="accent" className="w-full justify-center" icon={<CheckCircle size={16} />} onClick={addDoctor}>
            Cadastrar Médico
          </Btn>
        </div>
      </Modal>
    </div>
  )
}

// ── Admin Patients ─────────────────────────────────────────────────────────────
export function AdminPatientsPage() {
  const { show, ToastEl } = useToast()
  const [patients, setPatients] = useState(adminPatients)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all')

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(q)
    const matchTab = tab === 'all' || p.status === tab
    return matchSearch && matchTab
  })

  const toggleStatus = (id) => {
    const patient = patients.find((p) => p.id === id)
    if (!patient) return
    const activate = patient.status === 'inactive'
    setPatients((list) => list.map((p) => (p.id === id ? { ...p, status: activate ? 'active' : 'inactive' } : p)))
    show(`${patient.name} ${activate ? 'ativado' : 'desativado'}!`, 'info')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {ToastEl}
      <PageHeader title="Gestão de Pacientes" subtitle={`${patients.length} pacientes cadastrados`} />
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Input
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<Search size={16} />}
          className="flex-1"
        />
        <Tabs
          tabs={[
            { key: 'all', label: 'Todos' },
            { key: 'active', label: 'Ativos' },
            { key: 'new', label: 'Novos' },
            { key: 'inactive', label: 'Inativos' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>
      <Card>
        <Table
          cols={[
            {
              key: 'name',
              label: 'Paciente',
              render: (r) => (
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} size="sm" />
                  <p className="font-medium text-gray-900">{r.name}</p>
                </div>
              ),
            },
            { key: 'lastVisit', label: 'Última Consulta' },
            {
              key: 'status',
              label: 'Status',
              render: (r) => <Badge variant={statusBadge[r.status]}>{statusLabel[r.status]}</Badge>,
            },
            {
              key: 'actions',
              label: '',
              render: (r) => (
                <div className="flex gap-1">
                  <button
                    title={r.status === 'inactive' ? 'Ativar' : 'Desativar'}
                    onClick={() => toggleStatus(r.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-danger transition"
                  >
                    {r.status === 'inactive' ? <CheckCircle size={16} /> : <X size={16} />}
                  </button>
                </div>
              ),
            },
          ]}
          data={filtered}
        />
      </Card>
    </div>
  )
}

// ── Admin Consultations ────────────────────────────────────────────────────────
export function AdminConsultationsPage() {
  const { show, ToastEl } = useToast()
  const [consultations, setConsultations] = useState(adminConsultations)
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = consultations.filter((c) => {
    const q = search.toLowerCase()
    return (
      (tab === 'all' || c.status === tab) && (c.patient.toLowerCase().includes(q) || c.doctor.toLowerCase().includes(q))
    )
  })

  const setStatus = (id, status, message, type) => {
    setConsultations((list) => list.map((c) => (c.id === id ? { ...c, status } : c)))
    show(message, type)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {ToastEl}
      <PageHeader title="Gestão de Consultas" subtitle="Controle e aprovação de agendamentos" />
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Input
          placeholder="Buscar paciente ou médico..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<Search size={16} />}
          className="flex-1"
        />
        <Tabs
          tabs={[
            { key: 'all', label: 'Todos' },
            { key: 'pending', label: 'Pendentes', count: consultations.filter((c) => c.status === 'pending').length },
            { key: 'confirmed', label: 'Confirmados' },
            { key: 'completed', label: 'Realizados' },
            { key: 'cancelled', label: 'Cancelados' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>
      <Card>
        <Table
          cols={[
            {
              key: 'patient',
              label: 'Paciente',
              render: (r) => (
                <div className="flex items-center gap-2">
                  <Avatar name={r.patient} size="sm" />
                  <span className="font-medium text-gray-900">{r.patient}</span>
                </div>
              ),
            },
            { key: 'doctor', label: 'Médico', render: (r) => <span className="text-gray-700">{r.doctor}</span> },
            { key: 'specialty', label: 'Especialidade' },
            {
              key: 'date',
              label: 'Data / Hora',
              render: (r) => (
                <span className="text-gray-700">
                  {r.date} · {r.time}
                </span>
              ),
            },
            {
              key: 'status',
              label: 'Status',
              render: (r) => <Badge variant={statusBadge[r.status]}>{statusLabel[r.status]}</Badge>,
            },
            {
              key: 'actions',
              label: '',
              render: (r) =>
                r.status === 'pending' ? (
                  <div className="flex gap-1">
                    <Btn
                      size="sm"
                      variant="accent"
                      icon={<CheckCircle size={14} />}
                      onClick={() => setStatus(r.id, 'confirmed', 'Consulta aprovada!', 'success')}
                    >
                      Aprovar
                    </Btn>
                    <Btn
                      size="sm"
                      variant="outline"
                      icon={<X size={14} />}
                      onClick={() => setStatus(r.id, 'cancelled', 'Consulta recusada.', 'error')}
                    >
                      Recusar
                    </Btn>
                  </div>
                ) : r.status === 'confirmed' || r.status === 'waiting' ? (
                  <button
                    title="Cancelar consulta"
                    onClick={() => setStatus(r.id, 'cancelled', 'Consulta cancelada.', 'info')}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-danger transition"
                  >
                    <X size={16} />
                  </button>
                ) : null,
            },
          ]}
          data={filtered}
        />
      </Card>
    </div>
  )
}

// ── Admin Reports ──────────────────────────────────────────────────────────────
export function AdminReportsPage() {
  const { show, ToastEl } = useToast()
  const [period, setPeriod] = useState('month')

  return (
    <div className="max-w-5xl mx-auto">
      {ToastEl}
      <PageHeader
        title="Relatórios"
        subtitle="Análise detalhada do desempenho da clínica"
        actions={
          <div className="flex gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
              <option value="quarter">Trimestre</option>
              <option value="year">Ano</option>
            </select>
            <Btn variant="accent" icon={<Download size={16} />} onClick={() => show('Relatório exportado!', 'success')}>
              Exportar PDF
            </Btn>
          </div>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Taxa de Ocupação', value: '87%', trend: '+3pp vs mês anterior', up: true, color: 'primary' },
          { label: 'Taxa de Cancelamento', value: '7,4%', trend: '-1,2pp vs mês anterior', up: true, color: 'success' },
        ].map((k) => (
          <Card key={k.label} className="p-5">
            <p className="text-xs text-gray-500 font-medium mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {k.value}
            </p>
            <p className={`text-xs mt-1 font-medium ${k.up ? 'text-success' : 'text-danger'}`}>↑ {k.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Evolução de Consultas
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={consultationsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="total" stroke="#1a3a6b" fill="#1a3a6b" fillOpacity={0.1} name="Total" />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#0e9f8e"
                fill="#0e9f8e"
                fillOpacity={0.15}
                name="Realizadas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Distribuição por Especialidade
          </h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={specialtyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {specialtyData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {specialtyData.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <span className="font-semibold text-gray-800">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Top Médicos por Atendimento
        </h3>
        <div className="space-y-3">
          {adminDoctors
            .filter((d) => d.status === 'active')
            .sort((a, b) => b.patients - a.patients)
            .slice(0, 5)
            .map((doc, i) => (
              <div key={doc.id} className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 w-5 text-center">{i + 1}</span>
                <Avatar name={doc.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-400">{doc.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{doc.patients}</p>
                  <p className="text-xs text-gray-400">pacientes</p>
                </div>
                <div className="w-24 bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${(doc.patients / 421) * 100}%`, background: '#0e9f8e' }}
                  />
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}

// ── Admin Profile ──────────────────────────────────────────────────────────────
export function AdminProfilePage() {
  const { user, updateUser } = useApp()
  const { show, ToastEl } = useToast()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '' })

  const save = () => {
    if (!form.name.trim()) {
      show('Informe o nome.', 'error')
      return
    }
    updateUser({ name: form.name.trim(), phone: form.phone.trim() })
    setEditing(false)
    show('Perfil atualizado!', 'success')
  }
  const cancelEdit = () => {
    setForm({ name: user.name, phone: user.phone || '' })
    setEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {ToastEl}
      <PageHeader
        title="Perfil Administrativo"
        subtitle="Seus dados e configurações de acesso"
        actions={
          editing ? (
            <div className="flex gap-2">
              <Btn size="sm" variant="outline" onClick={cancelEdit}>
                Cancelar
              </Btn>
              <Btn size="sm" variant="accent" onClick={save}>
                Salvar
              </Btn>
            </div>
          ) : (
            <Btn size="sm" variant="outline" icon={<Edit3 size={14} />} onClick={() => setEditing(true)}>
              Editar
            </Btn>
          )
        }
      />
      <Card className="p-6 mb-4">
        <div className="flex items-center gap-5 mb-5 pb-5 border-b border-gray-100">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: '#d97706' }}
          >
            {user.name
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user.name}
            </h2>
            <p className="text-gray-500">{user.role || 'Administrador Geral'}</p>
            <Badge variant="warning">Administrador</Badge>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Nome completo"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={!editing}
          />
          <Input label="Cargo" value={user.role || 'Administrador Geral'} disabled />
          <Input label="E-mail" value={user.email} disabled />
          <Input
            label="Telefone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            disabled={!editing}
          />
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Permissões de Acesso
        </h3>
        <div className="space-y-2">
          {['Gestão de Médicos', 'Gestão de Pacientes', 'Aprovação de Consultas'].map((p) => (
            <div key={p} className="flex items-center justify-between p-3 bg-success-light rounded-xl">
              <span className="text-sm font-medium text-gray-700">{p}</span>
              <CheckCircle size={16} className="text-success" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
