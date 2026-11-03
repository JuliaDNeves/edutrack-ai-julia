# Tasks

## 1. Controle Dinâmico do Campo Tempo Gasto no Formulário

- [x] 1.1 Identificar o container do campo `Tempo Gasto (minutos)` no modal de tarefas em `pages/tasks.html` e implementar função para ocultar/desabilitar quando status for `pending` e exibir/habilitar quando status for `completed`
- [x] 1.2 Ajustar `openCreateModal` para ocultar e desabilitar o campo `Tempo Gasto (minutos)` por padrão (status `pending`) e permitir preenchimento opcional caso o status seja alterado para `completed`
- [x] 1.3 Adicionar listener de evento `change` no seletor de status (`task-status`) para alternar a exibição e habilitação do campo dinamicamente sem recarregar a página
- [x] 1.4 Atualizar `openEditModal` para respeitar o status salvo da tarefa e preservar o valor de tempo gasto já registrado

## 2. Fluxo de Conclusão de Tarefas via Checkbox

- [x] 2.1 Modificar o manipulador de alternância de status da checkbox (`toggleTaskStatus`) para não concluir imediatamente tarefas pendentes e abrir o formulário de edição com status `completed` e campo `Tempo Gasto` visível
- [x] 2.2 Exigir o preenchimento obrigatório do campo `Tempo Gasto (minutos)` na submissão do formulário ao confirmar a conclusão iniciada pela checkbox
- [x] 2.3 Persistir a conclusão da tarefa via API somente após confirmação válida e manter a tarefa como pendente com checkbox desmarcado caso o usuário cancele ou feche o modal
