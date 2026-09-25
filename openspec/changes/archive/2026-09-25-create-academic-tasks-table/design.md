# Design

## Context
O EduTrack AI utiliza XanoScript para descrever a estrutura de banco de dados Xano através de arquivos `.xs` no diretório `tables/`. Ver `proposal.md` para motivação.

## Goals / Non-Goals

**Goals:**
- Definir o arquivo de tabela XanoScript `tables/academic_tasks.xs`.
- Configurar os campos solicitados (`title`, `description`, `due_date`, `status`, `subject_id`) e os campos padrão/segurança (`id`, `created_at`, `user_id`).
- Configurar os índices primários e de chave estrangeira (`user_id`, `subject_id`).

**Non-Goals:**
- Criar rotas de API GET/POST/PATCH/DELETE (escopo restrito estritamente à criação da tabela conforme Regra nº 1 do AGENTS.md).
- Executar push, sync ou deploy automático no Xano (conforme Regra nº 2 do AGENTS.md).

## Decisions

### Decisão 1: Estrutura do arquivo `tables/academic_tasks.xs`
Seguir o mesmo padrão dos arquivos `.xs` existentes (como `tables/subjects.xs`), definindo a tabela `academic_tasks` com:
- `id` (int, primary key)
- `created_at` (timestamp, private)
- `title` (text, obrigatório)
- `description` (text, opcional)
- `due_date` (date, opcional)
- `status` (text, default "pending")
- `subject_id` (int, com `table = "subjects"`)
- `user_id` (int, com `table = "user"`)

### Decisão 2: Índices para otimização de consulta
- Índice `primary` no campo `id`.
- Índice `btree` no campo `user_id` para acelerar filtros por usuário autenticado.
- Índice `btree` no campo `subject_id` para acelerar consultas por disciplina.

## Risks / Trade-offs

- [Referência de chave estrangeira `subjects`] → O desenvolvedor deve garantir que a tabela `subjects` já esteja criada no Xano antes de aplicar a tabela `academic_tasks`.
