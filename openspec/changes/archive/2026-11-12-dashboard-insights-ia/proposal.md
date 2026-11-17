# Proposal

## Why

Atualmente, o Dashboard do EduTrack AI exibe dados descritivos sobre tarefas e disciplinas (progresso geral, contagens e gráficos de horas), mas não apresenta ao estudante os diagnósticos analíticos e recomendações personalizadas gerados pela inteligência acadêmica. Com o motor analítico e a integração com IA já implementados no backend, faz-se necessário disponibilizar uma interface intuitiva, elegante e sob demanda no Dashboard para que o estudante possa visualizar diagnósticos de desempenho, desvios no tempo de estudo e recomendações práticas acionáveis para otimizar sua rotina acadêmica.

## What Changes

- Adicionar uma nova seção "Insights Inteligentes" no `pages/dashboard.html`, posicionada logo após o gráfico de tempo de estudo.
- Implementar o botão "Gerar insights" para acionamento estritamente sob demanda da análise, garantindo que nenhuma requisição à IA seja disparada automaticamente ao carregar o Dashboard.
- Renderizar cards visuais estruturados para exibição dos resultados da análise:
  - **Resumo Geral:** síntese contextualizada do panorama acadêmico.
  - **Diagnósticos por Disciplina:** cards individuais para cada disciplina com indicadores de taxa de conclusão e tags visuais de desvio de tempo (dentro do esperado, subestimado, superestimado ou sem tempo registrado).
  - **Recomendações Práticas:** lista de ações prioritárias orientadas à organização do estudante.
  - **Pontos Fortes:** reconhecimento de conquistas, boa eficiência ou regularidade nas entregas.
- Implementar feedback visual de estado de carregamento (*spinner* com botão desabilitado) e mensagens de erro amigáveis em caso de falha de conexão.
- Incluir badge informativo indicando a origem dos insights: modelo de IA (Google Gemini) ou motor determinístico de contingência (*fallback*).
- Adicionar estilos visuais em `css/styles.css` alinhados com a identidade do EduTrack (paleta ciano, lilás, tipografia e compatibilidade com os modos claro e escuro).

## Capabilities

### Modified Capabilities

- `dashboard-frontend`: Adicionar requisitos para a seção de Insights Inteligentes no Dashboard, botão de acionamento sob demanda, cards de diagnóstico e recomendações, estados de carregamento e erro, e badge indicativo da origem (IA ou fallback).

## Impact

- **Frontend:**
  - `pages/dashboard.html`: inclusão da marcação HTML da seção de insights inteligentes.
  - `css/styles.css`: novas classes CSS para a seção de insights, cards, badges de motor e tags de desvio.
  - `js/app.js`: lógica de consumo sob demanda do endpoint de insights, renderização dinâmica dos dados e tratamento de estados de interface.
- **Backend/APIs:** Nenhum impacto; reutiliza o endpoint e o contrato JSON já implementados (`POST /academic_insights` ou `POST /api/insights`), sem qualquer alteração de regras de negócio, tabelas ou APIs.
- **Dependências:** Nenhuma nova dependência externa (utiliza Vanilla JavaScript, CSS nativo e Font Awesome já integrados).

