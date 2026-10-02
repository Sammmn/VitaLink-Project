export const MOCK_ACCOUNTS = [
  {
    email: 'xiko.pikadinha@email.com',
    password: 'xiko123',
    role: 'patient',
    user: { name: 'Xiko Picadinha', email: 'xiko.pikadinha@email.com', phone: '(71) 98765-4321' },
  },
  {
    email: 'dr.bilola@email.com',
    password: 'bilola123',
    role: 'doctor',
    user: {
      name: 'Dr. Bilola Cilola',
      email: 'drbilola@email.com',
      phone: '(71) 91234-5678',
      specialty: 'Cardiologia',
      crm: 'CRM-BA 45823',
    },
  },
  {
    email: 'zedopneu@email.com',
    password: 'ze123',
    role: 'admin',
    user: { name: 'Zeze Do Pneu', email: 'ze.pneu@email.com', phone: '(71) 93456-7890', role: 'Administrador Geral' },
  },
]

export function findAccount(email, password) {
  const mail = email.trim().toLowerCase()
  return MOCK_ACCOUNTS.find((a) => a.email === mail && a.password === password)
}

/** Cadastro de paciente (fica só na memória: some ao recarregar a página). */
export function registerPatient(data) {
  const mail = data.email.trim().toLowerCase()
  if (MOCK_ACCOUNTS.some((a) => a.email === mail)) return null
  const account = {
    email: mail,
    password: data.password,
    role: 'patient',
    user: { name: data.name.trim(), email: mail, phone: data.phone.trim() || undefined },
  }
  MOCK_ACCOUNTS.push(account)
  return account
}
