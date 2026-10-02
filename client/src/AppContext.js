import { createContext, useContext } from 'react'

const defaultContext = {
  page: 'login',
  role: null,
  navigate: () => {},
  login: () => false,
  register: () => false,
  logout: () => {},
  updateUser: () => {},
  user: { name: '', email: '' },
  appointments: [],
  addAppointment: () => {},
  cancelAppointment: () => {},
}

export const AppContext = createContext(defaultContext)

export const useApp = () => useContext(AppContext)
