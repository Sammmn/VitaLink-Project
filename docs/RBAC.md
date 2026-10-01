# Matriz de Controle de Acesso Baseada em Perfis (RBAC) do sistema VitaLink


|Requisito / Funcionalidade                      |Administrador (ADMIN)|Médico (MEDICO)|Paciente (PACIENTE)|
|------------------------------------------------|---------------------|---------------|-------------------|
|RF01 / Casos de Uso - Cadastro e Perfil         |RU                   |RU             |CRU                |
|RF02 - Realizar Login (JWT)                     |E                    |E              |E                  |
|RF04 - Visualizar médicos/especialidades        |CRUD                 |-              |R                  |
|RF05 / RF09 - Gestão de Horários/Disponibilidade|CRU                  |CRU            |R                  |
|RF06 / RF07 - Agendar e Cancelar Consulta       |-                    |-              |C / D              |
|RF10 / RF14 - Visualização de Agendas           |R                    |R              |-                  |
|RF11 / Casos de Uso - Registro de Atendimento   |U / E                |CRU            |-                  |
|RF08 / Casos de Uso - Histórico de Atendimentos |R                    |R              |R                  |
|RF12 - Gestão de Médicos                        |CRUD                 |-              |-                  |
|RF13 - Gestão de Pacientes                      |CRUD                 |R              |-                  |
|RF15 - Relatórios e Métricas                    |E                    |-              |-                  |
|Casos de Uso - Orçamentos e Documentos          |-                    |-              |R                  |
|Casos de Uso - Notificações                     |C                    |R              |R                  |

## Legenda 

* C (Create): Permissão para gerar novos registros no sistema.
* R (Read): Permissão para visualizar dados.
* U (Update): Permissão para editar ou atualizar dados existentes.   
* D (Delete): Permissão para excluir registros fisicamente ou marcá-los como inativos.   
* E (Execute): Permissão para acionar fluxos de trabalho específicos (ex: disparar notificações, gerar relatórios, autenticar).   