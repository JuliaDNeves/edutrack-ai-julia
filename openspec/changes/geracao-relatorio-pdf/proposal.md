# Proposal

## Why

Os estudantes do EduTrack AI necessitam de um documento consolidado e exportável com seu panorama acadêmico para acompanhamento de desempenho, planejamento pessoal ou comprovação de estudos. A geração de um relatório em PDF estruturado e estilizado com a identidade visual da plataforma sintetiza as informações de disciplinas, tarefas, conclusões e tempos de estudo dedicados em um formato portátil e oficial.

## What Changes

- Implementar script Python utilizando a biblioteca ReportLab para gerar o relatório acadêmico em PDF com a identidade visual do EduTrack AI (paleta cyan/lilac, tipografia profissional, cabeçalho institucional, tabelas estilizadas e cartões de resumo).
- Estruturar o conteúdo do PDF contendo:
  - Dados do estudante: nome, e-mail e data/hora de geração.
  - Resumo geral: total de disciplinas, total de tarefas, tarefas pendentes, tarefas concluídas e taxa de conclusão percentual.
  - Seção de disciplinas: nome, professor, carga horária, datas de início/término, descrição e progresso individual de tarefas.
  - Seção de tarefas: título, disciplina associada, status, data prevista, tempo estimado, tempo gasto e descrição detalhada.
  - Análise de tempo de estudo: comparativo entre tempo estimado e tempo realizado por disciplina, considerando estritamente tarefas concluídas segundo a regra de negócio consolidada.
  - Tratamento consistente para campos opcionais não preenchidos (exibindo traço ou "Não informado" sem inventar dados).
- Criar endpoint no backend Xano (XanoScript) autenticado com isolamento estrito por `user_id` para integrar a solicitação e retorno do relatório acadêmico em PDF.
- Adicionar botão de ação na interface do Dashboard (`pages/dashboard.html` e `js/app.js`) para permitir que o estudante autenticado solicite a geração e faça o download direto do documento PDF gerado com feedback visual de carregamento.

## Capabilities

### New Capabilities
- `geracao-relatorio-pdf`: Geração de relatório acadêmico completo em formato PDF via Python/ReportLab, integração com endpoint no backend Xano e acionamento por botão de exportação e download no Dashboard do estudante.

### Modified Capabilities

## Impact

- **Frontend**: Inclusão de botão "Exportar Relatório PDF" (ou "Baixar Relatório") no cabeçalho ou seção de ações do Dashboard em `pages/dashboard.html` e lógica de download/feedback em `js/app.js`.
- **Backend / Xano**: Novo endpoint autenticado para geração/disponibilização do relatório PDF do usuário logado.
- **Scripts Python**: Novo script gerador em `scripts/generate_academic_report.py` utilizando `reportlab`.
- **Dependências**: Adição da biblioteca Python `reportlab`.
- **Isolamento e Segurança**: Acesso estritamente restrito aos dados reais pertencentes ao `user_id` autenticado.

