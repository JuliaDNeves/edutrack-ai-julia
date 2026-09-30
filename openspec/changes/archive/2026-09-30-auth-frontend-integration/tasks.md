# Tasks

## 1. Módulo Central de Autenticação (Token & Session Manager)

- [x] 1.1 Criar o script reutilizável `js/auth.js` com funções de gerenciamento de token no `localStorage` (`getToken`, `setToken`, `removeToken`, `isAuthenticated`), anexando o token no formato `Authorization: Bearer <authToken>`
- [x] 1.2 Implementar no `js/auth.js` os métodos de consumo de API `login`, `signup` e `getMe` apontando para a URL base da API Xano

## 2. Conexão da Tela de Login

- [x] 2.1 Conectar o formulário em `pages/auth/login.html` para enviar e-mail e senha ao endpoint Xano `auth/login`
- [x] 2.2 Salvar o `authToken` recebido no `localStorage`, redirecionar para `pages/dashboard.html` em caso de sucesso e exibir mensagem de erro na interface em caso de falha

## 3. Conexão da Tela de Cadastro

- [x] 3.1 Conectar o formulário em `pages/auth/register.html` para enviar os dados ao endpoint Xano `auth/signup`, com validação de coincidência de senha no frontend
- [x] 3.2 Salvar o `authToken` retornado no `localStorage`, redirecionar para `pages/dashboard.html` em caso de sucesso e exibir mensagens de erro da API em caso de falha

## 4. Guarda de Autenticação, Perfil no Dashboard e Logout

- [x] 4.1 Implementar a verificação de rota protegida em `pages/dashboard.html` via `auth/me`, redirecionando usuários não autenticados ou com token inválido para `pages/auth/login.html`
- [x] 4.2 Atualizar dinamicamente a interface do Dashboard (saudação do cabeçalho e perfil da barra lateral) com o nome e iniciais do usuário obtidos do `auth/me`
- [x] 4.3 Implementar a ação de Logout para remover o token do `localStorage` e redirecionar o usuário para a página de login
