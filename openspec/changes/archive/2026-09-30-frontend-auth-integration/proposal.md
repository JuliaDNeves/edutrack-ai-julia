# Proposal

## Why

O EduTrack AI possui páginas estáticas de autenticação (Login e Cadastro) e um Dashboard, além de APIs backend funcionais no Xano (`auth/login`, `auth/signup` e `auth/me`). Esta mudança integra as telas do frontend às APIs Xano existentes para permitir autenticação real de usuários, persistência local de sessão e proteção de rotas autenticadas.

## What Changes

- **Integração de Login**: Conexão da tela `pages/auth/login.html` ao endpoint Xano `POST auth/login`, enviando e-mail/senha, recebendo o `authToken` e redirecionando para o Dashboard após o sucesso. Exibição de mensagens de erro amigáveis em caso de falha.
- **Integração de Cadastro**: Conexão da tela `pages/auth/register.html` ao endpoint Xano `POST auth/signup`, realizando validações no frontend (confirmação de senha), armazenando o `authToken` retornado e redirecionando para o Dashboard.
- **Gerenciamento Centralizado de Session & Token**: Módulo JavaScript reutilizável para armazenar e recuperar o `authToken` no `localStorage`, anexar o cabeçalho `Authorization: Bearer <authToken>` nas requisições e gerenciar o estado da sessão.
- **Recuperação de Usuário Autenticado (`auth/me`)**: Consulta ao endpoint `GET auth/me` para validar o token e carregar os dados reais do usuário logado no Dashboard.
- **Guarda de Navegação & Logout**: Proteção de páginas autenticadas (`pages/dashboard.html`), redirecionando usuários não autenticados para a página de login. Funcionalidade de Logout para remover o token e retornar à tela inicial/login.

## Capabilities

### New Capabilities
- `frontend-auth-integration`: Define os requisitos de integração entre as telas do frontend do EduTrack AI e as APIs REST Xano de autenticação (`auth/login`, `auth/signup`, `auth/me`), incluindo gerenciamento de token local e navegação protegida.

### Modified Capabilities

Nenhuma existente foi modificada.

## Impact

- **Frontend JS**: Módulo `js/auth.js` e manipuladores em `js/app.js` para gerenciar chamadas de API, armazenamento de token e verificação de autenticação nas páginas.
- **Telas HTML**: Formulários e exibição de feedback de erro em `pages/auth/login.html`, `pages/auth/register.html` e `pages/dashboard.html`.
- **APIs Xano**: Uso exclusivo das APIs Xano pré-existentes (`auth/login`, `auth/signup`, `auth/me`). Nenhuma API backend será modificada ou recriada.
