import React, { useState } from 'react'
import { useApp } from '../AppContext'

import {
  Card,
  Btn,
  Badge,
  Avatar,
  Input,
  Modal,
  StatCard,
  EmptyState,
  PageHeader,
  Tabs,
} from '../components/ui'
import { useToast } from '../components/useToast'
import {
  Calendar,
  Clock,
  ChevronRight,
  FileText,
  Download,
  Bell,
  Check,
  X,
  AlertCircle,
  Plus,
  Stethoscope,
  Activity,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  FolderOpen,
  Edit3,
} from 'lucide-react'

// ── Shared data ───────────────────────────────────────────────────────────────
const specialties = [
  { id: 1, name: 'Cardiologia', icon: <Heart size={22} />, color: '#ef4444', count: 4 },
  { id: 2, name: 'Dermatologia', icon: <Activity size={22} />, color: '#8b5cf6', count: 3 },
  { id: 3, name: 'Ortopedia', icon: <Bone size={22} />, color: '#f59e0b', count: 5 },
  { id: 4, name: 'Pediatria', icon: <Baby size={22} />, color: '#10b981', count: 3 },
  { id: 5, name: 'Neurologia', icon: <Brain size={22} />, color: '#3b82f6', count: 2 },
  { id: 6, name: 'Oftalmologia', icon: <Eye size={22} />, color: '#06b6d4', count: 2 },
  { id: 7, name: 'Ginecologia', icon: <Stethoscope size={22} />, color: '#ec4899', count: 4 },
  { id: 8, name: 'Clínica Geral', icon: <Activity size={22} />, color: '#0e9f8e', count: 6 },
]

const doctors = [
  { id: 1, name: 'Dr. Bilola Cilola', specialty: 'Cardiologia', crm: 'CRM-BA 45823' },
  { id: 2, name: 'Dra. Marina Silva', specialty: 'Dermatologia', crm: 'CRM-SP 38291' },
  { id: 3, name: 'Dr. Rafael Torres', specialty: 'Ortopedia', crm: 'CRM-SP 52047' },
  { id: 4, name: 'Dra. Juliana Costa', specialty: 'Pediatria', crm: 'CRM-SP 29384' },
  { id: 5, name: 'Dr. Marcos Oliveira', specialty: 'Neurologia', crm: 'CRM-SP 61823' },
  { id: 6, name: 'Dra. Fernanda Lima', specialty: 'Ginecologia', crm: 'CRM-SP 44912' },
  { id: 7, name: 'Dr. Paulo Nogueira', specialty: 'Oftalmologia', crm: 'CRM-SP 57104' },
  { id: 8, name: 'Dra. Renata Alves', specialty: 'Clínica Geral', crm: 'CRM-SP 36419' },
]

const history = [
  {
    id: 1,
    doctor: 'Dr. Carlos Mendes',
    specialty: 'Cardiologia',
    date: '12/09/2026',
    time: '10:00',
    type: 'Consulta de rotina',
    status: 'completed',
    notes: 'Eletrocardiograma solicitado. Pressão arterial estável.',
  },
  {
    id: 2,
    doctor: 'Dra. Marina Silva',
    specialty: 'Dermatologia',
    date: '03/08/2026',
    time: '14:30',
    type: 'Retorno',
    status: 'completed',
    notes: 'Tratamento de acne em andamento. Medicação mantida.',
  },
  {
    id: 3,
    doctor: 'Dra. Juliana Costa',
    specialty: 'Pediatria',
    date: '15/07/2026',
    time: '09:00',
    type: 'Consulta de rotina',
    status: 'cancelled',
    notes: '',
  },
  {
    id: 4,
    doctor: 'Dr. Rafael Torres',
    specialty: 'Ortopedia',
    date: '20/06/2026',
    time: '11:00',
    type: 'Avaliação',
    status: 'completed',
    notes: 'Fisioterapia recomendada por 30 dias.',
  },
]

// ── Patient Dashboard ─────────────────────────────────────────────────────────
export function PatientDashboard() {
  const { navigate, user, appointments: allAppointments, cancelAppointment } = useApp()
  const { show, ToastEl } = useToast()
  const firstName = user.name.split(' ')[0]
  // ordena da mais próxima para a mais distante (data dd/mm/aaaa + hora)
  const sortKey = (a) => `${a.date.split('/').reverse().join('-')} ${a.time}`
  const appointments = [...allAppointments].sort((a, b) => sortKey(a).localeCompare(sortKey(b)))
  const next = appointments[0]

  const cancel = (id) => {
    cancelAppointment(id)
    show('Consulta cancelada.', 'info')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {ToastEl}
      <PageHeader
        title={`Olá, ${firstName} 👋`}
        subtitle="Aqui está um resumo da sua saúde hoje"
        actions={
          <Btn onClick={() => navigate('patient-schedule')} variant="accent" icon={<Plus size={16} />}>
            Agendar Consulta
          </Btn>
        }
      />

      {/* Next appointment highlight */}
      {next && (
        <div
          className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #0e9f8e 100%)' }}
        >
          <div
            className="absolute right-0 top-0 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'white', transform: 'translate(40%, -40%)' }}
          />
          <p className="text-white/70 text-sm font-medium mb-1">Próxima Consulta</p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {next.doctor}
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-sm text-white/80">
                  <Stethoscope size={14} /> {next.specialty}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-white/80">
                  <Calendar size={14} /> {next.date} · {next.time}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {next.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
              </span>
              <button
                onClick={() => cancel(next.id)}
                className="text-white/80 hover:text-white text-xs font-medium underline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Consultas Realizadas"
          value="12"
          icon={<CheckCircle size={20} />}
          trend="2 este mês"
          trendUp
          color="accent"
        />
        <StatCard
          label="Consultas Agendadas"
          value={appointments.length}
          icon={<Calendar size={20} />}
          color="primary"
        />
        <StatCard label="Documentos" value="8" icon={<FileText size={20} />} color="success" />
        <StatCard label="Notificações" value="3" icon={<Bell size={20} />} color="warning" />
      </div>

      {/* Quick actions + upcoming */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Consultas Agendadas
          </h3>
          <div className="space-y-3">
            {appointments.length === 0 && (
              <EmptyState
                icon={<Calendar size={32} />}
                title="Nenhuma consulta agendada"
                description="Agende uma consulta para vê-la aqui."
              />
            )}
            {appointments.map((apt) => (
              <Card key={apt.id} className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={apt.doctor} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{apt.doctor}</p>
                    <p className="text-xs text-gray-500">{apt.specialty}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={12} /> {apt.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} /> {apt.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={apt.status === 'confirmed' ? 'success' : 'warning'}>
                      {apt.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                    </Badge>
                    <button onClick={() => cancel(apt.id)} className="text-xs text-danger hover:underline">
                      Cancelar
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Acesso Rápido
          </h3>
          <div className="space-y-2">
            {[
              {
                icon: <Calendar size={18} />,
                label: 'Agendar Consulta',
                page: 'patient-schedule',
                color: '#0e9f8e',
                bg: '#e6f7f5',
              },
              {
                icon: <Clock size={18} />,
                label: 'Histórico',
                page: 'patient-history',
                color: '#1a3a6b',
                bg: '#ebf0fb',
              },
              {
                icon: <DollarSign size={18} />,
                label: 'Orçamentos',
                page: 'patient-budgets',
                color: '#f59e0b',
                bg: '#fffbeb',
              },
              {
                icon: <FolderOpen size={18} />,
                label: 'Documentos',
                page: 'patient-documents',
                color: '#8b5cf6',
                bg: '#f5f3ff',
              },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, color: item.color }}
                >
                  {item.icon}
                </div>
                <span className="font-medium text-gray-700 text-sm">{item.label}</span>
                <ChevronRight
                  size={16}
                  className="ml-auto text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Patient Schedule (Booking Wizard) ─────────────────────────────────────────
export function PatientSchedulePage() {
  const { navigate, addAppointment } = useApp()
  const [step, setStep] = useState(1)
  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const { show, ToastEl } = useToast()

  const timeSlots = [
    { time: '08:00', available: false },
    { time: '08:30', available: true },
    { time: '09:00', available: true },
    { time: '09:30', available: false },
    { time: '10:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: false },
    { time: '11:30', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: false },
    { time: '15:00', available: true },
    { time: '15:30', available: true },
    { time: '16:00', available: true },
    { time: '16:30', available: false },
  ]

  const steps = ['Especialidade', 'Data', 'Horário', 'Confirmação']

  const selectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty)
    setSelectedDoctor(doctors.find((doctor) => doctor.specialty === specialty.name) || null)
    setStep(2)
  }

  const confirm = () => {
    addAppointment({
      doctor: selectedDoctor?.name ?? '',
      specialty: selectedSpecialty?.name ?? '',
      date: (selectedDate ?? '').split('-').reverse().join('/'),
      time: selectedTime ?? '',
    })
    setConfirmed(true)
    show('Consulta agendada com sucesso!', 'success')
  }

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Consulta agendada!
        </h2>
        <p className="text-gray-500 mb-6">
          Sua consulta foi confirmada com sucesso. Você receberá uma notificação com os detalhes.
        </p>
        <Card className="p-5 text-left mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Médico</span>
              <span className="font-semibold text-gray-900">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Especialidade</span>
              <span className="font-semibold text-gray-900">{selectedSpecialty?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Data</span>
              <span className="font-semibold text-gray-900">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Horário</span>
              <span className="font-semibold text-gray-900">{selectedTime}</span>
            </div>
          </div>
        </Card>
        <div className="flex gap-3 justify-center">
          <Btn onClick={() => navigate('patient-dashboard')} variant="outline">
            Ir ao Dashboard
          </Btn>
          <Btn
            onClick={() => {
              setStep(1)
              setConfirmed(false)
              setSelectedSpecialty(null)
              setSelectedDoctor(null)
              setSelectedDate(null)
              setSelectedTime(null)
            }}
            variant="accent"
          >
            Agendar Outra
          </Btn>
        </div>
        {ToastEl}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {ToastEl}
      <PageHeader title="Agendar Consulta" subtitle="Escolha a especialidade, data e horário" />

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((label, index) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${index + 1 < step ? 'bg-success text-white' : index + 1 === step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                {index + 1 < step ? <Check size={14} /> : index + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${index + 1 === step ? 'text-primary' : index + 1 < step ? 'text-success' : 'text-gray-400'}`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 min-w-4 ${index + 1 < step ? 'bg-success' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Qual especialidade você precisa?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => selectSpecialty(specialty)}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-accent hover:shadow-md transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: `${specialty.color}15`, color: specialty.color }}
                >
                  {specialty.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800 text-center">{specialty.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <ArrowLeft size={18} />
            </button>
            <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Selecione a data
            </h3>
          </div>
          <Card className="p-5 mb-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <Avatar name={selectedDoctor?.name} />
              <div>
                <p className="font-semibold text-gray-900">{selectedDoctor?.name}</p>
                <p className="text-sm text-gray-500">{selectedSpecialty?.name}</p>
              </div>
            </div>
            <Input type="date" value={selectedDate || ''} onChange={(event) => setSelectedDate(event.target.value)} />
          </Card>
          <Btn onClick={() => setStep(3)} disabled={!selectedDate} variant="primary" className="w-full justify-center">
            Continuar
          </Btn>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setStep(2)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <ArrowLeft size={18} />
            </button>
            <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Escolha o horário — {selectedDate}
            </h3>
          </div>
          <div className="flex gap-4 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-white border border-gray-300" /> Disponível
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gray-200" /> Ocupado
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-accent" /> Selecionado
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`py-2.5 px-1 rounded-xl text-sm font-semibold transition-all ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : selectedTime === slot.time ? 'text-white shadow-md scale-105' : 'bg-white border border-gray-200 text-gray-700 hover:border-accent hover:text-accent'}`}
                style={selectedTime === slot.time ? { background: '#0e9f8e' } : {}}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <Btn onClick={() => setStep(4)} disabled={!selectedTime} variant="primary" className="w-full justify-center">
            Continuar
          </Btn>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setStep(3)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <ArrowLeft size={18} />
            </button>
            <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Confirmar agendamento
            </h3>
          </div>
          <Card className="p-6 mb-4">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
              <Avatar name={selectedDoctor?.name} size="lg" />
              <div>
                <p className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {selectedDoctor?.name}
                </p>
                <p className="text-gray-500">{selectedSpecialty?.name}</p>
                <p className="text-sm text-gray-600 font-medium mt-1">{selectedDoctor?.crm}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Data', value: selectedDate, icon: <Calendar size={16} /> },
                { label: 'Horário', value: selectedTime, icon: <Clock size={16} /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="p-4 bg-info-light rounded-xl text-info text-sm flex items-start gap-2 mb-4">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            Cancelamentos devem ser feitos com no mínimo 24h de antecedência para não gerar taxa.
          </div>
          <Btn onClick={confirm} variant="accent" className="w-full justify-center" icon={<CheckCircle size={16} />}>
            Confirmar Agendamento
          </Btn>
        </div>
      )}
    </div>
  )
}

// ── Patient History ───────────────────────────────────────────────────────────
export function PatientHistoryPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = history.filter((h) => activeTab === 'all' || h.status === activeTab)

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Histórico de Consultas" subtitle="Registro completo dos seus atendimentos" />
      <Tabs
        tabs={[
          { key: 'all', label: 'Todos', count: history.length },
          { key: 'completed', label: 'Realizados', count: history.filter((h) => h.status === 'completed').length },
          { key: 'cancelled', label: 'Cancelados', count: history.filter((h) => h.status === 'cancelled').length },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />
      <div className="mt-5 space-y-3">
        {filtered.map((item) => (
          <Card key={item.id} hover onClick={() => setSelectedItem(item)} className="p-5">
            <div className="flex items-start gap-4">
              <Avatar name={item.doctor} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">{item.doctor}</p>
                    <p className="text-sm text-gray-500">
                      {item.specialty} · {item.type}
                    </p>
                  </div>
                  <Badge variant={item.status === 'completed' ? 'success' : 'danger'}>
                    {item.status === 'completed' ? 'Realizado' : 'Cancelado'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={12} /> {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
                {item.notes && (
                  <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg line-clamp-2">{item.notes}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <EmptyState
            icon={<Clock size={32} />}
            title="Nenhum registro encontrado"
            description="Não há consultas nesta categoria."
          />
        )}
      </div>

      <Modal open={!!selectedItem} onClose={() => setSelectedItem(null)} title="Detalhes do Atendimento" size="md">
        {selectedItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <Avatar name={selectedItem.doctor} size="lg" />
              <div>
                <p className="font-bold text-gray-900">{selectedItem.doctor}</p>
                <p className="text-gray-500 text-sm">{selectedItem.specialty}</p>
              </div>
              <Badge variant={selectedItem.status === 'completed' ? 'success' : 'danger'}>
                {selectedItem.status === 'completed' ? 'Realizado' : 'Cancelado'}
              </Badge>
            </div>
            {[
              ['Tipo', selectedItem.type],
              ['Data', selectedItem.date],
              ['Horário', selectedItem.time],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm">
                <span className="text-gray-500">{l}</span>
                <span className="font-medium text-gray-900">{v}</span>
              </div>
            ))}
            {selectedItem.notes && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Observações do médico</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedItem.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

// ── Patient Budgets ───────────────────────────────────────────────────────────
export function PatientBudgetsPage() {
  const budgets = [
    {
      id: 1,
      procedure: 'Exame de Ecocardiograma',
      doctor: 'Dr. Carlos Mendes',
      date: '05/10/2026',
      value: 'R$ 480,00',
      status: 'pending',
    },
    {
      id: 2,
      procedure: 'Consulta + Biópsia de Pele',
      doctor: 'Dra. Marina Silva',
      date: '28/09/2026',
      value: 'R$ 650,00',
      status: 'approved',
    },
    {
      id: 3,
      procedure: 'Ressonância Magnética — Joelho',
      doctor: 'Dr. Rafael Torres',
      date: '15/09/2026',
      value: 'R$ 1.200,00',
      status: 'expired',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Orçamentos" subtitle="Orçamentos solicitados para procedimentos" />
      <div className="space-y-4">
        {budgets.map((b) => (
          <Card key={b.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{b.procedure}</p>
                  <p className="text-sm text-gray-500">
                    {b.doctor} · {b.date}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-xl text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {b.value}
                </p>
                <Badge variant={b.status === 'approved' ? 'success' : b.status === 'pending' ? 'warning' : 'neutral'}>
                  {b.status === 'approved' ? 'Aprovado' : b.status === 'pending' ? 'Pendente' : 'Expirado'}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── Patient Documents ──────────────────────────────────────────────────────────
export function PatientDocumentsPage() {
  const { show, ToastEl } = useToast()
  const docs = [
    { id: 1, name: 'Resultado Eletrocardiograma', type: 'PDF', date: '12/09/2026', size: '1.2 MB', category: 'Exame' },
    { id: 2, name: 'Receita Médica — Losartana', type: 'PDF', date: '12/09/2026', size: '340 KB', category: 'Receita' },
    { id: 3, name: 'Laudo Dermatológico', type: 'PDF', date: '03/08/2026', size: '890 KB', category: 'Laudo' },
    { id: 4, name: 'Exame de Sangue — Hemograma', type: 'PDF', date: '15/07/2026', size: '2.1 MB', category: 'Exame' },
    {
      id: 5,
      name: 'Autorização de Cirurgia',
      type: 'PDF',
      date: '20/06/2026',
      size: '450 KB',
      category: 'Autorização',
    },
    { id: 6, name: 'Raio-X Joelho Direito', type: 'IMG', date: '20/06/2026', size: '3.4 MB', category: 'Imagem' },
    { id: 7, name: 'Relatório Fisioterapia', type: 'PDF', date: '10/06/2026', size: '670 KB', category: 'Relatório' },
    { id: 8, name: 'Ficha de Anamnese', type: 'PDF', date: '01/01/2026', size: '220 KB', category: 'Formulário' },
  ]

  const catColor = {
    Exame: 'info',
    Receita: 'success',
    Laudo: 'accent',
    Autorização: 'warning',
    Imagem: 'primary',
    Relatório: 'neutral',
    Formulário: 'neutral',
  }

  return (
    <div className="max-w-3xl mx-auto">
      {ToastEl}
      <PageHeader title="Documentos" subtitle="Seus arquivos e documentos médicos" />
      <div className="space-y-2">
        {docs.map((doc) => (
          <Card key={doc.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-light text-primary">
                <FileText size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{doc.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={catColor[doc.category]}>{doc.category}</Badge>
                  <span className="text-xs text-gray-400">
                    {doc.date} · {doc.size}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-primary transition"
                  title="Baixar"
                  onClick={() => show('O download dos arquivos será liberado junto com o backend.', 'info')}
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── Patient Notifications ──────────────────────────────────────────────────────
export function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Consulta confirmada',
      message: 'Sua consulta com Dr. Carlos Mendes está confirmada para 10/10 às 14:00.',
      time: 'há 2 horas',
      read: false,
      type: 'success',
    },
    {
      id: 2,
      title: 'Resultado de exame disponível',
      message: 'O resultado do seu eletrocardiograma já está disponível em Documentos.',
      time: 'há 5 horas',
      read: false,
      type: 'info',
    },
    {
      id: 3,
      title: 'Lembrete de consulta',
      message: 'Amanhã às 09:30 você tem consulta com Dra. Marina Silva. Não esqueça!',
      time: 'há 1 dia',
      read: false,
      type: 'warning',
    },
    {
      id: 4,
      title: 'Receita renovada',
      message: 'A Dra. Marina Silva renovou sua receita de uso contínuo.',
      time: 'há 3 dias',
      read: true,
      type: 'success',
    },
    {
      id: 5,
      title: 'Consulta cancelada',
      message: 'Sua consulta com Dra. Juliana Costa em 15/07 foi cancelada conforme solicitado.',
      time: 'há 1 semana',
      read: true,
      type: 'danger',
    },
  ])

  const markAll = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))

  const typeIcon = {
    success: <CheckCircle size={16} className="text-success" />,
    info: <AlertCircle size={16} className="text-info" />,
    warning: <AlertCircle size={16} className="text-warning" />,
    danger: <X size={16} className="text-danger" />,
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Notificações"
        subtitle={`${notifications.filter((n) => !n.read).length} não lidas`}
        actions={
          <Btn variant="ghost" size="sm" onClick={markAll}>
            Marcar todas como lidas
          </Btn>
        }
      />
      <div className="space-y-2">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`p-4 cursor-pointer hover:shadow-sm transition-all ${!n.read ? 'border-l-4 border-l-accent' : ''}`}
            onClick={() => setNotifications((ns) => ns.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
          >
            <div className="flex gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-gray-100' : `bg-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : n.type === 'danger' ? 'danger' : 'info'}-light`}`}
              >
                {typeIcon[n.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-semibold ${n.read ? 'text-gray-600' : 'text-gray-900'}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
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

// ── Patient Profile ────────────────────────────────────────────────────────────
export function PatientProfilePage() {
  const { user, updateUser } = useApp()
  const { show, ToastEl } = useToast()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone || '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const save = () => {
    if (!form.name.trim()) {
      show('Informe o nome.', 'error')
      return
    }
    updateUser({ name: form.name.trim(), phone: form.phone.trim() })
    setEditing(false)
    show('Perfil atualizado com sucesso!', 'success')
  }

  const cancelEdit = () => {
    setForm({ name: user.name, email: user.email, phone: user.phone || '' })
    setEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {ToastEl}
      <PageHeader
        title="Meu Perfil"
        subtitle="Seus dados pessoais e de saúde"
        actions={
          editing ? (
            <div className="flex gap-2">
              <Btn variant="outline" size="sm" onClick={cancelEdit}>
                Cancelar
              </Btn>
              <Btn variant="accent" size="sm" onClick={save}>
                Salvar
              </Btn>
            </div>
          ) : (
            <Btn variant="outline" size="sm" icon={<Edit3 size={14} />} onClick={() => setEditing(true)}>
              Editar
            </Btn>
          )
        }
      />

      {/* Avatar */}
      <Card className="p-6 mb-4">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: '#0e9f8e' }}
          >
            {user.name
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {form.name}
            </h2>
            <p className="text-gray-500">{form.email}</p>
            <Badge variant="accent">Paciente ativo</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-4">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Dados Pessoais
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Nome completo" value={form.name} onChange={set('name')} disabled={!editing} />
          <Input label="E-mail" type="email" value={form.email} disabled />
          <Input label="Telefone" value={form.phone} onChange={set('phone')} disabled={!editing} />
        </div>
      </Card>
    </div>
  )
}
