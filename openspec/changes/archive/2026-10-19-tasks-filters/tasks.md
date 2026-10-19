# Tasks

## 1. Interface e Estilos dos Filtros (`pages/tasks.html`)

- [x] 1.1 Inserir a barra de filtros na página `pages/tasks.html` contendo os campos de período de data prevista (data inicial e data final), seleção de status (Pendente / Concluída), seleção de disciplina e botão para limpar filtros, verificando a renderização visual.
- [x] 1.2 Adicionar as regras de CSS no bloco de estilos de `pages/tasks.html` para estilizar os controles de filtro garantindo responsividade mobile e suporte completo aos temas claro e escuro (`[data-theme="light"]` e `[data-theme="dark"]`).

## 2. Integração e Lógica dos Filtros (`pages/tasks.html`)

- [x] 2.1 Atualizar a função `fetchSubjects()` em `pages/tasks.html` para carregar as disciplinas do usuário autenticado no select de filtro de disciplinas.
- [x] 2.2 Implementar a lógica de filtragem combinada na função `renderTasks()` de `pages/tasks.html`, filtrando as tarefas por período de data prevista (`due_date`), status selecionado (`pending` ou `completed`), disciplina selecionada e busca textual.
- [x] 2.3 Implementar a ação do botão "Limpar Filtros" para resetar todos os campos de filtro (datas, status, disciplina e busca) e atualizar a listagem e os contadores de tarefas.
- [x] 2.4 Verificar o funcionamento dos filtros combinados, a exibição de estado vazio quando nenhum resultado for encontrado e a preservação das operações de CRUD existentes na página de Tarefas.
