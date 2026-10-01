# Design

## Context

O EduTrack AI possui páginas estáticas HTML/CSS em `pages/auth/login.html`, `pages/auth/register.html` e `pages/dashboard.html`, e APIs Xano REST definidas em `apis/authentication/`. Veja `proposal.md` para o motivo e escopo da integração.

## Goals / Non-Goals

**Goals:**
- Centralizar o gerenciamento de tokens HTTP e autenticação em um arquivo de script modular reutilizável (`js/auth.js`).
- Conectar o formulário de Login ao endpoint `POST auth/login`.
- Conectar o formulário de Cadastro ao endpoint `POST auth/signup`.
- Proteger rotas autenticadas (como `pages/dashboard.html`), verificando o token via `GET auth/me`.
- Atualizar a interface do Dashboard dinamicamente com os dados do usuário autenticado retornado pelo `auth/me`.
- Tratar e exibir mensagens de erro amigáveis nas telas de formulário.

**Non-Goals:**
- Recriar ou modificar tabelas ou endpoints no backend Xano.
- Implementar recuperação de senha via Xano nesta etapa.
- Alterar o design visual CSS ou o layout das páginas existentes.

## Decisions

### Decisão 1: Arquivo Central de Autenticação (`js/auth.js`)
- **Escolha**: Utilizar o arquivo `js/auth.js` com o objeto `EduTrackAuth` para gerenciar a URL base da API Xano, `localStorage`, cabeçalhos HTTP e métodos (`login`, `signup`, `getMe`, `logout`).

### Decisão 2: Armazenamento do Token
- **Escolha**: Armazenar o token em `localStorage` sob a chave `edutrack_token`.

### Decisão 3: Verificação de Guarda de Navegação no Dashboard
- **Escolha**: Ao carregar `pages/dashboard.html`, verificar se o token existe. Se não existir ou for inválido na chamada `GET auth/me`, limpar o token local e redirecionar para `pages/auth/login.html`.

## Risks / Trade-offs

- **[Risco] Servidor Xano offline ou erro de rede** → **Mitigação**: Exibir mensagem de erro informativa ao usuário na interface sem interromper a navegação.
