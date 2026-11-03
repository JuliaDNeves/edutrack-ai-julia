# Design: Task Completion Flow Adjustment

## Context

Atualmente em `pages/tasks.html`, a conclusão de tarefas ocorre diretamente no manipulador `window.toggleTaskStatus` ao marcar o checkbox do card, disparando uma requisição imediata `PATCH /academic_tasks/{id}` com status `completed`. Além disso, o campo `task-spent-time` fica permanentemente visível no formulário `form-task`, sem sincronização com o status selecionado.

## Goals / Non-Goals

**Goals:**
- Controlar dinamicamente a visibilidade e o estado (habilitado/desabilitado) do campo de tempo gasto (`#task-spent-time`) de acordo com o status (`pending` vs `completed`).
- Ocultar e desabilitar o campo ao criar tarefas pendentes.
- Exibir o campo como opcional ao criar tarefas concluídas.
- Respeitar o status salvo e preservar valores prévios de tempo gasto ao editar tarefas.
- Interromper a conclusão imediata via checkbox de tarefas pendentes: abrir o formulário de edição com status `completed`, campo visível e preenchimento de tempo gasto obrigatório.
- Garantir que cancelamentos preservem o estado pendente da tarefa sem chamadas de API ou alterações visuais indevidas.

**Non-Goals:**
- Modificar esquemas de tabelas ou APIs do backend Xano.
- Alterar as regras de desmarcar tarefas concluídas (voltar para pendente).
- Modificar as regras de cálculo de métricas de tempo de estudo ou filtros existentes.

## Decisions

### 1. Manipulação do campo de tempo gasto via função utilitária dedicada
- **Decisão**: Criar a função interna `updateSpentTimeVisibility(status, isMandatory = false)` para encapsular a lógica de exibição, habilitação e atributos de obrigatoriedade do campo `#task-spent-time` e de seu container (`#form-group-spent-time`).
- **Alternativa considerada**: Manipulação ad-hoc espalhada em múltiplos pontos (`openCreateModal`, `openEditModal`, `onchange`). Rejeitada para evitar inconsistências de estado no DOM.

### 2. Fluxo da checkbox para tarefas pendentes
- **Decisão**: Ao clicar na checkbox de uma tarefa pendente, o manipulador `window.toggleTaskStatus` não enviará requisição de atualização. Em vez disso, ele cancelará o estado de marcação otimista do checkbox e invocará `openEditModal(task, { completingFromCheckbox: true })`.
- **Alternativa considerada**: Criar um modal secundário específico apenas para solicitar o tempo gasto. Rejeitada porque o usuário solicitou expressamente: *"Abrir o formulário de edição com o status já definido como `completed` (Concluída) e o campo Tempo Gasto visível"*. O reaproveitamento do modal existente mantém a interface consistente e limpa.

### 3. Validação de preenchimento obrigatório na conclusão
- **Decisão**: Utilizar uma flag interna `isCompletingViaCheckbox` durante a submissão do formulário. Quando ativa (ou quando o usuário estiver concluindo a tarefa pelo fluxo de checkbox), verificar se `spentTimeInput.value` foi preenchido com um número válido (>= 0). Se vazio, abortar a submissão, exibir toast de erro e focar no campo. Ao cancelar ou fechar o modal, resetar a flag e o formulário sem salvar.
- **Alternativa considerada**: Tornar o campo `required` via atributo HTML nativo em todos os casos. Rejeitada porque ao criar uma tarefa `completed` o campo deve continuar opcional conforme solicitado pelo usuário.

## Risks / Trade-offs

- **[Risco]** Usuário fechar o modal de conclusão (ESC, backdrop ou botão fechar) deixando o checkbox do card marcado.
  → **Mitigação**: O checkbox do card é mantido ou revertido para `checked = false` no momento do clique, e qualquer fechamento do modal sem confirmação garante a re-renderização ou preservação intacta da lista de tarefas.
- **[Risco]** Submissão de valores negativos de tempo gasto.
  → **Mitigação**: O input já possui `min="0"`, e a validação em JavaScript reforçará a checagem numérica não-negativa.
