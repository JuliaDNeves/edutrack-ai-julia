# Design

## Context

O Dashboard do EduTrack AI (`pages/dashboard.html`) exibe uma barra de cabeçalho (`.header-bar`) contendo saudação ao usuário e uma caixa de pesquisa (`.search-box`), além de um menu lateral direito (`.right-panel`) que abriga o cartão de perfil do usuário (`.profile-card`) e a lista de tarefas pendentes (`.tasks-panel`).

A funcionalidade de exportação de relatório PDF adicionou anteriormente o botão `#btn-download-report` no cabeçalho. O objetivo atual é reorganizar a interface para eliminar a caixa de pesquisa desnecessária no Dashboard e posicionar o botão "Relatório PDF" de forma contextual e ergonômica no menu lateral direito, logo abaixo do card do usuário e acima das próximas tarefas.

## Goals / Non-Goals

**Goals:**
- Remover a barra de pesquisa (`#header-search` e container `.search-box`) da barra de cabeçalho do Dashboard.
- Mover o botão `#btn-download-report` para o painel lateral direito (`.right-panel`), posicionado entre o `.profile-card` e a `.tasks-panel`.
- Ajustar os estilos CSS (`css/styles.css`) para que o botão ocupe a largura completa do painel com alinhamento centralizado, mantendo o gradiente, ícone e tipografia originais.
- Preservar a funcionalidade total do botão de download de PDF, a responsividade e o suporte a temas claro/escuro.

**Non-Goals:**
- Não alterar regras de negócio, dados, APIs ou endpoints do backend.
- Não alterar as telas de Disciplinas, Tarefas, Configurações ou Autenticação.
- Não alterar a lógica de manipulação e download do PDF no arquivo `js/app.js`.

## Decisions

### 1. Simplificação do Header
- **Decisão:** Remover o elemento `.search-box` e seu container `.header-actions` do cabeçalho em `pages/dashboard.html`.
- **Justificativa:** O Dashboard é um painel de visão geral e métricas; o cabeçalho fica mais limpo e legível contendo apenas a saudação personalizada e a mensagem motivacional.

### 2. Posicionamento do Botão no Menu Lateral Direito
- **Decisão:** Inserir o `<button type="button" class="btn-report-download" id="btn-download-report">` como filho direto de `<aside class="right-panel">`, posicionado imediatamente após o encerramento de `<div class="profile-card">` e antes da abertura de `<div class="tasks-panel">`.
- **Justificativa:** Atende exatamente à hierarquia solicitada pelo usuário, agrupando a ação do estudante logo abaixo de sua identidade visual de perfil e antes das tarefas a executar.

### 3. Ajustes de Estilo e Harmonia Visual
- **Decisão:** Adicionar regra específica `.right-panel .btn-report-download` no `css/styles.css`:
  - `width: 100%`: garante largura uniforme preenchendo o container lateral.
  - `justify-content: center`: centraliza o ícone e o rótulo de texto.
  - `padding: 12px 20px`: proporciona área de clique confortável e proporcional aos cards circundantes.
  - Ajuste de espaçamento uniforme através do `gap` flexível de `.right-panel`.

## Risks / Trade-offs

- **[Responsividade em telas intermediárias / mobile]** → Em viewports menores (`max-width: 1200px` e `max-width: 768px`), o painel lateral pode reorganizar sua disposição.
  *Mitigação:* Como o botão utiliza `width: 100%` e adapta-se ao container pai, ele se ajusta perfeitamente tanto na barra lateral de 330px quanto no layout empilhado mobile.

