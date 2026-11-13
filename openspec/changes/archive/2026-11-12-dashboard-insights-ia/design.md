# Design

## Context

O Dashboard do EduTrack AI (`pages/dashboard.html`) atualmente exibe dados agregados de progresso geral, contadores de tarefas e disciplinas e um gráfico comparativo de tempo de estudo por disciplina. A funcionalidade `insights-ia` já implementou o motor de cálculo determinístico e a integração com Google Gemini no backend/serviço, expondo um contrato JSON consolidado contendo `status`, `ai_engine`, `metrics` e `insights`.

Esta etapa foca exclusivamente na camada de apresentação (HTML, CSS e JavaScript no frontend) para disponibilizar os insights de forma amigável e sob demanda para o estudante. Consulte `proposal.md` para a motivação e `specs/dashboard-frontend/spec.md` para os requisitos funcionais detalhados.

## Goals / Non-Goals

**Goals:**
- Adicionar uma seção dedicada e elegante de "Insights Inteligentes" no Dashboard, perfeitamente integrada ao design system do EduTrack.
- Garantir execução estritamente sob demanda através do botão "Gerar insights", evitando chamadas automáticas ou desperdício de tokens de IA ao navegar entre telas.
- Apresentar os resultados de forma visualmente estruturada em 4 categorias de cards:
  1. Resumo Geral do panorama acadêmico.
  2. Diagnósticos por Disciplina com tags de desvio temporal (dentro do esperado, subestimado, superestimado ou sem registro).
  3. Recomendações Práticas em lista acionável.
  4. Pontos Fortes reconhecidos.
- Implementar feedback imediato para estados de carregamento (botão desabilitado com ícone giratório) e tratamento gracioso de erros de rede.
- Indicar visualmente através de badge se a análise foi gerada pelo modelo de IA (Google Gemini) ou por regras determinísticas de contingência (fallback).
- Manter total conformidade com os modos claro e escuro já existentes.

**Non-Goals:**
- Não alterar nenhuma API, tabela, query do XanoScript ou cálculo no backend (reutilização estrita do contrato JSON existente).
- Não disparar geração automática de insights ao abrir o Dashboard ou após alternar tarefas.
- Não alterar layout ou estilização de outras páginas (`subjects.html`, `tasks.html`, `settings.html`) ou de seções existentes do Dashboard.

## Decisions

### 1. Posicionamento da Seção no Dashboard
- **Decisão:** Inserir a `<section class="insights-section">` logo abaixo da `<section class="chart-card">` (gráfico de tempo de estudo por disciplina), ocupando a largura total do container principal (`main.main-content`).
- **Justificativa:** O estudante primeiro visualiza o progresso numérico e o gráfico comparativo; os insights e recomendações surgem logo em seguida como a interpretação qualitativa e o plano de ação desses mesmos dados.
- **Alternativas consideradas:**
  - *Colocar no painel lateral direito (`aside.right-panel`):* Descartado para não sobrecarregar o painel lateral, que já abriga o perfil do usuário, o botão de relatório PDF e as próximas tarefas.

### 2. Ciclo de Vida da Interface e Estados de Exibição
A seção gerenciará 4 estados visuais bem delimitados:
1. **Estado Inicial (Vazio / Convite):** Card acolhedor explicando o propósito da funcionalidade com o botão principal "Gerar insights com IA".
2. **Estado de Carregamento (Loading):** Botão desabilitado com animação de spinner (`fa-solid fa-spinner fa-spin`), texto "Analisando seus dados acadêmicos..." e contêiner sem oscilação de layout.
3. **Estado de Sucesso (Resultados Apresentados):**
   - Cabeçalho com o título, badge do motor de IA (`fa-solid fa-wand-magic-sparkles` "Gerado com IA" ou `fa-solid fa-shield-halved` "Modo Offline / Regras Heurísticas") e botão secundário "Atualizar insights".
   - Grid com 4 cards: Resumo Geral, Diagnósticos por Disciplina, Recomendações Práticas e Pontos Fortes.
4. **Estado de Erro:** Card de alerta com mensagem informativa e botão "Tentar novamente".

### 3. Integração com o Endpoint de Insights no Frontend (`js/app.js`)
- **Decisão:** Criar a função modular `requestAcademicInsights()` no `js/app.js`.
  - Endpoint primário: serviço sob demanda local ou Xano (`http://127.0.0.1:5002/api/insights` ou endpoint configurado no `EduTrackAuth`).
  - O payload da requisição envia o token de autenticação e os dados acadêmicos já carregados na sessão do usuário pelo Dashboard (`user`, `subjects`, `tasks`).
- **Justificativa:** Reutiliza os dados já hidratados no Dashboard, evitando requisições redundantes de busca de dados no banco.

### 4. Estilos e Tokens Visuais (`css/styles.css`)
- **Decisão:** Utilizar as variáveis CSS existentes (`--bg-card`, `--accent-cyan`, `--accent-lilac`, `--border-color`, `--text-primary`, `--text-secondary`).
- **Tags de status de tempo para disciplinas:**
  - `subestimado`: badge âmbar/alerta (excedeu o tempo planejado em $> 15\%$).
  - `superestimado`: badge ciano/produtividade (concluiu em $< -15\%$ do tempo planejado).
  - `dentro_esperado`: badge verde/equilíbrio (variação entre $-15\%$ e $+15\%$).
  - `sem_dados`: badge cinza neutro (sem registro de tempo gasto).

## Risks / Trade-offs

- **[Latência de resposta da IA externa]** → A requisição à IA pode levar de 2 a 5 segundos dependendo da conexão.
  *Mitigação:* O estado de carregamento com *spinner* e botão desabilitado impede cliques duplicados e fornece feedback imediato de que a análise está em processamento.
- **[Serviço offline ou falha de conectividade]** → O motor backend pode retornar fallback ou erro de rede se o serviço não estiver acessível.
  *Mitigação:* O frontend trata ambos os cenários com elegância: se o backend enviar o fallback, os cards renderizam perfeitamente com o badge "Modo Offline"; se a requisição falhar totalmente, exibe card de erro amigável com opção de repetição.

