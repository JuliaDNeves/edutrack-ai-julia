# Design

## Context

A funcionalidade de **Insights Inteligentes** foi implementada no EduTrack com sucesso, integrando um motor analítico em Python (`scripts/insights_server.py`), análise com IA (Google Gemini) e contingência heurística, acessível via requisições sob demanda. Originalmente, essa interface foi alocada em uma seção do Dashboard (`pages/dashboard.html`).

Para manter o Dashboard focado em métricas executivas rápidas e evitar poluição visual, a interface analítica completa deve ser transferida para uma página dedicada (`pages/insights.html`), denominada `InsightsPage`, acessível pelo menu lateral de navegação.

Ver `proposal.md` para motivação e escopo, e `specs/` para os requisitos contratuais de interface e comportamento.

## Goals / Non-Goals

**Goals:**
- Criar a página `pages/insights.html` preservando integralmente o layout, cabeçalho, paleta de cores e temas (claro/escuro) do EduTrack AI.
- Transferir a seção completa de Insights Inteligentes (gatilho sob demanda, estado inicial/convite, feedback de carregamento, card de erro com retry, badge de motor IA vs. Heurística e os 4 cards estruturados de diagnósticos e recomendações).
- Adicionar o item "Insights" (`#nav-insights`) ao menu de navegação lateral (`<ul class="nav-menu">`) e à barra de navegação mobile em todas as páginas do sistema (`dashboard.html`, `subjects.html`, `tasks.html`, `settings.html` e `insights.html`), com ícone Font Awesome (`fa-solid fa-brain`).
- Assegurar que `js/app.js` inicialize os eventos e hidrate os dados de contexto do usuário, disciplinas e tarefas para o envio sob demanda ao motor analítico a partir de `insights.html`.
- Remover a seção embutida de insights em `pages/dashboard.html` apenas após a validação e garantia da transferência completa.

**Non-Goals:**
- Não alterar regras de negócio, cálculos analíticos, tempos ou percentuais de tarefas e disciplinas.
- Não modificar o backend Python (`scripts/insights_server.py`), portas de rede ou APIs do Xano.
- Não introduzir dependências ou bibliotecas JavaScript adicionais (reutilizar `css/styles.css`, `js/auth.js` e `js/app.js`).
- Não alterar outras páginas, tabelas ou formulários existentes.

## Decisions

### Decisão 1: Arquitetura Multi-Página (`pages/insights.html`) com Shell Unificado
- **Abordagem escolhida:** Criar `pages/insights.html` como uma página HTML estática padrão do EduTrack, reutilizando a mesma estrutura de layout: `<aside class="sidebar">`, `<div class="app-container">`, `<header class="app-header">` e `<main class="main-content">`.
- **Alternativas consideradas:**
  - *Alternativa A (Single Page Application - SPA view swap):* Alternar visibilidade dinamicamente no Dashboard via JavaScript. **Rejeitada**, pois quebra a arquitetura multi-página existente do EduTrack (`dashboard.html`, `subjects.html`, `tasks.html`, `settings.html`) e impediria navegação direta via URL.
  - *Alternativa B (Iframe ou componente isolado):* **Rejeitada**, pois adiciona complexidade desnecessária e dificulta o compartilhamento de temas e autenticação.

### Decisão 2: Layout e Disposição dos Cards na `InsightsPage`
- **Abordagem escolhida:** Na nova página, a área de conteúdo principal terá foco exclusivo na análise acadêmica. O topo conterá o cabeçalho de boas-vindas e o bloco de ação dos Insights (título, badge do motor analítico e botão "Gerar insights"). Abaixo, o estado inicial (placeholder de convite), estados de erro/loading e a grade de cards estruturados (`#insights-results-grid`). A estrutura visual reutiliza integralmente as classes CSS existentes em `css/styles.css` (`.insights-section`, `.insight-card`, `.status-tag`, `.insights-engine-badge`, etc.).
- **Alternativas consideradas:**
  - *Criar um novo grid CSS ou reestilizar os cards:* **Rejeitada**, pois a especificação do usuário exige manter rigorosamente a estética e funcionamento já validados.

### Decisão 3: Estratégia de Hidratação de Dados em `js/app.js`
- **Abordagem escolhida:** `js/app.js` já possui a função `hydrateDashboardData()`, que busca `subjects` e `academic_tasks` do usuário autenticado no Xano quando elementos de sessão estão presentes (`user-name-sidebar` ou `welcome-user-heading`). Na nova página `insights.html`, o script reutiliza essa carga de dados. Caso o usuário clique em "Gerar insights" antes de as variáveis globais estarem disponíveis, o handler fará o fetch sob demanda antes de disparar para o endpoint de insights, garantindo integridade.
- **Alternativas consideradas:**
  - *Criar um arquivo JS separado apenas para insights:* **Rejeitada**, para manter centralizado o ciclo de vida do cliente e evitar fragmentação de scripts.

### Decisão 4: Atualização Consistente da Navegação Global
- **Abordagem escolhida:** O item de menu "Insights" será adicionado como quarto item da navegação lateral (após "Tarefas" e antes de "Configurações"), com id `nav-insights` e ícone `fa-solid fa-brain`, apontando para `insights.html` (ou caminho relativo correspondente em cada página). Em `insights.html`, a classe `active` é aplicada ao item `nav-insights`.
- **Alternativas consideradas:**
  - *Adicionar link apenas no Dashboard:* **Rejeitada**, pois o usuário deve conseguir navegar diretamente para os Insights a partir de qualquer página do EduTrack.

### Decisão 5: Sequência de Migração Segura (Transferência antes da Remoção)
- **Abordagem escolhida:** Criar e testar primeiro `pages/insights.html` com todos os seus componentes e interações. Somente após a página estar 100% operacional, remover o bloco HTML `<section class="insights-section">` de `pages/dashboard.html`.

## Risks / Trade-offs

- **[Risco: Carregamento assíncrono de dados no clique rápido]**
  - *Mitigação:* No `handleGenerateInsights()`, se `currentDashboardSubjects` ou `currentDashboardTasks` ainda não estiverem carregados no momento do clique, invocar o fetch de disciplinas e tarefas diretamente antes de chamar o motor analítico.
- **[Risco: Inconsistência de caminhos relativos de navegação]**
  - *Mitigação:* Usar caminhos padronizados `insights.html` para páginas dentro de `pages/`, preservando a consistência dos links existentes.
- **[Risco: Quebra de tema claro/escuro na nova página]**
  - *Mitigação:* Incluir o script inline de restauração de tema (`localStorage.getItem('edutrack_theme')`) no `<head>` de `pages/insights.html` e a importação de `js/app.js` no final do `<body>`, garantindo zero FOUC (*Flash of Unstyled Content*).

