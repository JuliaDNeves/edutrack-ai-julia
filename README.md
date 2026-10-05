<div align="center">

# 🎓 EduTrack AI

**Gestão acadêmica inteligente: disciplinas, tarefas e progresso dos estudos em um só lugar.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Tipo](https://img.shields.io/badge/projeto-acad%C3%AAmico-blue)
![Backend](https://img.shields.io/badge/backend-Xano-6C47FF)
![Frontend](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JS-E34F26)
![Scripts](https://img.shields.io/badge/scripts-Python%203-3776AB)
![Metodologia](https://img.shields.io/badge/metodologia-OpenSpec-2ea44f)

*Projeto da disciplina **Innovation Lab** — Faculdade Impacta · 2026*

</div>


## ✦ Sobre o projeto

**EduTrack AI** é uma aplicação web desenvolvida para auxiliar estudantes na **organização, acompanhamento e planejamento da rotina acadêmica**.

A proposta é reunir em um único ambiente informações que normalmente ficam espalhadas entre anotações, planilhas e diferentes ferramentas, proporcionando uma visão mais clara das disciplinas, atividades e progresso acadêmico.

Mais do que um sistema de gerenciamento, o projeto busca explorar como **tecnologia, dados e inteligência podem contribuir para uma experiência acadêmica mais organizada e eficiente.**

---

## ◇ A ideia

A rotina universitária envolve diferentes tipos de informação:

```text
                 ┌─────────────────────┐
                 │      EDU TRACK       │
                 └──────────┬──────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    Disciplinas          Tarefas             Progresso
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                   ┌────────▼────────┐
                   │ Visão acadêmica │
                   │    integrada    │
                   └─────────────────┘
```

O EduTrack busca transformar essas informações em uma experiência centralizada, permitindo que o estudante acompanhe sua rotina de maneira mais organizada e visual.

---

## ✦ Funcionalidades

### 🔐 Autenticação

Sistema de acesso integrado ao backend, permitindo:

* Cadastro de usuários
* Login
* Logout
* Recuperação de senha
* Redefinição de senha
* Controle de sessão
* Consulta de informações do usuário autenticado

---

### 📚 Disciplinas

Gerenciamento das disciplinas cadastradas pelo estudante.

**É possível:**

* Criar disciplinas
* Editar informações
* Excluir registros
* Pesquisar por disciplina ou professor
* Registrar professor e carga horária
* Adicionar descrições e observações
* Visualizar quantidade de disciplinas
* Acompanhar carga horária total

---

### 📊 Dashboard

Uma visão geral da rotina acadêmica.

O dashboard apresenta informações como:

* Progresso geral
* Tarefas concluídas
* Tarefas pendentes
* Próximas atividades
* Estimativa de tempo de estudo
* Informações relacionadas às disciplinas

A proposta é transformar dados acadêmicos em **informações fáceis de interpretar rapidamente**.

---

## ◇ Experiência

O projeto foi pensado para que o usuário consiga passar por diferentes etapas da rotina acadêmica sem precisar alternar entre múltiplas ferramentas.

```text
     LOGIN
       │
       ▼
   DASHBOARD
       │
   ┌───┴───────────────┐
   ▼                   ▼
DISCIPLINAS          TAREFAS
   │                   │
   └─────────┬─────────┘
             ▼
       ACOMPANHAMENTO
             │
             ▼
        PROGRESSO
```

---

## ✦ Tecnologias

### Frontend

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

Responsáveis pela estrutura, apresentação visual, interações e lógica da aplicação.

### Backend & Dados

<p>
  <img src="https://img.shields.io/badge/Xano-111827?style=for-the-badge" />
  <img src="https://img.shields.io/badge/REST%20API-0EA5E9?style=for-the-badge" />
</p>

O **Xano** é utilizado como backend da aplicação, fornecendo:

* APIs REST
* Autenticação
* Persistência de dados
* Endpoints protegidos
* Gerenciamento das informações da aplicação

### Ferramentas

<p>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" />
</p>

Também foram utilizados **OpenSpec** e ferramentas de apoio ao desenvolvimento baseado em especificações.

---

## ✦ Arquitetura

O EduTrack utiliza uma arquitetura separando a camada de apresentação dos serviços responsáveis pelo processamento e armazenamento dos dados.

```mermaid
flowchart LR
    U[Usuário] --> F[Frontend]

    F --> H[HTML / CSS]
    F --> J[JavaScript]

    J -->|HTTP / JSON| A[REST API]

    A --> X[Xano]

    X --> AU[Autenticação]
    X --> DB[(Dados)]
```

### Fluxo de autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant X as Xano

    U->>F: Informa credenciais
    F->>X: Requisição de login
    X-->>F: Token de autenticação
    F->>F: Armazena sessão
    F->>X: Requisição autenticada
    X-->>F: Dados do usuário
    F-->>U: Interface personalizada
```

---

## ✦ Estrutura do projeto

```text
edutrack-ai-julia/
│
├── .github/          # Configurações do GitHub
├── .xano/            # Configurações relacionadas ao Xano
│
├── apis/             # APIs e endpoints
├── addons/           # Recursos auxiliares
├── agents/           # Agentes e configurações
├── css/              # Estilos da aplicação
├── docs/             # Documentação
├── functions/        # Funções do backend
├── js/               # Scripts JavaScript
├── openspec/         # Especificações do projeto
├── pages/             # Páginas da aplicação
├── scripts/          # Scripts auxiliares
├── tables/           # Estruturas de dados
├── tools/            # Ferramentas auxiliares
│
├── index.html        # Página inicial
├── dashboard.html    # Dashboard principal
│
├── AGENTS.md         # Diretrizes de desenvolvimento
├── CLAUDE.md         # Configurações para agentes
└── README.md         # Documentação
```

---

## ✦ Desenvolvimento orientado por especificações

Uma das características do projeto é a utilização de uma abordagem **Spec-Driven Development**, apoiada pelo **OpenSpec**.

Em vez de iniciar diretamente pela implementação, as funcionalidades são organizadas a partir de especificações que ajudam a definir:

```text
Requisito
   ↓
Especificação
   ↓
Planejamento
   ↓
Implementação
   ↓
Validação
```

Essa abordagem contribui para um desenvolvimento mais organizado e facilita o acompanhamento das mudanças realizadas no projeto.

---

## ✦ Segurança

A aplicação utiliza autenticação baseada em tokens fornecida pelo Xano.

Entre os mecanismos utilizados estão:

* Autenticação de usuários
* Rotas protegidas
* Token Bearer nas requisições
* Controle de sessão
* Validação de respostas da API
* Logout e remoção da sessão local

> **Nota:** o armazenamento do token no `localStorage` é adequado para o contexto acadêmico atual, mas uma aplicação destinada à produção exigiria uma análise de segurança mais aprofundada, incluindo estratégias de proteção contra XSS e gerenciamento seguro de sessão.

---

## ✦ Aprendizados

O desenvolvimento do EduTrack proporcionou a aplicação prática de conhecimentos em diferentes áreas do desenvolvimento de software.

### Desenvolvimento

* HTML
* CSS
* JavaScript
* Manipulação do DOM
* Consumo de APIs REST
* Requisições HTTP
* JSON

### Backend

* Xano
* Autenticação
* APIs
* Estruturação de dados
* Integração frontend/backend

### Engenharia de software

* Git e GitHub
* Organização de código
* Especificação de requisitos
* Versionamento
* Documentação
* Desenvolvimento orientado por especificações

Além da parte técnica, o projeto também envolve **análise de requisitos, planejamento, trabalho acadêmico e tomada de decisões durante o desenvolvimento**.

---

## ✦ Roadmap

O projeto continua aberto para evolução.

### Próximas possibilidades

* [ ] Aprimorar o gerenciamento de tarefas
* [ ] Tornar os indicadores acadêmicos totalmente dinâmicos
* [ ] Expandir os relatórios de desempenho
* [ ] Melhorar a experiência mobile
* [ ] Evoluir os recursos de planejamento acadêmico
* [ ] Explorar aplicações de inteligência artificial
* [ ] Melhorar a personalização da experiência do estudante

---

## ✦ Contexto acadêmico

**EduTrack AI** foi desenvolvido como parte da disciplina **Innovation Lab**, na **Faculdade Impacta**, durante o ano de **2026**.

O projeto representa uma oportunidade de aplicar conhecimentos de desenvolvimento web, integração de APIs, organização de dados e engenharia de software em uma solução voltada para um problema real do cotidiano acadêmico.

---

## ✧ Desenvolvedora

### Julia Neves

Estudante de **Ciência da Computação**, com interesse em desenvolvimento de software, tecnologia e inovação.

<p>
  <a href="https://github.com/JuliaDNeves">
    <img src="https://img.shields.io/badge/GitHub-JuliaDNeves-181717?style=flat-square&logo=github" />
  </a>
  <a href="https://www.linkedin.com/in/juliadneves/">
    <img src="https://img.shields.io/badge/LinkedIn-Julia%20Neves-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
  </a>
</p>

---

<p align="center">

**EduTrack AI**

*Organize. Acompanhe. Evolua.*

</p>
