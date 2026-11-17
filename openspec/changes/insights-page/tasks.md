# Tasks

## 1. Criação da Página de Insights (`pages/insights.html`)

- [x] 1.1 Criar o arquivo `pages/insights.html` com o shell responsivo do EduTrack (header, sidebar, tema claro/escuro, scripts) e verificar a estrutura no navegador
- [x] 1.2 Transferir integralmente a seção de Insights Inteligentes para `pages/insights.html` (botão "Gerar insights", estado inicial de convite, feedback de carregamento, card de erro com retry, badge de motor IA/fallback e os 4 cards estruturados de resultados) e verificar a presença de todos os IDs e classes CSS

## 2. Atualização do Menu de Navegação Global

- [x] 2.1 Adicionar a opção "Insights" (`#nav-insights`) com ícone Font Awesome (`fa-solid fa-brain`) e link para `insights.html` no menu lateral e na navegação mobile de `pages/dashboard.html`, `pages/subjects.html`, `pages/tasks.html`, `pages/settings.html` e `pages/insights.html`, ativando o item correspondente em `insights.html`, e verificar os links

## 3. Adaptação do Script Frontend (`js/app.js`)

- [x] 3.1 Adaptar a lógica em `js/app.js` para inicializar a sessão do usuário e os eventos do botão "Gerar insights" na página `pages/insights.html`, garantindo o fluxo sob demanda, e verificar o acionamento e renderização dos cards

## 4. Remoção da Seção de Insights do Dashboard

- [x] 4.1 Remover a seção `<section class="insights-section">` de `pages/dashboard.html` após validar que a funcionalidade foi transferida integralmente para `pages/insights.html`, e verificar a harmonia visual do Dashboard

