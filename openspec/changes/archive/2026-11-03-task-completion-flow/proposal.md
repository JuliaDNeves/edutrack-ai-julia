# Proposal: Task Completion Flow Adjustment

## Why

Atualmente na página `pages/tasks.html`, marcar o checkbox de uma tarefa pendente conclui a atividade imediatamente sem solicitar o tempo de dedicação gasto, e o campo de tempo gasto fica visível no formulário mesmo ao cadastrar tarefas pendentes.
Para melhorar a precisão do registro de horas de estudo e evitar dados inconsistentes, o sistema deve condicionar o campo de tempo gasto ao status da tarefa e exigir o registro do tempo gasto antes de efetivar a conclusão de uma tarefa.

## What Changes

- **Controle dinâmico do campo `Tempo Gasto (minutos)` no formulário de tarefas**:
  - Ao criar uma nova tarefa com status `pending` (Pendente), ocultar e desabilitar o campo `Tempo Gasto`.
  - Ao criar uma nova tarefa com status `completed` (Concluída), exibir o campo `Tempo Gasto`, permitindo preenchimento opcional.
  - Ao editar uma tarefa existente, respeitar o status salvo da tarefa e preservar o tempo gasto previamente registrado.
  - O campo deve acompanhar dinamicamente o status selecionado no formulário (`task-status`) sem recarregar a página.
- **Fluxo de conclusão via checkbox da tarefa**:
  - Ao marcar a checkbox de uma tarefa pendente, não concluir imediatamente via requisição automática.
  - Abrir o formulário de edição com o status já definido como `completed` (Concluída) e o campo `Tempo Gasto` visível.
  - Exigir que o usuário informe o tempo gasto antes de confirmar a conclusão da tarefa.
  - Só salvar a conclusão após o preenchimento e confirmação do usuário. Se o usuário cancelar ou fechar o modal, manter a tarefa pendente.
- **Preservação de funcionalidades**:
  - Preservar o CRUD completo de tarefas, os cálculos de tempo total e estudo realizado, e as integrações existentes com a API Xano.

## Capabilities

### Modified Capabilities
- `tasks-page`: Atualiza os requisitos de criação/edição de tarefas e alternância de status via checkbox para incorporar o controle de exibição do tempo gasto e a exigência de preenchimento ao concluir uma tarefa.

## Impact

- **Código Frontend**: Modificações no arquivo `pages/tasks.html` (comportamento do modal `form-task`, listeners de status e manipulador `window.toggleTaskStatus`).
- **APIs e Banco de Dados**: Nenhuma alteração necessária nas APIs do Xano ou no modelo de dados.
