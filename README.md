# 🎓 EduTrack AI

**Gestão acadêmica inteligente: disciplinas, tarefas, relatórios analíticos e recomendações com IA em um só lugar.**

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![Tipo](https://img.shields.io/badge/projeto-acad%C3%AAmico-blue)
![Backend](https://img.shields.io/badge/backend-Xano-6C47FF)
![Frontend](https://img.shields.io/badge/frontend-HTML5%20%7C%20CSS3%20%7C%20JS-E34F26)
![Scripts](https://img.shields.io/badge/servi%C3%A7os-Python%203-3776AB)
![Metodologia](https://img.shields.io/badge/metodologia-OpenSpec-2ea44f)

*Projeto desenvolvido na disciplina **Innovation Lab** — Faculdade Impacta · 2026*

---

## ✦ 1. Apresentação

O **EduTrack AI** é uma aplicação web completa projetada para transformar a rotina universitária de estudantes, unificando em um ambiente intuitivo e moderno o controle de disciplinas, planejamento de atividades acadêmicas, monitoramento de horas de estudo e diagnósticos inteligentes de desempenho.

Em vez de manter anotações dispersas em múltiplos cadernos, agendas ou planilhas desconectadas, o estudante conta com uma plataforma integrada que processa dados reais de estudo e fornece:
- Visão executiva imediata do progresso acadêmico no **Dashboard**;
- Gerenciamento detalhado de **Disciplinas** e **Tarefas** com controle de prazos e estimativas;
- Exportação formal de **Relatórios Acadêmicos em PDF** gerados sob demanda;
- Análise diagnóstica e recomendações personalizadas através da página de **Insights Inteligentes com IA**.

---

## ✦ 2. Principais Funcionalidades

- **🔐 Autenticação e Gestão de Sessão:** Cadastro de novos estudantes, login com token seguro (JWT), logout com expiração de credenciais e fluxo completo de recuperação e redefinição de senha via e-mail.
- **📊 Dashboard com Indicadores em Tempo Real:** Resumo visual de progresso, contadores dinâmicos de tarefas, gráfico comparativo de tempo estimado versus tempo gasto por disciplina e painel de tarefas prioritárias.
- **📚 Gerenciamento Completo de Disciplinas:** Criação, edição, exclusão, busca textual e filtros refinados por professor, carga horária e datas.
- **✅ Gerenciamento de Atividades e Tarefas:** Controle de status (pendente/concluída), prioridades (baixa, média, alta), prazos de entrega, tempo estimado e registro de tempo real de estudo.
- **📄 Relatórios Acadêmicos Oficiais em PDF:** Geração e download de relatórios completos com formatação profissional via ReportLab.
- **🧠 Insights Inteligentes com IA:** Diagnósticos pedagógicos sob demanda com Google Gemini e motor heurístico de contingência (fallback offline).
- **🌗 Sistema de Temas (Claro e Escuro):** Alternância completa de temas na página de configurações com persistência local e prevenção de *Flash of Unstyled Content* (FOUC).
- **📱 Interface Totalmente Responsiva:** Layout adaptável para desktops e dispositivos móveis com barra de navegação inferior dedicada.

---

## ✦ 3. Dashboard Acadêmico

O **Dashboard** (`pages/dashboard.html`) atua como a central de controle do estudante, apresentando indicadores acadêmicos imediatos sem sobrecarga de informações:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                      DASHBOARD EDUTRACK AI                              │
├───────────────────────────────────┬─────────────────────────────────────┤
│ 👤 Saudação Personalizada         │ 🗂️ Painel Lateral do Usuário        │
│    "Olá, [Nome]!" + Dica do dia   │    • Avatar e Identificação         │
├───────────────────────────────────┤    • Botão Relatório PDF            │
│ 🏆 Progresso Geral de Tarefas     │    • Próximas Tarefas com           │
│    • Total concluído vs planejado │      Checkboxes Reativos            │
│    • Barra linear de progresso    │      (Atualização em tempo real     │
│    • Widget circular radial SVG   │       sem recarregar a página)      │
├───────────────────────────────────┴─────────────────────────────────────┤
│ 📈 Métricas em Tempo Real                                               │
│    • Disciplinas Ativas  |  • Tarefas Pendentes  |  • Tempo de Estudo   │
├─────────────────────────────────────────────────────────────────────────┤
│ 📊 Gráfico Comparativo: Tempo de Estudo por Disciplina                  │
│    • Horas Estimadas (Lilás) vs Tempo de Estudo Real (Ciano)            │
│    • Tooltip interativo ao passar o mouse com detalhes exatos           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Elementos em Destaque:
1. **Progresso Geral de Tarefas:** Exibe a porcentagem global de conclusão com atualização instantânea ao alternar o status de qualquer tarefa.
2. **Cards de Métricas:**
   - **Disciplinas:** Total de matérias ativas cadastradas pelo aluno.
   - **Tarefas Pendentes:** Contagem de itens que ainda demandam atenção.
   - **Tempo de Estudo:** Soma acumulada de minutos gastos em tarefas concluídas, formatada em horas e minutos (`Xh Ymin`).
3. **Gráfico Comparativo de Estudo:** Gráfico de barras verticais contrastando o planejado com o executado em cada disciplina cadastrada.
4. **Próximas Tarefas Interativas:** Lista as tarefas mais urgentes ordenadas por prazo. Concluir uma tarefa diretamente pelo checkbox do painel recalcula instantaneamente todos os indicadores do Dashboard.

---

## ✦ 4. Gestão de Disciplinas

A página de **Disciplinas** (`pages/subjects.html`) oferece controle detalhado sobre a grade curricular do semestre:

- **Operações Disponíveis (CRUD):**
  - Cadastro de novas disciplinas com modais interativos;
  - Edição de registros existentes;
  - Exclusão com confirmação visual de segurança;
  - Listagem em cards com identificação visual por cores.
- **Campos Controlados:**
  - Nome da matéria;
  - Nome do professor responsável;
  - Carga horária total (em horas);
  - Data de início e data de encerramento do período letivo;
  - Observações e descrições acadêmicas adicionais.
- **Barra de Resumo e Filtros Avançados:**
  - Contadores no topo com o total de disciplinas cadastradas e soma da carga horária;
  - Busca textual em tempo real por nome da disciplina ou professor;
  - Filtros combinados por intervalo de datas, professor específico e carga horária mínima.

---

## ✦ 5. Gestão de Tarefas

A página de **Tarefas** (`pages/tasks.html`) permite organizar entregas, trabalhos e revisões:

- **Controle de Atividades:**
  - Associação obrigatória a uma disciplina ativa do estudante;
  - Definição de prazo de entrega (`due_date`);
  - Grau de prioridade visual: **Baixa**, **Média** ou **Alta**;
  - Estimativa de dedicação (`estimated_time` em minutos).
- **Fluxo de Conclusão com Tempo Real:**
  - Ao marcar uma tarefa como concluída, um modal dedicado permite registrar o tempo real gasto (`spent_time`);
  - Esse dado alimenta diretamente os indicadores do Dashboard, os cálculos do motor de relatórios e a análise preditiva da IA.
- **Filtros e Visualização:**
  - Busca textual por título e descrição;
  - Filtros rápidos por status (**Todas**, **Pendentes** e **Concluídas**);
  - Filtragem por disciplina associada e por prioridade;
  - Indicadores no topo com total de atividades, contagem de pendências e tempo total estimado de estudo.

---

## ✦ 6. Geração de Relatórios Acadêmicos em PDF

O EduTrack conta com uma funcionalidade nativa de emissão de relatórios acadêmicos oficiais em PDF, projetada para fornecer uma síntese formal da rotina do estudante para arquivamento ou prestação de contas acadêmicas.

### Como Funciona a Geração:
1. **Acionamento:** O estudante clica no botão **Relatório PDF** presente no painel lateral do Dashboard.
2. **Coleta e Consolidação:** O frontend reúne os dados mais recentes do estudante, disciplinas ativas e tarefas cadastradas.
3. **Processamento Server-Side:** A requisição é enviada ao servidor de relatórios Python (`scripts/report_server.py`), que utiliza a biblioteca **ReportLab** para desenhar o documento com a identidade visual do EduTrack.
4. **Entrega e Download:** O arquivo é retornado com cabeçalho `Content-Type: application/pdf`, disparando o download automático no navegador com o padrão de nome `edutrack-relatorio-YYYYMMDD.pdf`.

### Estrutura do Documento Gerado:
- **Cabeçalho Institucional:** Identificação do estudante, e-mail cadastrado, data e hora de emissão.
- **Quadro de Indicadores Gerais:** Métricas de conclusão geral, total de tarefas, disciplinas ativas e total de horas dedicadas.
- **Tabela Detalhada por Disciplina:** Grade contendo nome da disciplina, carga horária, status de tarefas (concluídas vs. pendentes), taxa percentual de avanço e comparação entre tempo estimado e tempo gasto.
- **Relação de Tarefas Pendentes e Prioritárias:** Listagem das próximas entregas com data de vencimento e prioridade.
- **Design Profissional:** Layout construído em conformidade com as cores oficiais do sistema (paleta ciano `#53dce3` e lilás `#b19bf1`).

---

## ✦ 7. Insights Inteligentes com IA

Localizada na página dedicada **Insights** (`pages/insights.html`), essa área funciona como um mentor acadêmico digital, examinando a rotina do estudante para apontar desvios de planejamento e fornecer direcionamentos estratégicos.

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                    PÁGINA DE INSIGHTS INTELIGENTES                      │
├─────────────────────────────────────────────────────────────────────────┤
│ [🧠] Diagnósticos & Recomendações          [Gerado com IA / Fallback]   │
│      Análise contextualizada e personalizada        [Gerar insights]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ 📋 Resumo Geral                                                   │  │
│  │ Síntese qualitativa do momento do estudante, ritmo e aderência.   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ 📈 Diagnósticos por Disciplina                                    │  │
│  │ Análise de cada matéria com tags visuais de variação de tempo:    │  │
│  │ [Dentro do Esperado] [Tempo Subestimado] [Tempo Superestimado]     │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────┐ ┌───────────────────────────────┐  │
│  │ 💡 Recomendações Práticas       │ │ ⭐ Pontos Fortes              │  │
│  │ • Reestimar prazos em matéria X │ │ • Excelente pontualidade      │  │
│  │ • Priorizar entregas com atraso │ │ • Ritmo de estudo consistente │  │
│  └─────────────────────────────────┘ └───────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Diferenciais da Implementação:
- **Acionamento Estritamente sob Demanda:** A análise é disparada apenas quando o usuário clica em **"Gerar insights"**, evitando consumo desnecessário de cotas de IA e chamadas automáticas indesejadas.
- **Isolamento e Segurança de Dados:** Todos os cálculos matemáticos (diferenças percentuais, somas de tempo e taxas de conclusão) são executados no backend antes do envio, enviando à IA apenas indicadores consolidados e sem expor credenciais no cliente.
- **Motor Híbrido com Contingência Determinística (Fallback):**
  - **Modo IA:** Conexão direta com o modelo **Google Gemini** para interpretação qualitativa e recomendações pedagógicas humanizadas.
  - **Modo Contingência (Offline):** Caso a chave da API do Gemini não esteja configurada ou o serviço externo fique indisponível, o sistema aciona automaticamente um algoritmo de regras heurísticas, garantindo diagnósticos consistentes sem erros na tela.
- **Badge de Identificação de Origem:** Um selo visual no cabeçalho informa de maneira transparente ao aluno se a resposta foi gerada via inteligência artificial (`Gerado com IA`) ou por regras heurísticas locais (`Regras Heurísticas / Modo Offline`).
- **Cards Estruturados:**
  1. **Resumo Geral:** Panorama narrativo sobre a consistência dos estudos.
  2. **Diagnósticos por Disciplina:** Detalhamento matéria por matéria, classificando se o estudante gastou mais tempo do que o planejado (subestimado), menos (superestimado) ou se manteve o tempo previsto.
  3. **Recomendações Práticas:** Ações pontuais para corrigir gargalos e reequilibrar o cronograma.
  4. **Pontos Fortes:** Feedback positivo para incentivar hábitos que estão funcionando bem.

---

## ✦ 8. Tecnologias Utilizadas

| Camada | Tecnologia | Função no Projeto |
| :--- | :--- | :--- |
| **Frontend** | `HTML5` | Estrutura semântica das páginas e formulários acessíveis. |
| **Frontend** | `CSS3 Moderno` | Design system com CSS Variables, Flexbox, CSS Grid, Glassmorphism e Dark/Light Themes. |
| **Frontend** | `JavaScript (ES6+)` | Manipulação reativa do DOM, comunicação assíncrona (`fetch`), gestão de tokens e gráficos dinâmicos. |
| **Ícones & Tipografia** | `Font Awesome 6` & `Inter / Plus Jakarta` | Iconografia consistente e tipografia moderna. |
| **Backend Principal** | `Xano` | Plataforma No-Code/Low-Code de backend, fornecendo banco de dados relacional, APIs REST e autenticação. |
| **Autenticação** | `JWT (JSON Web Token)` | Segurança de sessão com autenticação Bearer Token armazenada de forma controlada. |
| **Geração de PDF** | `Python 3` + `ReportLab` | Compilação e desenho vetorial do relatório acadêmico para exportação. |
| **Inteligência Artificial** | `Google Gemini API` | Modelo generativo para interpretação dos indicadores acadêmicos e elaboração de planos de ação. |
| **Serviços Locais** | `Python http.server` | Daemons leves para disponibilização local dos endpoints de PDF (5001) e Insights (5002). |
| **Engenharia de Software** | `OpenSpec` | Metodologia Spec-Driven Development para especificação, governança e validação de requisitos. |

---

## ✦ 9. Estrutura do Projeto

A organização de diretórios reflete a separação clara entre camadas do frontend, serviços auxiliares e especificações:

```text
edutrack-ai-julia/
│
├── css/
│   └── styles.css              # Estilos globais, tokens de cores, temas e responsividade
│
├── js/
│   ├── auth.js                 # Módulo de autenticação, gestão de tokens e helpers de API
│   └── app.js                  # Lógica de interface, tema, gráficos, relatórios e insights
│
├── pages/
│   ├── auth/
│   │   ├── login.html          # Tela de login
│   │   ├── register.html       # Tela de cadastro de novos estudantes
│   │   ├── forgot-password.html# Solicitação de recuperação de senha
│   │   └── reset-password.html # Redefinição de senha via token
│   │
│   ├── dashboard.html          # Dashboard principal de métricas e acompanhamento
│   ├── subjects.html           # Gestão completa de disciplinas acadêmicas
│   ├── tasks.html              # Gestão e acompanhamento de tarefas e prazos
│   ├── insights.html           # Página dedicada de Insights Inteligentes com IA
│   └── settings.html           # Configurações de conta e alternância de temas
│
├── scripts/
│   ├── report_server.py        # Servidor daemon local para download de relatórios PDF (porta 5001)
│   ├── generate_academic_report.py # Motor ReportLab de desenho e formatação do PDF
│   ├── insights_server.py      # Servidor daemon local para motor de insights (porta 5002)
│   ├── academic_insights_engine.py # Motor de cálculo de métricas e integração com Gemini
│   ├── calculate_progress.py   # Utilitário CLI para cálculo determinístico de progresso
│   └── evaluate_overdue_tasks.py # Utilitário CLI para avaliação de tarefas em atraso
│
├── tables/                     # Definições de schema XanoScript (.xs) do banco de dados
├── apis/                       # Especificações dos endpoints REST do Xano (.xs)
├── functions/                  # Funções de backend do Xano (.xs)
│
├── openspec/                   # Especificações de requisitos e histórico de mudanças (OpenSpec)
│   ├── specs/                  # Especificações permanentes das capacidades ativas
│   └── changes/                # Propostas, planos de trabalho e histórico arquivado
│
├── index.html                  # Landing page de apresentação e entrada da aplicação
├── dashboard.html              # Redirecionamento amigável para pages/dashboard.html
├── AGENTS.md                   # Regras de desenvolvimento e governança para agentes de IA
└── README.md                   # Documentação completa do projeto
```

---

## ✦ 10. Instalação e Execução

Para executar o EduTrack AI em ambiente local com todas as funcionalidades ativas, siga o passo a passo abaixo:

### Pré-requisitos
- Navegador web moderno (Google Chrome, Edge, Firefox, Safari ou Brave);
- Python 3.9 ou superior instalado;
- Gerenciador de pacotes `pip`.

### Passo 1: Obter o Projeto
```bash
git clone https://github.com/JuliaDNeves/edutrack-ai-julia.git
cd edutrack-ai-julia
```

### Passo 2: Instalar Dependências dos Serviços Python
A única biblioteca externa necessária é o **ReportLab** para geração de relatórios (a integração com a API do Gemini utiliza a biblioteca nativa `urllib`):
```bash
pip install reportlab
```

### Passo 3 (Opcional): Configurar a Chave da API do Google Gemini
Para ativar o modo com IA real nos Insights (caso não configurada, o sistema operará normalmente através do motor heurístico de contingência):
```bash
# No Windows (PowerShell):
$env:GEMINI_API_KEY="sua_chave_gemini_aqui"

# No Linux / macOS (Bash):
export GEMINI_API_KEY="sua_chave_gemini_aqui"
```

### Passo 4: Iniciar os Servidores em Segundo Plano

Abra terminais dedicados para executar os serviços locais:

1. **Servidor de Relatórios Acadêmicos (PDF):**
   ```bash
   python scripts/report_server.py
   # Disponível em: http://127.0.0.1:5001/api/academic_reports/pdf
   ```

2. **Servidor de Insights Inteligentes (IA):**
   ```bash
   python scripts/insights_server.py
   # Disponível em: http://127.0.0.1:5002/api/insights
   ```

### Passo 5: Executar o Frontend Estático
Como a aplicação é composta por arquivos estáticos que se comunicam via APIs com o Xano e com os servidores Python locais, você pode servi-la com qualquer servidor HTTP estático:

```bash
# Utilizando o servidor embutido do Python:
python -m http.server 8000
```

Abra seu navegador em [http://localhost:8000](http://localhost:8000) para acessar a tela inicial do EduTrack.

---

## ✦ 11. Integrações & Backend (Xano)

O EduTrack utiliza o **Xano** como backend oficial, garantindo persistência em banco relacional seguro e APIs RESTful documentadas:

### Grupos de APIs Conectados:
- **Autenticação (`/api:kAYAUbt7`):**
  - `POST /auth/signup`: Registro de estudantes;
  - `POST /auth/login`: Autenticação e emissão de token JWT;
  - `GET /auth/me`: Retorna dados do usuário autenticado a partir do token;
  - `POST /auth/request_password_reset`: Solicita token de recuperação;
  - `POST /auth/reset_password`: Redefine a senha do estudante com base no token.
- **Disciplinas (`/api:asoARar9`):**
  - `GET /subjects`: Lista as matérias do estudante autenticado;
  - `POST /subjects`: Cria nova disciplina com vínculo automático ao `user_id`;
  - `PATCH /subjects/{id}`: Atualiza os dados de uma disciplina;
  - `DELETE /subjects/{id}`: Remove uma disciplina.
- **Tarefas Acadêmicas (`/api:8PdLH3Ls`):**
  - `GET /academic_tasks`: Recupera as atividades do usuário autenticado;
  - `POST /academic_tasks`: Cria nova atividade com estimativa de tempo;
  - `PATCH /academic_tasks/{id}`: Altera status, prioridade ou tempo gasto;
  - `DELETE /academic_tasks/{id}`: Exclui uma tarefa.
- **Relatórios Acadêmicos (`/api:academic_reports`):**
  - Endpoints para consolidação de dados e integração de relatórios.
- **Insights Acadêmicos (`/api:insights`):**
  - Endpoint de processamento acadêmico e contingência.

### Princípios de Segurança e Isolamento:
- **Isolamento de Dados (Multitenancy):** Todas as queries e operações no Xano filtram rigorosamente por `user_id == $auth.id`, assegurando que nenhum estudante acesse dados de terceiros.
- **Autenticação Bearer Token:** O cabeçalho `Authorization: Bearer <token>` é anexado automaticamente a todas as requisições protegidas pelo módulo `EduTrackAuth`.

---

## ✦ 12. Metodologia & Governança (OpenSpec)

O projeto adota rigorosamente a metodologia **Spec-Driven Development (SDD)** através do framework **OpenSpec**.

### Como Funciona o Ciclo de Desenvolvimento:
1. **Especificação Prévia:** Nenhuma funcionalidade é codificada sem antes definir uma proposta clara (`proposal.md`), contratos de requisitos em formato de especificação com cenários testáveis (`spec.md`), decisões de arquitetura (`design.md`) e lista de tarefas atômicas (`tasks.md`).
2. **Contratos de Comportamento:** Requisitos normativos utilizam palavras-chave como `SHALL` e cenários no formato estruturado `WHEN` / `THEN`.
3. **Repositório de Especificações:**
   - As capacidades permanentes e consolidadas residem no diretório [openspec/specs/](openspec/specs/);
   - O histórico de mudanças planejadas e arquivadas é mantido em [openspec/changes/archive/](openspec/changes/archive/), permitindo rastreabilidade completa de cada recurso adicionado à aplicação.

---

## ✦ Contexto Acadêmico & Desenvolvedora

O **EduTrack AI** foi desenvolvido como projeto prático na disciplina **Innovation Lab**, no curso de **Ciência da Computação** da **Faculdade Impacta** (2026).

### Julia Neves
*Estudante de Ciência da Computação apaixonada por desenvolvimento de software, engenharia de dados e soluções aplicadas com inteligência artificial.*

[![GitHub](https://img.shields.io/badge/GitHub-JuliaDNeves-181717?style=flat-square&logo=github)](https://github.com/JuliaDNeves)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Julia%20Neves-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juliadneves/)

---

<p align="center">
  <strong>EduTrack AI</strong> · <em>Organize. Acompanhe. Evolua.</em>
</p>
