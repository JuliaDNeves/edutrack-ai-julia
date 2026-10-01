# Design

## Context

A página inicial `index.html` possui os elementos HTML `<div class="landing-nav-actions">` dentro do `<header class="landing-header">` e a âncora `<a href="pages/dashboard.html" class="auth-btn-outline hero-btn">` dentro do container `<div class="hero-cta-group">`.

## Goals / Non-Goals

**Goals:**
- Simplificar a navegação superior mantendo apenas o branding do EduTrack no topo da página.
- Manter na seção Hero apenas as opções de autenticação ("Acessar minha conta" e "Criar conta gratuita").
- Remover o link descontinuado para o Dashboard Demo.

**Non-Goals:**
- Alterar a folha de estilos `css/styles.css` ou scripts JS.
- Alterar outras seções da landing page ou adicionar novas telas/rotas.

## Decisions

### Decisão 1: Remoção direta de elementos HTML no `index.html`
- **Escolha**: Remover completamente a `div.landing-nav-actions` do header e o elemento `a.auth-btn-outline` do hero.
- **Alternativas consideradas**: Ocultar via CSS (`display: none`). Opção recusada para evitar manter HTML morto ou obsoleto no DOM.

## Risks / Trade-offs

- [Risco] Alteração no layout visual da navbar.
  → **Mitigação**: `.landing-header` utiliza `display: flex` e `justify-content: space-between`. Com a marca no canto esquerdo, o header continua limpo e perfeitamente posicionado.
