# Design

## Context

O EduTrack AI possui páginas estáticas HTML/CSS em `pages/auth/login.html`, `pages/auth/register.html` e `pages/dashboard.html`, e APIs Xano REST definidas em `apis/authentication/`. Atualmente as páginas fazem navegação estática sem autenticação real. Veja `proposal.md` para a motivação e escopo.

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
- **Escolha**: Criar um arquivo JavaScript centralizado `js/auth.js` com funções puras/objeto `EduTrackAuth` para gerenciar a URL base da API Xano, `localStorage`, cabeçalhos HTTP e métodos (`login`, `signup`, `getMe`, `logout`, `requireAuth`).
- **Razão**: Evita duplicação de lógica entre páginas e centraliza o tratamento do cabeçalho `Authorization: Bearer <authToken>`.
- **Alternativas consideradas**: Inserir chamadas `fetch` avulsas em cada página HTML ou carregar uma biblioteca externa (como Axios). Optamos por Vanilla `fetch` nativo para manter a aplicação leve e sem dependências extras.

### Decisão 2: Armazenamento do Token
- **Escolha**: Armazenar o token em `localStorage` sob a chave `edutrack_token`.
- **Razão**: Garante persistência da sessão entre diferentes páginas estáticas HTML e recarregamentos de aba.
- **Segurança**: O token não é renderizado no HTML nem exposto visualmente na interface.

### Decisão 3: Verificação de Guarda de Navegação no Dashboard
- **Escolha**: Ao carregar `pages/dashboard.html`, executar imediatamente a verificação de token. Se o token não existir, redirecionar para `login.html`. Se existir, realizar a chamada `GET auth/me`. Se o `auth/me` retornar erro (401/403/inválido), limpar o token e redirecionar para `login.html`.
- **Razão**: Garante que usuários sem token ou com token expirado não acessem o painel.

### Decisão 4: Tratamento dos Campos da Tela de Cadastro
- **Análise de Compatibilidade**: A API `auth/signup` do Xano aceita `name?` (opcional), `email` e `password`. O formulário `register.html` possui os campos E-mail, Senha e Confirmar Senha.
- **Ação**: O formulário fará a validação local de que Senha === Confirmar Senha. O e-mail será enviado como `email` e a senha como `password`. O nome (se o usuário preencher ou se derivado) pode ser enviado ou omitido sem quebrar a API. Se o campo Nome for adicionado/preenchido no formulário de cadastro, o `auth/signup` o registrará no banco.

## Risks / Trade-offs

- **[Risco] Servidor Xano offline ou erro de CORS ao rodar em `file://`** → **Mitigação**: Testar e garantir que as requisições tratem exceções de rede com mensagens amigáveis ("Não foi possível conectar ao servidor").
- **[Risco] Token expirado no localStorage** → **Mitigação**: O `auth/me` interceptará a resposta 401/403 e executará `logout()` automaticamente.

## Plan de Testes e Integração

1. Testar o envio do formulário de Login com credenciais válidas e inválidas.
2. Testar o cadastro com senhas coincidentes e divergentes, e e-mail duplicado.
3. Testar acesso direto ao Dashboard sem token (deve redirecionar para login).
4. Testar clique em Logout no Dashboard (deve apagar o token e redirecionar).
