# Tasks

## 1. Motor Analítico de Dados Acadêmicos (`scripts/academic_insights_engine.py`)

- [x] 1.1 Implementar a função de cálculo dos indicadores acadêmicos por disciplina: tarefas concluídas, pendentes e percentual de conclusão a partir dos dados reais do usuário autenticado.
- [x] 1.2 Implementar a lógica de comparação temporal: somar tempo estimado e tempo gasto exclusivamente para tarefas com status `completed` e tempo gasto preenchido, calculando a diferença percentual entre o planejado e o realizado.
- [x] 1.3 Implementar a exclusão estrita de tarefas pendentes ou sem tempo gasto registrado na comparação de tempo e o tratamento de disciplinas sem tarefas.

## 2. Integração com IA e Geração de Recomendações

- [x] 2.1 Construir a formatação contextualizada do prompt para o modelo de IA (Google Gemini), incorporando os indicadores pré-calculados pelo sistema com instruções explícitas contra a invenção de dados.
- [x] 2.2 Implementar a chamada segura ao modelo de IA no backend/serviço, utilizando chave de API configurada em variável de ambiente (`GEMINI_API_KEY`) sem expô-la ao frontend.
- [x] 2.3 Estruturar a resposta da IA em formato JSON padronizado com diagnóstico por disciplina, recomendações práticas acionáveis e pontos fortes observados.

## 3. Endpoint sob Demanda no Backend

- [x] 3.1 Criar o endpoint de consulta sob demanda de insights acadêmicos (`apis/insights/` no XanoScript ou serviço integrado), isolado pelo usuário autenticado (`user_id == $auth.id`), retornando os indicadores calculados e as recomendações da IA.
- [x] 3.2 Implementar o tratamento de contingência para falhas de comunicação com a IA ou ausência de chave de API, garantindo o retorno íntegro dos indicadores pré-calculados.

