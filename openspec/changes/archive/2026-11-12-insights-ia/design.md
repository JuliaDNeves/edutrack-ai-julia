# Design

## Context

O EduTrack AI armazena dados de disciplinas (`subjects`) e tarefas acadêmicas (`academic_tasks`) associados ao usuário logado (`user_id == $auth.id`). Atualmente, o Dashboard exibe métricas descritivas estáticas ou agregadas (tarefas concluídas, pendentes e tempo de estudo), mas não fornece diagnósticos interpretativos sobre a eficiência dos estudos nem recomendações sobre onde o estudante deve concentrar seus esforços.

A funcionalidade `insights-ia` introduz uma camada de inteligência analítica para apoiar a tomada de decisão do estudante. Para evitar alucinações matemáticas comuns em modelos de linguagem (LLMs), a arquitetura separa estritamente o **cálculo determinístico de métricas** da **interpretação qualitativa e geração de recomendações pela IA**.

Consulte `proposal.md` para a justificativa e `specs/insights-ia/spec.md` para os requisitos funcionais detalhados.

## Goals / Non-Goals

**Goals:**
- Implementar um motor de cálculo determinístico para indicadores de desempenho acadêmico e aderência temporal por disciplina.
- Excluir estritamente do comparativo de tempo tarefas pendentes ou tarefas concluídas que não possuem tempo gasto (`spent_time`) registrado.
- Formular um prompt enriquecido com os indicadores pré-calculados para envio ao modelo de IA (Google Gemini).
- Gerar recomendações personalizadas, práticas e contextualizadas, com diretrizes rígidas contra invenção de dados.
- Proteger totalmente credenciais e chaves de API (ex.: `GEMINI_API_KEY`) no ambiente de backend/serviço, sem qualquer tráfego para o cliente frontend.
- Disponibilizar execução sob demanda por meio de endpoint autenticado.

**Non-Goals:**
- Não implementar nesta etapa componentes visuais ou cards de insights no Dashboard (escopo restrito à camada de análise e integração).
- Não permitir que a IA efetue cálculos aritméticos primários (somas, porcentagens e médias devem ser fornecidas prontas pelo sistema).
- Não disparar análises em background a cada clique ou atualização de tela (a execução deve ser estritamente sob demanda).

## Decisions

### 1. Arquitetura de Integração com o Modelo de IA
Foram avaliadas duas abordagens principais para o ecossistema EduTrack:

- **Abordagem A: Execução direta no Xano via HTTP Request / External API:**
  - *Fluxo:* O Xano calcula as métricas em XanoScript e invoca o endpoint REST do Google Gemini (`https://generativelanguage.googleapis.com/v1beta/...`) usando a chave configurada em `$env.GEMINI_API_KEY`.
  - *Vantagens:* Elimina a necessidade de manter serviços adicionais ativos para a API.
- **Abordagem B: Microsserviço/Script Python com SDK do Google GenAI:**
  - *Fluxo:* Módulo Python (`scripts/academic_insights_engine.py`) que recebe os dados brutos ou autentica via Bearer token, executa o cálculo aritmético com precisão em Python e consome a API do Gemini via biblioteca oficial `google-genai` com chave em `.env` ou variável de ambiente do SO.
  - *Vantagens:* Python é a linguagem padrão do projeto para regras analíticas e processamento de dados (`calculate_progress.py`, `evaluate_overdue_tasks.py`, `generate_academic_report.py`); maior facilidade para testes unitários, validação matemática e formatação refinada do prompt.

- **Decisão Arquitetural Adotada (Híbrida e Flexível):**
  1. O motor central de cálculo e integração com Gemini é implementado em módulo Python reutilizável (`scripts/academic_insights_engine.py`), contendo o motor de métricas e a chamada à API do Gemini.
  2. Um endpoint autenticado no XanoScript (`apis/insights/post_academic_insights.xs`) ou serviço Python local dedicado disponibiliza o contrato REST sob demanda para o cliente, autenticado pelo Bearer token do usuário.
  3. A chave de API do Gemini (`GEMINI_API_KEY`) fica restrita a variáveis de ambiente server-side, garantindo proteção total contra exposição no frontend.

### 2. Formulação Matemática dos Indicadores
Para cada disciplina associada ao usuário autenticado:
- **Tarefas Totais ($T_{tot}$):** Contagem total de tarefas cadastradas na disciplina.
- **Tarefas Concluídas ($T_{comp}$):** Tarefas com `status == 'completed'`.
- **Tarefas Pendentes ($T_{pend}$):** Tarefas com `status == 'pending'`.
- **Taxa de Conclusão:** $\frac{T_{comp}}{T_{tot}} \times 100$ (ou $0.0\%$ se $T_{tot} = 0$).
- **Filtro de Comparação Temporal:** Apenas tarefas com `status == 'completed'` E com `spent_time` preenchido, numérico e $> 0$.
- **Tempo Estimado Válido ($Est_{time}$):** Soma de `estimated_time` das tarefas que atendem ao filtro.
- **Tempo Realizado Válido ($Spent_{time}$):** Soma de `spent_time` das tarefas que atendem ao filtro.
- **Desvio Percentual ($Diff_{pct}$):**
  $$\text{Diff}_{\text{pct}} = \frac{Spent_{time} - Est_{time}}{Est_{time}} \times 100$$
  - Valor $> 0$: o estudante gastou mais tempo do que planejou (subestimação de esforço).
  - Valor $< 0$: o estudante concluiu mais rápido do que planejou (superestimação de esforço ou alta eficiência).
  - Valor $= 0$: aderência exata ao planejamento.

### 3. Engenharia de Prompt e Contrato com a IA
O payload enviado ao modelo é composto exclusivamente por:
- Nome do estudante.
- Lista de disciplinas com seus respectivos indicadores já calculados (concluídas, pendentes, taxa de conclusão, horas estimadas, horas gastas e variação percentual).
- Disciplinas sem dados temporais válidos identificadas explicitamente.

O System Prompt impõe as seguintes regras ao modelo:
- Atuar como mentor de organização e planejamento acadêmico.
- Basear-se única e exclusivamente nas métricas fornecidas.
- Proibir terminantemente a fabricação de notas escolares, datas de provas ou nomes de trabalhos que não constem no payload.
- Gerar resposta estruturada em formato JSON contendo:
  - `resumo_geral`: síntese da situação acadêmica.
  - `diagnosticos_disciplinas`: apontamentos individuais das disciplinas com maiores desvios ou pendências.
  - `recomendacoes_praticas`: 3 a 5 ações concretas priorizadas para otimizar a rotina de estudos.
  - `pontos_fortes`: reconhecimento de disciplinas com boa aderência e progresso.

## Risks / Trade-offs

- **[Ausência da chave `GEMINI_API_KEY`]** → Se o ambiente não possuir a chave configurada, a chamada à IA falhará.
  *Mitigação:* O motor deve tratar a ausência da chave ou erros de rede graciosa e elegantemente, retornando os indicadores pré-calculados e uma mensagem clara de status sem quebrar a API.
- **[Estudantes sem tarefas com tempo gasto registrado]** → Impossibilidade de calcular a variação percentual de tempo.
  *Mitigação:* O sistema marca o indicador de tempo como nulo/indisponível para a disciplina e orienta a IA a focar nas taxas de conclusão e pendências, recomendando ao estudante registrar o tempo gasto nas próximas conclusões.
- **[Custos e consumo de tokens da IA]** → Chamadas recorrentes desnecessárias poderiam onerar a cota da API.
  *Mitigação:* A arquitetura é estritamente sob demanda; nenhuma inferência é feita automaticamente em segundo plano.

