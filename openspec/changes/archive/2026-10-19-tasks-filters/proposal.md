# Proposal

## Why

Students managing their academic tasks on `pages/tasks.html` can currently only search tasks by text (title, description, or subject name). When managing a large backlog of tasks across multiple disciplines and deadlines, users need structured filters to quickly locate tasks by deadline periods, completion status, and specific subjects. Adding flexible and combinable filters with an instant reset mechanism makes academic planning significantly faster and more intuitive while keeping all operations securely on the client with existing endpoints.

## What Changes

- **Tasks Page Filter Bar (`pages/tasks.html`)**:
  - Add a dedicated, responsive filter bar above or adjacent to the tasks list containing:
    - **Período de Data Prevista (Date Range):** Data Inicial (`due_date_from`) e Data Final (`due_date_to`) para filtrar tarefas por data de entrega.
    - **Status:** Dropdown para selecionar entre "Todos" (padrão), "Pendente" (`pending`) e "Concluída" (`completed`).
    - **Disciplina:** Dropdown populado dinamicamente com as disciplinas do usuário autenticado para selecionar entre "Todas" (padrão) e uma disciplina específica.
    - **Ação de Limpar Filtros:** Botão "Limpar Filtros" para resetar simultaneamente os seletores de data, status, disciplina e a busca textual para os valores padrão.
  - **Lógica de Filtragem e Renderização Combinada (`pages/tasks.html`)**:
    - Combinar todos os filtros (data inicial, data final, status, disciplina) com a busca textual existente.
    - Atualizar a renderização dinâmica (`renderTasks()`), os contadores na barra de estatísticas (`#tasks-count-label`, `#total-time-label`, `#spent-time-label`) e a mensagem de estado vazio para refletir o resultado dos filtros aplicados.
  - **Preservação de Escopo e Recursos Existentes**:
    - Garantir que apenas tarefas do usuário autenticado continuem sendo filtradas e manipuladas.
    - Manter intactas todas as ações do CRUD (criação, edição, exclusão e alternância rápida de status via checkbox).
    - Preservar a estética visual, a responsividade mobile e a compatibilidade com os temas claro e escuro (`[data-theme="light"]` e `[data-theme="dark"]`).
    - Não modificar APIs do backend Xano nem a página de Disciplinas (`pages/subjects.html`).

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `tasks-page`: Enhance task listing and filtering requirements to support combinable multi-criteria filtering by due date range, status, and subject, alongside a reset action.

## Impact

- **Affected Files**:
  - `pages/tasks.html`: Adicionar os controles de filtro no HTML, estilizações CSS no bloco `<style>` interno e atualizar os métodos de filtro e eventos em `<script>`.
- **APIs and Database**:
  - Nenhuma alteração nas APIs do backend Xano ou no esquema do banco de dados (reutiliza dados de `GET /academic_tasks` e `GET /subjects`).
- **Dependencies**:
  - Zero novas dependências ou bibliotecas externas.
