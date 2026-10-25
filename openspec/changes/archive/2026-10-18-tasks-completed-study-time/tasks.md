# Tasks

## 1. Implementação da Exibição e Cálculo de Tempo (`pages/tasks.html`)

- [x] 1.1 Adicionar a nova exibição "Tempo de estudo realizado" (`#spent-time-label`) logo abaixo da exibição atual de "Tempo estimado" (`#total-time-label`) na barra de estatísticas de `pages/tasks.html`, verificando o alinhamento visual correto.
- [x] 1.2 Atualizar a função `renderTasks()` para manter o cálculo de "Tempo estimado" (soma de `estimated_time` de todas as tarefas) e calcular "Tempo de estudo realizado" como a soma de `spent_time` apenas das tarefas concluídas (`status === 'completed'`) com valores preenchidos, garantindo que tarefas pendentes não contribuam.
- [x] 1.3 Testar os cálculos na página `pages/tasks.html` com os dados existentes, verificando a precisão da soma de tempo estimado e tempo realizado, o tratamento de valores vazios/nulos e a atualização em tempo real ao alternar status.
