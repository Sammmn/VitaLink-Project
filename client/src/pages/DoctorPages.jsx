import React, { useState } from 'react'
import { useApp } from '../AppContext'
import { Card, Btn, Badge, Avatar, Input, Modal, StatCard, PageHeader } from '../components/ui'
import { useToast } from '../components/useToast'
import { Calendar, Clock, ChevronRight, CheckCircle, X, Bell, AlertCircle, Edit3, Save } from 'lucide-react'

const todayAppointments = [
  {
    id: 1,
    time: '08:30',
    patient: 'Roberto Andrade',
    age: 45,
    type: 'Retorno',
    status: 'completed',
    reason: 'Acompanhamento pós-cirúrgico',
  },
  {
    id: 2,
    time: '09:00',
    patient: 'Luciana Ferreira',
    age: 38,
    type: 'Consulta',
    status: 'completed',
    reason: 'Dor no peito recorrente',
  },
  {
    id: 3,
    time: '09:30',
    patient: 'Marcelo Santos',
    age: 62,
    type: 'Consulta',
    status: 'scheduled',
    reason: 'Pressão alta — revisão de medicação',
  },
  {
    id: 4,
    time: '10:00',
    patient: 'Carla Mendonça',
    age: 29,
    type: 'Primeira consulta',
    status: 'scheduled',
    reason: 'Palpitações frequentes',
  },
  {
    id: 5,
    time: '10:30',
    patient: 'Eduardo Lima',
    age: 54,
    type: 'Retorno',
    status: 'scheduled',
    reason: 'Resultado de exames',
  },
  {
    id: 6,
    time: '11:00',
    patient: 'Patrícia Souza',
    age: 41,
    type: 'Consulta',
    status: 'scheduled',
    reason: 'Dor no peito ao esforço',
  },
  {
    id: 7,
    time: '14:00',
    patient: 'Vitor Almeida',
    age: 33,
    type: 'Consulta',
    status: 'scheduled',
    reason: 'Check-up cardíaco',
  },
  {
    id: 8,
    time: '14:30',
    patient: 'Beatriz Castro',
    age: 67,
    type: 'Retorno',
    status: 'scheduled',
    reason: 'Monitoramento de arritmia',
  },
  { id: 9, time: '15:00', patient: '', age: 0, type: '', status: 'available', reason: '' },
  {
    id: 10,
    time: '15:30',
    patient: 'Nelson Figueira',
    age: 48,
    type: 'Consulta',
    status: 'scheduled',
    reason: 'Síndrome metabólica',
  },
  { id: 11, time: '16:00', patient: '', age: 0, type: '', status: 'cancelled', reason: 'Horário cancelado' },
  {
    id: 12,
    time: '16:30',
    patient: 'Silvia Rocha',
    age: 55,
    type: 'Retorno',
    status: 'scheduled',
    reason: 'Resultado de Holter',
  },
]

const statusConfig = {
  completed: { label: 'Realizado', badge: 'success', dot: 'bg-success' },
  scheduled: { label: 'Agendado', badge: 'primary', dot: 'bg-primary' },
  available: { label: 'Disponível', badge: 'neutral', dot: 'bg-gray-300' },
  cancelled: { label: 'Cancelado', badge: 'danger', dot: 'bg-danger' },
}

// ── Doctor Dashboard ──────────────────────────────────────────────────────────
export function DoctorDashboard() {
  const { navigate, user } = useApp()
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  const scheduled = todayAppointments.filter((a) => a.status === 'scheduled').length
  const completed = todayAppointments.filter((a) => a.status === 'completed').length
  const inProgress = todayAppointments.find((a) => a.id === 3)

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={`Bom dia, ${user.name.split(' ').slice(0, 2).join(' ')}`}
        subtitle={today.charAt(0).toUpperCase() + today.slice(1)}
        actions={
          <Btn onClick={() => navigate('doctor-consultations')} variant="accent" icon={<Edit3 size={16} />}>
            Registrar Atendimento
          </Btn>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Consultas Hoje"
          value={
            todayAppointments.filter((a) => a.status !== 'available' && a.status !== 'cancelled' && a.patient).length
          }
          icon={<Calendar size={20} />}
          color="primary"
        />
        <StatCard
          label="Realizadas"
          value={completed}
          icon={<CheckCircle size={20} />}
          color="success"
          trend="58% do dia"
          trendUp
        />
        <StatCard label="Agendadas" value={scheduled} icon={<Clock size={20} />} color="warning" />
      </div>

      {/* In-progress banner */}
      {inProgress && (
        <div
          className="rounded-2xl p-5 mb-6 flex items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, #0e9f8e 0%, #1a3a6b 100%)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <div>
              <p className="text-white/70 text-sm">Em atendimento agora</p>
              <p className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {inProgress.patient} · {inProgress.time}
              </p>
              <p className="text-white/70 text-sm">{inProgress.reason}</p>
            </div>
          </div>
          <Btn
            onClick={() => navigate('doctor-consultations')}
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10 flex-shrink-0"
          >
            Ir ao Registro
          </Btn>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Agenda de Hoje
            </h3>
            <Btn
              onClick={() => navigate('doctor-schedule')}
              variant="ghost"
              size="sm"
              icon={<ChevronRight size={14} />}
            >
              Ver completo
            </Btn>
          </div>
          <div className="space-y-2">
            {todayAppointments.slice(0, 7).map((apt) => {
              const cfg = statusConfig[apt.status]
              return (
                <Card key={apt.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-right w-12 flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900">{apt.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      {apt.patient ? (
                        <>
                          <p className="font-semibold text-gray-900 text-sm">{apt.patient}</p>
                          <p className="text-xs text-gray-500">
                            {apt.type} · {apt.age} anos · {apt.reason}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-400 italic">{apt.reason || 'Horário livre'}</p>
                      )}
                    </div>
                    <Badge variant={cfg.badge}>{cfg.label}</Badge>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Próximos Pacientes
            </h3>
            <div className="space-y-3">
              {todayAppointments
                .filter((a) => a.status === 'scheduled')
                .slice(0, 3)
                .map((apt) => (
                  <div key={apt.id} className="flex items-center gap-3">
                    <Avatar name={apt.patient} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{apt.patient}</p>
                      <p className="text-xs text-gray-400">
                        {apt.time} · {apt.type}
                      </p>
                    </div>
                    <Badge variant="warning">Ag.</Badge>
                  </div>
                ))}
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Ver Agenda Completa', page: 'doctor-schedule', icon: <Calendar size={16} /> },
                { label: 'Configurar Horários', page: 'doctor-availability', icon: <Clock size={16} /> },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition text-sm text-gray-700 font-medium group"
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.label}
                  <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ── Doctor Schedule ───────────────────────────────────────────────────────────
export function DoctorSchedulePage() {
  const { navigate } = useApp()
  const { show, ToastEl } = useToast()
  const [appointments, setAppointments] = useState(todayAppointments)
  const [selectedApt, setSelectedApt] = useState(null)
  const weekDays = ['Seg 07', 'Ter 08', 'Qua 09 (Hoje)', 'Qui 10', 'Sex 11']
  const [activeDay, setActiveDay] = useState(2)

  return (
    <div className="max-w-4xl mx-auto">
      {ToastEl}
      <PageHeader title="Agenda Médica" subtitle="Visão semanal dos atendimentos" />

      {/* Day selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weekDays.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeDay === i ? 'text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
            style={activeDay === i ? { background: '#1a3a6b' } : {}}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-xs text-gray-500">
        {Object.entries(statusConfig).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${v.dot}`} />
            {v.label}
          </span>
        ))}
      </div>

      <div className="grid gap-2">
        {appointments.map((apt) => {
          const cfg = statusConfig[apt.status]
          return (
            <Card
              key={apt.id}
              className={`p-4 transition-all ${apt.patient ? 'cursor-pointer hover:shadow-md' : ''} ${apt.status === 'available' ? 'border-dashed border-gray-200' : ''}`}
              onClick={() => apt.patient && setSelectedApt(apt)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">{apt.time}</p>
                </div>
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  {apt.patient ? (
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {apt.patient} <span className="text-gray-400 font-normal text-sm">· {apt.age} anos</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {apt.type} · {apt.reason}
                        </p>
                      </div>
                      <Badge variant={cfg.badge}>{cfg.label}</Badge>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm italic">{apt.reason || 'Horário livre'}</p>
                      {apt.status === 'available' && <Badge variant="neutral">Disponível</Badge>}
                      {apt.status === 'cancelled' && <Badge variant="danger">Cancelado</Badge>}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Modal open={!!selectedApt} onClose={() => setSelectedApt(null)} title="Detalhes do Agendamento" size="sm">
        {selectedApt && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={selectedApt.patient} size="lg" />
              <div>
                <p className="font-bold text-gray-900">{selectedApt.patient}</p>
                <p className="text-sm text-gray-500">
                  {selectedApt.age} anos · {selectedApt.type}
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Horário</span>
                <span className="font-medium">{selectedApt.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Motivo</span>
                <span className="font-medium">{selectedApt.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <Badge variant={statusConfig[selectedApt.status].badge}>{statusConfig[selectedApt.status].label}</Badge>
              </div>
            </div>
            {selectedApt.status === 'scheduled' && (
              <div className="flex gap-2">
                <Btn
                  variant="accent"
                  size="sm"
                  className="flex-1 justify-center"
                  icon={<Edit3 size={14} />}
                  onClick={() => {
                    setSelectedApt(null)
                    navigate('doctor-consultations')
                  }}
                >
                  Registrar
                </Btn>
                <Btn
                  variant="danger"
                  size="sm"
                  icon={<X size={14} />}
                  onClick={() => {
                    setAppointments((list) =>
                      list.map((a) => (a.id === selectedApt.id ? { ...a, status: 'cancelled' } : a)),
                    )
                    setSelectedApt(null)
                    show('Consulta cancelada.', 'info')
                  }}
                >
                  Cancelar
                </Btn>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

// ── Doctor Consultations (Register) ──────────────────────────────────────────
export function DoctorConsultationsPage() {
  const { show, ToastEl } = useToast()
  const inProgress = todayAppointments.find((a) => a.id === 3)
  const [form, setForm] = useState({ diagnosis: '', prescription: '', notes: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    show('Atendimento registrado com sucesso!', 'success')
  }

  const history = [
    { date: '05/08/2026', type: 'Retorno', summary: 'Medicação ajustada. Pressão controlando bem.' },
    { date: '10/07/2026', type: 'Consulta', summary: 'Diagnóstico inicial. ECG solicitado.' },
    { date: '22/06/2026', type: 'Primeira consulta', summary: 'Queixa de hipertensão. Exames solicitados.' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      {ToastEl}
      <PageHeader title="Registro de Atendimento" subtitle="Documente o atendimento em curso" />

      {/* Current patient */}
      <div
        className="rounded-2xl p-5 mb-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a6b, #0e9f8e)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
            {inProgress.patient
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="text-white/70 text-sm">Em atendimento</p>
            </div>
            <p className="font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {inProgress.patient}
            </p>
            <p className="text-white/70 text-sm">
              {inProgress.type} · {inProgress.time}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Registro Clínico
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Diagnóstico</label>
                <textarea
                  value={form.diagnosis}
                  onChange={set('diagnosis')}
                  placeholder="CID-10, hipóteses diagnósticas e conclusões..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 resize-none outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Prescrição / Conduta</label>
                <textarea
                  value={form.prescription}
                  onChange={set('prescription')}
                  placeholder="Medicamentos, dosagens, orientações e exames solicitados..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 resize-none outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Observações internas</label>
                <textarea
                  value={form.notes}
                  onChange={set('notes')}
                  placeholder="Notas privadas (não visíveis ao paciente)..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 resize-none outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Btn onClick={save} variant="accent" icon={<Save size={16} />} loading={false}>
                Salvar Atendimento
              </Btn>
            </div>
            {saved && (
              <div className="mt-3 flex items-center gap-2 text-success text-sm font-medium">
                <CheckCircle size={16} /> Atendimento salvo com sucesso
              </div>
            )}
          </Card>
        </div>

        {/* History sidebar */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Histórico do Paciente
          </h3>
          <div className="space-y-3">
            {history.map((h, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400">{h.date}</span>
                  <Badge variant="neutral">{h.type}</Badge>
                </div>
                <p className="text-sm text-gray-600">{h.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Doctor Availability ───────────────────────────────────────────────────────
export function DoctorAvailabilityPage() {
  const { show, ToastEl } = useToast()
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
  const slots = [
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ]

  const [availability, setAvailability] = useState({
    Segunda: new Set(['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00']),
    Terça: new Set(['08:00', '08:30', '09:00', '14:00', '14:30', '15:00']),
    Quarta: new Set(['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30']),
    Quinta: new Set(['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30']),
    Sexta: new Set(['08:00', '08:30', '09:00', '09:30']),
  })

  const toggle = (day, slot) => {
    setAvailability((prev) => {
      const next = new Set(prev[day])
      next.has(slot) ? next.delete(slot) : next.add(slot)
      return { ...prev, [day]: next }
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {ToastEl}
      <PageHeader
        title="Configurar Disponibilidade"
        subtitle="Defina seus horários de atendimento por dia da semana"
        actions={
          <Btn
            variant="accent"
            icon={<Save size={16} />}
            onClick={() => show('Disponibilidade salva com sucesso!', 'success')}
          >
            Salvar Alterações
          </Btn>
        }
      />
      <div className="flex gap-4 text-xs text-gray-500 mb-5">
        <span className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-accent" /> Disponível
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-white border border-gray-300" /> Indisponível
        </span>
      </div>
      <div className="overflow-x-auto">
        <Card className="p-5">
          <div className="grid" style={{ gridTemplateColumns: '100px repeat(5, 1fr)', gap: '6px' }}>
            <div />
            {days.map((d) => (
              <div
                key={d}
                className="text-center text-sm font-bold text-gray-900 pb-3 border-b border-gray-100"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {d}
              </div>
            ))}
            {slots.map((slot) => (
              <React.Fragment key={slot}>
                <div className="text-right pr-3 text-xs text-gray-400 font-medium flex items-center justify-end">
                  {slot}
                </div>
                {days.map((day) => {
                  const active = availability[day]?.has(slot)
                  return (
                    <button
                      key={`${day}-${slot}`}
                      onClick={() => toggle(day, slot)}
                      className={`h-9 rounded-lg text-xs font-medium transition-all ${active ? 'text-white shadow-sm' : 'bg-gray-50 text-gray-300 hover:bg-gray-100'}`}
                      style={active ? { background: '#0e9f8e' } : {}}
                    >
                      {active ? '✓' : ''}
                    </button>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ── Doctor Notifications ──────────────────────────────────────────────────────
export function DoctorNotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Novo agendamento',
      message: 'Carla Mendonça agendou uma consulta para hoje às 10:00.',
      time: 'há 1 hora',
      read: false,
      type: 'info',
    },
    {
      id: 2,
      title: 'Cancelamento de consulta',
      message: 'Vitor Almeida cancelou a consulta das 14:00 de hoje.',
      time: 'há 2 horas',
      read: false,
      type: 'danger',
    },
    {
      id: 3,
      title: 'Resultado de exame recebido',
      message: 'O laudo do eletrocardiograma de Eduardo Lima está disponível.',
      time: 'há 1 dia',
      read: true,
      type: 'success',
    },
    {
      id: 4,
      title: 'Lembrete administrativo',
      message: 'Reunião de equipe médica hoje às 17:30 na sala de reuniões.',
      time: 'há 1 dia',
      read: true,
      type: 'warning',
    },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Notificações" subtitle={`${notifications.filter((n) => !n.read).length} não lidas`} />
      <div className="space-y-2">
        {notifications.map((n) => (
          <Card key={n.id} className={`p-4 ${!n.read ? 'border-l-4 border-l-accent' : ''}`}>
            <div className="flex gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${n.type === 'success' ? 'bg-success-light' : n.type === 'danger' ? 'bg-danger-light' : n.type === 'warning' ? 'bg-warning-light' : 'bg-info-light'}`}
              >
                {n.type === 'success' ? (
                  <CheckCircle size={16} className="text-success" />
                ) : n.type === 'danger' ? (
                  <X size={16} className="text-danger" />
                ) : n.type === 'warning' ? (
                  <AlertCircle size={16} className="text-warning" />
                ) : (
                  <Bell size={16} className="text-info" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${n.read ? 'text-gray-600' : 'text-gray-900'}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 bg-accent rounded-full" />}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── Doctor Profile ─────────────────────────────────────────────────────────────
export function DoctorProfilePage() {
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
        title="Meu Perfil"
        subtitle="Suas informações profissionais"
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
            style={{ background: '#1a3a6b' }}
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
            <p className="text-gray-500">{user.specialty || 'Cardiologia'}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="primary">{user.crm || 'CRM-SP 45823'}</Badge>
              <Badge variant="success">Ativo</Badge>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Nome completo"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            disabled={!editing}
          />
          <Input label="CRM" value={user.crm || ''} disabled />
          <Input label="E-mail" value={user.email} disabled />
          <Input
            label="Telefone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            disabled={!editing}
          />
          <Input label="Especialidade" value={user.specialty || ''} disabled />
        </div>
      </Card>
    </div>
  )
}
