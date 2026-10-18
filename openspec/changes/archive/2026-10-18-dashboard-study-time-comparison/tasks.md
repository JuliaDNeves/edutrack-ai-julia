# Tasks

## 1. Card de Tempo de Estudo (`pages/dashboard.html` & `js/app.js`)

- [x] 1.1 Renomear o título do card de `Tempo Estimado` para `Tempo de estudo` em `pages/dashboard.html`.
- [x] 1.2 Atualizar o cálculo do card em `hydrateDashboardData()` no arquivo `js/app.js` para somar o `spent_time` apenas das tarefas concluídas com valores preenchidos, formatando em horas e minutos.

## 2. Gráfico Comparativo por Disciplina (`pages/dashboard.html`, `js/app.js` & `css/styles.css`)

- [x] 2.1 Adicionar a legenda das séries ("Horas estimadas" em lilás e "Tempo de estudo" em cyan) na seção do gráfico em `pages/dashboard.html`.
- [x] 2.2 Implementar a lógica de cálculo das duas séries no `js/app.js` para cada disciplina considerando apenas tarefas concluídas: "Horas estimadas" (soma de `estimated_time`) e "Tempo de estudo" (soma de `spent_time` quando preenchido ou `estimated_time` como fallback).
- [x] 2.3 Estilizar as barras comparativas duplas e o tooltip de comparação com cores cyan/lilás e tempos formatados em `css/styles.css`, preservando temas claro e escuro.
- [x] 2.4 Testar os cálculos e renderização do card e do gráfico com os dados existentes, verificando o funcionamento do tooltip ao passar o mouse e a atualização em tempo real ao alternar tarefas.
