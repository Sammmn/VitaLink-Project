import React, { useState } from 'react'
import { useApp } from '../AppContext'
import { Card, Btn, Avatar, Modal, PageHeader, EmptyState } from '../components/ui'
import { useToast } from '../components/useToast'
import {
  Heart,
  Activity,
  Bone,
  Baby,
  Brain,
  Eye,
  Stethoscope,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'

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
  {
    id: 1,
    name: 'Dr. Bilola Cilola',
    specialty: 'Cardiologia',
    crm: 'CRM-BA 45823',
    rating: 4.8,
    experience: '15 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 2,
    name: 'Dra. Marina Silva',
    specialty: 'Dermatologia',
    crm: 'CRM-SP 38291',
    rating: 4.9,
    experience: '12 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 3,
    name: 'Dr. Rafael Torres',
    specialty: 'Ortopedia',
    crm: 'CRM-SP 52047',
    rating: 4.7,
    experience: '18 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 4,
    name: 'Dra. Juliana Costa',
    specialty: 'Pediatria',
    crm: 'CRM-SP 29384',
    rating: 4.9,
    experience: '10 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 5,
    name: 'Dr. Marcos Oliveira',
    specialty: 'Neurologia',
    crm: 'CRM-SP 61823',
    rating: 4.8,
    experience: '20 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 6,
    name: 'Dra. Fernanda Lima',
    specialty: 'Ginecologia',
    crm: 'CRM-SP 44912',
    rating: 4.9,
    experience: '14 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 7,
    name: 'Dr. Paulo Nogueira',
    specialty: 'Oftalmologia',
    crm: 'CRM-SP 57104',
    rating: 4.7,
    experience: '16 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 8,
    name: 'Dra. Renata Alves',
    specialty: 'Clínica Geral',
    crm: 'CRM-SP 36419',
    rating: 4.6,
    experience: '8 anos',
    location: 'São Paulo, SP',
  },
  {
    id: 9,
    name: 'Dr. Carlos Mendes',
    specialty: 'Cardiologia',
    crm: 'CRM-SP 34521',
    rating: 4.8,
    experience: '13 anos',
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: 10,
    name: 'Dra. Ana Beatriz',
    specialty: 'Dermatologia',
    crm: 'CRM-RJ 22310',
    rating: 4.9,
    experience: '9 anos',
    location: 'Curitiba, PR',
  },
]

const timeSlots = [
  { time: '08:00', available: true },
  { time: '08:30', available: false },
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: false },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: false },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
]

export function PatientDoctorListPage() {
  const { navigate } = useApp()
  const { show, ToastEl } = useToast()

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [showDoctorModal, setShowDoctorModal] = useState(false)

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty.name)
    : []

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty)
    setSelectedDoctor(null)
  }

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
    setShowDoctorModal(true)
  }

  const handleScheduleRedirect = () => {
    setShowDoctorModal(false)
    navigate('patient-schedule')
    show(`Você será levado para agendar com ${selectedDoctor?.name}.`, 'info')
  }

  return (
    <div className="max-w-6xl mx-auto">
      {ToastEl}

      <PageHeader
        title="Médicos e Especialidades"
        subtitle="Encontre o especialista ideal para o seu atendimento"
      />

      <div className="mb-8">
        <h2 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Escolha uma especialidade
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => handleSpecialtySelect(specialty)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${selectedSpecialty?.id === specialty.id
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-gray-200 bg-white hover:border-accent hover:shadow-sm'
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${specialty.color}15`, color: specialty.color }}
              >
                {specialty.icon}
              </div>

              <span className="text-xs font-semibold text-gray-800 text-center">{specialty.name}</span>
              <span className="text-xs text-gray-400">{specialty.count} médicos</span>
            </button>
          ))}
        </div>
      </div>

      {selectedSpecialty ? (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => {
                setSelectedSpecialty(null)
                setSelectedDoctor(null)
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h2 className="font-semibold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Médicos - {selectedSpecialty.name}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'médico disponível' : 'médicos disponíveis'}
              </p>
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <EmptyState
              icon={<Stethoscope size={32} />}
              title="Nenhum médico encontrado"
              description="Não há médicos disponíveis nessa especialidade no momento."
            />
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar name={doctor.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">{doctor.name}</p>
                      <p className="text-xs text-gray-500 mb-1">{doctor.specialty}</p>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-gray-700">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock size={12} /> {doctor.experience}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin size={12} /> {doctor.location}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">{doctor.crm}</p>

                  <Btn
                    onClick={() => handleDoctorSelect(doctor)}
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    icon={<ChevronRight size={14} />}
                  >
                    Ver detalhes
                  </Btn>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Stethoscope size={32} />}
          title="Selecione uma especialidade"
          description="Clique em uma especialidade para visualizar os médicos disponíveis."
        />
      )}

      <Modal
        open={showDoctorModal}
        onClose={() => {
          setShowDoctorModal(false)
          setSelectedDoctor(null)
        }}
        title="Detalhes do Médico"
        size="md"
      >
        {selectedDoctor && (
          <div className="space-y-5">
            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
              <Avatar name={selectedDoctor.name} size="xl" />
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {selectedDoctor.name}
                </p>
                <p className="text-gray-600 text-sm">{selectedDoctor.specialty}</p>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        className={
                          starIndex <= Math.floor(selectedDoctor.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{selectedDoctor.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'CRM', value: selectedDoctor.crm },
                { label: 'Experiência', value: selectedDoctor.experience },
                { label: 'Localização', value: selectedDoctor.location },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Próximos horários disponíveis</h4>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.slice(0, 8).map((slot) => (
                  <div
                    key={slot.time}
                    className={`py-2 px-2 rounded-lg text-xs font-medium text-center ${
                      slot.available
                        ? 'bg-success-light text-success border border-success'
                        : 'bg-gray-100 text-gray-400 line-through'
                    }`}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <Btn
                onClick={() => {
                  setShowDoctorModal(false)
                  setSelectedDoctor(null)
                }}
                variant="outline"
                size="sm"
                className="flex-1 justify-center"
              >
                Fechar
              </Btn>

              <Btn
                onClick={handleScheduleRedirect}
                variant="accent"
                size="sm"
                className="flex-1 justify-center"
                icon={<Clock size={14} />}
              >
                Agendar consulta
              </Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}