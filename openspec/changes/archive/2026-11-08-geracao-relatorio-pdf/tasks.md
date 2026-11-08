# Tasks

## 1. Gerador de Relatório PDF em Python (`scripts/generate_academic_report.py`)

- [x] 1.1 Criar o script Python `scripts/generate_academic_report.py` utilizando a biblioteca ReportLab, definindo a paleta de cores (cyan `#0284c7` / `#53dce3`, lilac `#7c3aed` / `#b19bf1`) e o layout com a identidade visual do EduTrack.
- [x] 1.2 Implementar a seção do cabeçalho com os dados do estudante (nome, e-mail e data de geração) e a seção de resumo geral (total de disciplinas, tarefas, pendentes, concluídas e percentual de conclusão).
- [x] 1.3 Implementar a tabela detalhada de disciplinas (nome, professor, carga horária, datas de início/término, descrição e progresso de tarefas) e a tabela de tarefas (título, disciplina, status, data prevista, tempo estimado, tempo gasto e descrição), tratando campos opcionais vazios com marcadores neutros sem inventar dados.
- [x] 1.4 Implementar a seção de análise de tempo de estudo com a comparação entre tempo estimado e realizado por disciplina, contabilizando como tempo realizado exclusivamente tarefas concluídas conforme a regra de negócio do EduTrack.

## 2. Endpoint de Relatório no Backend Xano (`apis/`)

- [x] 2.1 Criar o endpoint autenticado de relatório em XanoScript (`apis/academic_reports/get_academic_report_data.xs` ou similar no grupo correspondente), filtrando estritamente os dados pelo usuário autenticado (`user_id == $auth.id`) e respeitando os vínculos entre usuário, disciplinas e tarefas.

## 3. Botão e Download no Dashboard (`pages/dashboard.html` & `js/app.js`)

- [x] 3.1 Adicionar o botão para gerar e baixar o relatório PDF no cabeçalho/barra de ações do Dashboard em `pages/dashboard.html`.
- [x] 3.2 Implementar no `js/app.js` a função para acionar a requisição autenticada, fornecer feedback visual de carregamento no botão e disparar o download automático do arquivo PDF gerado no navegador.

