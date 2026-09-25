# Proposal

## Why
O aluno precisa registrar e gerenciar suas obrigações acadêmicas (lições, provas, trabalhos) vinculadas às suas disciplinas no EduTrack AI. A criação da tabela `academic_tasks` provê a estrutura de dados necessária para esse controle.

## What Changes
- Definir o esquema da nova tabela `academic_tasks` no banco de dados com os campos `title`, `description`, `due_date`, `status` e a relação `subject_id` com a tabela `subjects`.

## Capabilities

### New Capabilities
- `academic-tasks`: Define a estrutura da tabela `academic_tasks` para armazenamento de tarefas acadêmicas vinculadas a disciplinas.

### Modified Capabilities

## Impact
- Nova tabela `academic_tasks` no banco de dados Xano (arquivo XanoScript em `tables/academic_tasks.xs`).
