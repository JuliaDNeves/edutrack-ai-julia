# Tasks

## 1. Criação da Página de Configurações (`pages/settings.html`)

- [x] 1.1 Criar o arquivo `pages/settings.html` contendo a seção **Perfil** (exibindo nome, e-mail e foto/avatar inicial do usuário autenticado via `EduTrackAuth.getMe()`) e a seção **Aparência** (com opções de seleção para tema Claro e Escuro com destaque visual da opção ativa).
- [x] 1.2 Adicionar os estilos da página de Configurações e cards de Perfil e Aparência em `css/styles.css`, compatíveis com a identidade visual dos temas claro e escuro.

## 2. Atualização da Navegação Lateral e Remoção de Duplicatas

- [x] 2.1 Adicionar o item `Configurações` com ícone do Font Awesome (`fa-gear`) no menu lateral de navegação (`.nav-menu`) das páginas do sistema (`dashboard.html`, `pages/subjects.html`, `pages/tasks.html` e `pages/settings.html`).
- [x] 2.2 Remover os botões de alternância de tema do menu lateral (`.sidebar-footer`) e dos cabeçalhos das demais páginas, consolidando o controle de temas exclusivamente na tela de Configurações.

## 3. Sincronização e Persistência de Tema

- [x] 3.1 Assegurar a sincronização e persistência do tema via `localStorage` com fallback para Modo Claro na página inicial, telas de autenticação, Dashboard, Disciplinas, Tarefas e Configurações.
