# Proposal

## Why

Estudantes universitários frequentemente enfrentam dificuldades para identificar gargalos em sua rotina acadêmica, como disciplinas com subestimação sistemática de tempo de dedicação ou acúmulo de tarefas pendentes. Uma análise inteligente que calcule com precisão os desvios entre tempo planejado e realizado, taxas de conclusão e volume de pendências, submetendo esses indicadores a um modelo de IA contextualizado e sob demanda, oferece diagnósticos objetivos e recomendações personalizadas para aprimorar o desempenho e o planejamento dos estudos, sem risco de alucinação numérica.

## What Changes

- Implementar módulo analítico no sistema responsável por pré-calcular os indicadores acadêmicos reais do estudante autenticado:
  - Tempo estimado total e tempo gasto total por disciplina (considerando estritamente tarefas concluídas com tempo gasto registrado).
  - Diferença percentual entre o tempo planejado e o realizado por disciplina (`((realizado - estimado) / estimado) * 100`).
  - Contagem de tarefas concluídas e pendentes por disciplina e consolidadas.
  - Percentual de conclusão de tarefas por disciplina (`(concluídas / total) * 100`).
  - Desconsideração estrita de tarefas sem tempo gasto registrado no comparativo temporal.
- Desenvolver a camada de integração com Inteligência Artificial no backend (arquitetura segura server-side, sem exposição de credenciais ou chaves de API no cliente frontend):
  - Formatação estruturada do prompt analítico contendo apenas os indicadores calculados deterministicamente pelo sistema.
  - Chamada sob demanda ao modelo de IA (Google Gemini via backend/serviço seguro) para interpretar os dados e produzir insights acionáveis e contextualizados, sem inventar dados.
- Criar endpoint autenticado no backend para disparar a análise e retornar os insights estruturados sob demanda, evitando execuções desnecessárias ou redundantes.
- Manter esta etapa restrita à análise de dados e integração com a IA, postergando a renderização visual dos cards na interface do Dashboard para uma etapa subsequente conforme especificado.

## Capabilities

### New Capabilities
- `insights-ia`: Motor analítico de indicadores acadêmicos e integração segura sob demanda com modelo de IA para geração de diagnósticos e recomendações personalizadas baseadas em dados reais do estudante.

### Modified Capabilities

## Impact

- **Backend / Serviços**: Novo módulo de cálculo e endpoint autenticado (`/insights/generate` ou `/api/insights`) isolado pelo usuário autenticado (`user_id == $auth.id`), com gestão segura de chaves de API em variáveis de ambiente.
- **Camada de IA**: Integração com modelo generativo (Google Gemini) através de prompt com restrição estrita contra alucinação de dados e foco em análise pedagógica/organizacional.
- **Segurança**: Chaves de API de IA mantidas exclusivamente em ambiente seguro (backend/serviço), nunca trafegadas ou armazenadas no frontend.
- **Frontend**: Nenhuma alteração visual nesta etapa (cards de visualização no Dashboard serão abordados em etapa posterior).

