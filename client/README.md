# VitaLink – Front-end (client)

Front-end do VitaLink em **React (JavaScript)** com Vite e Tailwind CSS.
Perfis: paciente, médico e administrador.

> Estado atual: front completo e funcional **com dados de exemplo (sem backend)**.
> Login, cadastro, navegação e as ações principais funcionam em memória; ao recarregar a página os dados voltam ao início.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # verifica o código com ESLint
npm run build    # build de produção
```

## Contas de teste

| Perfil   | E-mail                       | Senha          |
|----------|------------------------------|----------------|
| Paciente | ana.santos@email.com         | Paciente@123   |
| Médico   | carlos.mendes@vitalink.med   | Medico@123     |
| Admin    | admin@vitalink.com           | Admin@123      |

Em `npm run dev` a tela de login tem botões que preenchem essas contas. Também dá para criar uma conta de paciente em **Cadastrar-se**.

## Estrutura

```
src/
├── App.jsx              estado global (página, sessão, consultas) e mapa de páginas
├── AppContext.js        contexto e hook useApp()
├── constants.js         valores compartilhados (perfis, páginas de acesso)
├── mockAccounts.js      contas de exemplo  → trocar pela chamada de login da API
├── mockData.js          consultas de exemplo → trocar por dados da API
├── components/
│   ├── Layout.jsx       menu lateral e barra superior
│   ├── ui.jsx           componentes de interface (Btn, Card, Input, Modal, Table...)
│   └── useToast.jsx     hook de avisos (toast)
└── pages/
    ├── AuthPages.jsx    login e cadastro
    ├── PatientPages.jsx telas do paciente
    ├── DoctorPages.jsx  telas do médico
    └── AdminPages.jsx   telas do administrador
```

A navegação é feita por estado (`navigate('nome-da-pagina')`), sem react-router.
Perfis usados no front: `patient`, `doctor`, `admin` (no backend: `PACIENTE`, `MEDICO`, `ADMIN`).

## O que funciona hoje (em memória)

- **Login** por perfil e **cadastro** de paciente (com validação); logout.
- **Paciente:** agendar consulta (4 passos, aparece no dashboard), cancelar consulta, histórico, orçamentos, documentos, notificações, editar perfil.
- **Médico:** agenda (ver detalhes, registrar, cancelar), registro de atendimento, disponibilidade, notificações, editar perfil.
- **Administrador:** aprovar/recusar consultas, cadastrar/editar/ativar/desativar médicos, ativar/desativar pacientes, relatórios, editar perfil.

## Ainda simulado (depende do backend)

- Os dados de cada tela são independentes (só o agendamento do paciente chega ao dashboard dele).
- Download de documentos e "Exportar PDF" apenas avisam.
- Login e cadastro não gravam em banco.
