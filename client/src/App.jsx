import { useState } from 'react'
import { AUTH_PAGES } from './constants'
import { AppContext } from './AppContext'
import Layout from './components/Layout'
import { findAccount, registerPatient } from './mockAccounts'
import { upcomingAppointments } from './mockData'

// ── Auth pages ────────────────────────────────────────────────────────────────
import { LoginPage, RegisterPage } from './pages/AuthPages'

// ── Patient pages ─────────────────────────────────────────────────────────────
import {
  PatientDashboard,
  PatientSchedulePage,
  PatientHistoryPage,
  PatientBudgetsPage,
  PatientDocumentsPage,
  PatientNotificationsPage,
  PatientProfilePage,
} from './pages/PatientPages'

// ── Doctor pages ──────────────────────────────────────────────────────────────
import {
  DoctorDashboard,
  DoctorSchedulePage,
  DoctorConsultationsPage,
  DoctorAvailabilityPage,
  DoctorNotificationsPage,
  DoctorProfilePage,
} from './pages/DoctorPages'

// ── Admin pages ───────────────────────────────────────────────────────────────
import {
  AdminDashboard,
  AdminDoctorsPage,
  AdminPatientsPage,
  AdminConsultationsPage,
  AdminReportsPage,
  AdminProfilePage,
} from './pages/AdminPages'

// ── Page map ──────────────────────────────────────────────────────────────────
const PAGE_MAP = {
  // Auth
  login: LoginPage,
  register: RegisterPage,
  // Patient
  'patient-dashboard': PatientDashboard,
  'patient-schedule': PatientSchedulePage,
  'patient-history': PatientHistoryPage,
  'patient-budgets': PatientBudgetsPage,
  'patient-documents': PatientDocumentsPage,
  'patient-notifications': PatientNotificationsPage,
  'patient-profile': PatientProfilePage,
  // Doctor
  'doctor-dashboard': DoctorDashboard,
  'doctor-schedule': DoctorSchedulePage,
  'doctor-consultations': DoctorConsultationsPage,
  'doctor-availability': DoctorAvailabilityPage,
  'doctor-notifications': DoctorNotificationsPage,
  'doctor-profile': DoctorProfilePage,
  // Admin
  'admin-dashboard': AdminDashboard,
  'admin-doctors': AdminDoctorsPage,
  'admin-patients': AdminPatientsPage,
  'admin-consultations': AdminConsultationsPage,
  'admin-reports': AdminReportsPage,
  'admin-profile': AdminProfilePage,
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('login')
  const [role, setRoleState] = useState(null)
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState(upcomingAppointments)

  const navigate = (p) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  const startSession = (account) => {
    setUser(account.user)
    setRoleState(account.role)
    setAppointments(upcomingAppointments)
    navigate(`${account.role}-dashboard`)
  }

  const login = (email, password) => {
    const account = findAccount(email, password)
    if (!account) return false
    startSession(account)
    return true
  }

  const register = (data) => {
    const account = registerPatient(data)
    if (!account) return false
    startSession(account)
    return true
  }

  const logout = () => {
    setUser(null)
    setRoleState(null)
    setPage('login')
  }

  const addAppointment = (data) => setAppointments((list) => [...list, { ...data, id: Date.now(), status: 'pending' }])

  const cancelAppointment = (id) => setAppointments((list) => list.filter((a) => a.id !== id))

  const updateUser = (changes) => setUser((u) => (u ? { ...u, ...changes } : u))

  // Só mostra telas internas se houver sessão
  const isAuth = role !== null && user !== null && !AUTH_PAGES.includes(page)
  const PageComponent = (isAuth || AUTH_PAGES.includes(page) ? PAGE_MAP[page] : LoginPage) || LoginPage

  return (
    <AppContext.Provider
      value={{
        page,
        role,
        navigate,
        login,
        register,
        logout,
        updateUser,
        user: user ?? { name: '', email: '' },
        appointments,
        addAppointment,
        cancelAppointment,
      }}
    >
      {isAuth ? (
        <Layout>
          <PageComponent />
        </Layout>
      ) : (
        <PageComponent />
      )}
    </AppContext.Provider>
  )
}
