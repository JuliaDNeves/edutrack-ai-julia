# Proposal

## Why

A seção de Insights Inteligentes foi inicialmente integrada ao Dashboard para validar o motor analítico e a geração de recomendações pela IA. No entanto, o Dashboard deve focar em uma visão executiva e imediata do progresso do estudante, enquanto a análise aprofundada de desempenho, diagnósticos por disciplina e planos de ação pedagógicos merecem um espaço próprio, despoluído e dedicado (`InsightsPage`), acessível a qualquer momento a partir da navegação lateral do EduTrack.

## What Changes

- Criar a página dedicada `pages/insights.html`, seguindo rigorosamente a estrutura semântica, o cabeçalho e o layout responsivo do EduTrack AI.
- Transferir integralmente para a nova página a seção de Insights Inteligentes, preservando exatamente os mesmos elementos:
  - Botão de acionamento sob demanda ("Gerar insights");
  - Estado inicial de convite;
  - Feedback visual de carregamento (spinner) e card de erro;
  - Badge identificador de motor analítico (IA vs. Fallback determinístico);
  - 4 cards estruturados: Resumo Geral, Diagnósticos por Disciplina com tags de desvio temporal, Recomendações Práticas e Pontos Fortes.
- Adicionar a nova opção "Insights" ao menu lateral (`<ul class="nav-menu">`) em todas as páginas da aplicação (`dashboard.html`, `subjects.html`, `tasks.html`, `settings.html` e na nova `insights.html`), com ícone Font Awesome (`fa-solid fa-brain` ou `fa-solid fa-lightbulb`) e estado ativo destacado.
- Atualizar a navegação mobile (barra inferior) para contemplar o novo item mantendo a harmonia e responsividade.
- Adaptar o script frontend (`js/app.js`) para suportar a inicialização e acionamento dos insights na nova página `insights.html`.
- Remover a seção de Insights do `pages/dashboard.html` somente após a transferência e validação completa na nova página.

## Capabilities

### New Capabilities

- `insights-page`: Define a estrutura da página dedicada `pages/insights.html`, layout de visualização dos cards de diagnóstico, recomendações e fluxo sob demanda de análise acadêmica.

### Modified Capabilities

- `dashboard-frontend`: Atualizar a navegação lateral e mobile para incluir o link para a nova página de Insights e remover a seção interna de insights que estava embutida no Dashboard.

## Impact

- **Frontend:**
  - Criação de `pages/insights.html`.
  - Atualização do menu de navegação em `pages/dashboard.html`, `pages/subjects.html`, `pages/tasks.html` e `pages/settings.html`.
  - Remoção da `<section class="insights-section">` de `pages/dashboard.html`.
  - Ajustes em `js/app.js` para gerenciar a inicialização dos insights na nova página.
- **Backend/APIs:** Nenhum impacto. Não há qualquer alteração em tabelas, queries XanoScript, regras de negócio ou cálculos matemáticos.
- **Visual:** Reutilização total das classes CSS já criadas em `css/styles.css` e tokens de design do EduTrack.

