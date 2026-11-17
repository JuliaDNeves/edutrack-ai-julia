# Tasks

## 1. Estrutura e Estilização da Interface do Dashboard

- [x] 1.1 Criar a marcação HTML da seção "Insights Inteligentes" no `pages/dashboard.html` abaixo do gráfico de tempo de estudo, incluindo o botão "Gerar insights", os contêineres para o badge de origem (IA/fallback) e as áreas para os cards de resultados.
- [x] 1.2 Implementar as regras CSS em `css/styles.css` para a seção de insights, botão de ação, badges do motor analítico (IA vs. Fallback), cards de diagnósticos por disciplina e listas de recomendações e pontos fortes, com suporte aos temas claro e escuro.

## 2. Integração e Renderização dos Insights no Frontend

- [x] 2.1 Implementar no `js/app.js` o evento de clique do botão "Gerar insights", acionando a requisição sob demanda ao endpoint de insights exclusivamente quando solicitado pelo usuário.
- [x] 2.2 Implementar no `js/app.js` o gerenciamento visual dos estados de carregamento (spinner animado e desativação do botão) e de mensagens de erro amigáveis em caso de falha de conexão.
- [x] 2.3 Implementar a renderização dinâmica dos resultados nos 4 cards estruturados: Resumo Geral, Diagnósticos por Disciplina com tags de desvio temporal, Recomendações Práticas e Pontos Fortes.
- [x] 2.4 Implementar a exibição do badge indicativo da origem da análise (`ai_engine.status`), sinalizando visualmente se as recomendações foram geradas pela IA (Google Gemini) ou pelas regras heurísticas de contingência (fallback).

