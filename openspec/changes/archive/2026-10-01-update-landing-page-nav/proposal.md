# Proposal

## Why

A página inicial (`index.html`) exibe atualmente botões redundantes de navegação ("Entrar" e "Criar conta") na navbar superior além dos botões presentes na seção Hero, e inclui também um botão "Ver Demo do Dashboard" que aponta para uma funcionalidade descontinuada no estado atual do projeto. Para simplificar a interface e melhorar a experiência do usuário, a navbar superior deve focar no branding da aplicação e os botões da seção Hero devem focar estritamente nas ações principais de acesso ("Acessar minha conta" e "Criar conta gratuita").

## What Changes

- Remover da navbar superior (`<header class="landing-header">`) o bloco de ações contendo os botões:
  - "Entrar" (`.auth-btn-secondary-sm`)
  - "Criar conta" (`.auth-btn-primary-sm`)
- Remover da seção Hero (`.hero-cta-group`) o botão:
  - "Ver Demo do Dashboard" (`.auth-btn-outline.hero-btn`)
- Manter os botões de ação na seção Hero ("Acessar minha conta" e "Criar conta gratuita").
- Preservar o restante do layout, textos, estilos CSS e responsividade de `index.html`.

## Capabilities

### New Capabilities

- `landing-page-nav`: Especificações de layout e botões da navbar e seção Hero da página inicial (`index.html`).

### Modified Capabilities

(None)

## Impact

- `index.html`: Remoção dos botões da navbar e do botão de demo do dashboard.
- Sem alterações em CSS, JS ou APIs de backend.
