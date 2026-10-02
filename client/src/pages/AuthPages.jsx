import { useState } from 'react'
import { useApp } from '../AppContext'
import { Btn, Input } from '../components/ui'
import { MOCK_ACCOUNTS } from '../mockAccounts'
import { Activity, Eye, EyeOff, Mail, Lock, User, ArrowLeft, ChevronRight } from 'lucide-react'

function AuthShell({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[460px] flex-shrink-0 p-10 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a3a6b 0%, #0f2450 50%, #0e9f8e 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, #0e9f8e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: '#0e9f8e' }}
            >
              <Activity size={22} />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              VitaLink
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Cuidado de saúde conectado e inteligente
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Gerencie consultas, prontuários e sua saúde em um único lugar — seguro, rápido e moderno.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          {[
            { n: '12.400+', l: 'Pacientes ativos' },
            { n: '340+', l: 'Médicos parceiros' },
            { n: '98%', l: 'Satisfação geral' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
            >
              <p className="text-2xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {s.n}
              </p>
              <p className="text-white/60 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}

// ── Login ─────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const { navigate, login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (!login(email, password)) setError('E-mail ou senha inválidos.')
    }, 400)
  }

  return (
    <AuthShell>
      <div>
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={{ background: '#1a3a6b' }}
          >
            <Activity size={18} />
          </div>
          <span className="font-bold text-xl text-primary" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            VitaLink
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Entrar na sua conta
        </h1>
        <p className="text-gray-500 text-sm mb-8">Insira seu e-mail e senha para acessar</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-danger-light text-danger rounded-lg text-sm font-medium">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            prefix={<Mail size={16} />}
          />
          <Input
            label="Senha"
            type={show ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            prefix={<Lock size={16} />}
            suffix={
              <button type="button" onClick={() => setShow((v) => !v)} className="text-gray-400 hover:text-gray-600">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <Btn type="submit" variant="primary" loading={loading} className="w-full justify-center">
            Entrar
          </Btn>
        </form>

        {/* Atalhos para preencher as contas de teste. Só aparecem em `npm run dev`. */}
        {import.meta.env.DEV && (
          <div className="mt-6 pt-5 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center mb-2 font-medium uppercase tracking-wide">
              Contas de teste
            </p>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_ACCOUNTS.slice(0, 3).map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => {
                    setEmail(acc.email)
                    setPassword(acc.password)
                    setError('')
                  }}
                  className="py-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary text-xs font-semibold text-gray-600 transition"
                >
                  {acc.role === 'patient' ? 'Paciente' : acc.role === 'doctor' ? 'Médico' : 'Admin'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-gray-500 text-sm">Não tem conta? </span>
          <button onClick={() => navigate('register')} className="text-primary font-semibold text-sm hover:underline">
            Cadastrar-se
          </button>
        </div>
      </div>
    </AuthShell>
  )
}

// ── Register ──────────────────────────────────────────────────────────────────
export function RegisterPage() {
  const { navigate, register } = useApp()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: '' }))
  }

  const validateStep1 = () => {
    const e = {}
    if (form.name.trim().length < 3) e.name = 'Informe o nome completo'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'E-mail inválido'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) e.phone = 'Informe o telefone com DDD'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (form.password.length < 8) e.password = 'A senha deve ter no mínimo 8 caracteres'
    if (form.password !== form.confirm) e.confirm = 'As senhas não coincidem'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2)
      return
    }
    if (!validateStep2()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (!register({ name: form.name, email: form.email, phone: form.phone, password: form.password })) {
        setErrors({ email: 'E-mail já cadastrado' })
        setStep(1)
      }
    }, 400)
  }

  return (
    <AuthShell>
      <div>
        <button
          onClick={() => (step === 1 ? navigate('login') : setStep(1))}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition" /> Voltar
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Criar conta
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Passo {step} de 2 — {step === 1 ? 'Dados pessoais' : 'Acesso e segurança'}
        </p>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="h-1.5 flex-1 rounded-full transition-all"
              style={{ background: s <= step ? '#0e9f8e' : '#e5e7eb' }}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <Input
              label="Nome completo"
              placeholder="Xiko Pikadinha"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              prefix={<User size={16} />}
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              prefix={<Mail size={16} />}
            />
            <Input
              label="Telefone"
              placeholder="(71) 99999-9999"
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              prefix={<Lock size={16} />}
            />
            <Input
              label="Confirmar senha"
              type="password"
              placeholder="Repita sua senha"
              value={form.confirm}
              onChange={set('confirm')}
              error={errors.confirm}
              prefix={<Lock size={16} />}
            />
            <div className="p-4 bg-info-light rounded-xl text-info text-sm flex gap-2">
              <span className="font-bold text-base">i</span>
              <span>Ao criar sua conta você concorda com os Termos de Uso e Política de Privacidade da VitaLink.</span>
            </div>
          </div>
        )}

        <Btn
          onClick={next}
          variant={step === 2 ? 'accent' : 'primary'}
          loading={loading}
          className="w-full justify-center mt-6"
          icon={step === 2 ? undefined : <ChevronRight size={16} />}
        >
          {step === 2 ? 'Criar minha conta' : 'Continuar'}
        </Btn>
        {step === 1 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Já tem conta?{' '}
            <button onClick={() => navigate('login')} className="text-primary font-semibold hover:underline">
              Entrar
            </button>
          </p>
        )}
      </div>
    </AuthShell>
  )
}
