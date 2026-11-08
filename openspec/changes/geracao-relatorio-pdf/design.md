# Design

## Context

O EduTrack AI é composto por uma interface web frontend (HTML5/CSS3/JavaScript modular), backend Xano gerenciado via XanoScript e scripts utilitários em Python para processamento de dados e regras analíticas (ex.: `scripts/calculate_progress.py` e `scripts/evaluate_overdue_tasks.py`).

Atualmente, o Dashboard exibe métricas dinâmicas em tempo real (progresso geral, tarefas pendentes, tempo de estudo e gráfico de barras comparativo de tempo estimado versus tempo de estudo por disciplina). A nova funcionalidade permite exportar todo esse ecossistema de dados acadêmicos em um documento PDF formal e estilizado com a identidade visual do EduTrack.

Consulte `proposal.md` para a motivação do negócio e `specs/geracao-relatorio-pdf/spec.md` para os requisitos comportamentais detalhados.

## Goals / Non-Goals

**Goals:**
- Implementar script Python especializado (`scripts/generate_academic_report.py`) utilizando ReportLab para compilar o PDF com identidade visual completa do EduTrack.
- Incluir no PDF: cabeçalho com dados do estudante, resumo geral em cartões, tabela de disciplinas com progresso, tabela de tarefas com status e tempos, e seção comparativa de tempo de estudo.
- Implementar endpoint Xano autenticado (`user_id == $auth.id`) para integrar a disponibilização do relatório.
- Adicionar botão de ação no Dashboard (`pages/dashboard.html`) com rotina de download e feedback de carregamento em `js/app.js`.
- Respeitar a regra de tempo de estudo consolidada: contabilizar estritamente tarefas com `status === 'completed'`.
- Tratar dados nulos/vazios com marcadores neutros sem adulterar informações.

**Non-Goals:**
- Não permitir edição de disciplinas ou tarefas a partir do documento PDF.
- Não implementar envio por e-mail ou armazenamento em nuvem externa (S3/GCS), mantendo o download direto no cliente.
- Não alterar as tabelas ou regras de negócio existentes das disciplinas e tarefas.

## Decisions

### 1. Motor de Geração PDF: Python com ReportLab Platypus
- **Decisão:** Utilizar a arquitetura Platypus do ReportLab (`SimpleDocTemplate`, `Paragraph`, `Table`, `TableStyle`, `Spacer`, `PageTemplate`) em `scripts/generate_academic_report.py`.
- **Justificativa:** Platypus gerencia quebra automática de páginas em relatórios extensos, repetição de cabeçalhos de tabela (`repeatRows=1`), alinhamento automático de células com `Paragraph` e suporte completo a cores hexadecimais do EduTrack.
- **Alternativas consideradas:**
  - *ReportLab Canvas puro:* Exige controle manual de coordenadas (X, Y) para cada texto e quebra de linha, tornando a manutenção de tabelas dinâmicas frágil.
  - *Weasyprint / wkhtmltopdf:* Dependem de binários nativos pesados e engines de browser desnecessárias para o ecossistema atual.

### 2. Paleta de Cores e Identidade Visual no Documento
- **Decisão:** Adotar a identidade visual oficial do EduTrack AI adaptada para impressão e leitura digital:
  - Header institucional: Fundo escuro `#090d16` ou borda acentuada com logotipo e título em `#0284c7` (Cyan) e `#7c3aed` (Lilac).
  - Títulos de seção com linha de destaque em gradiente/cyan.
  - Cartões de resumo com bordas arredondadas e fundo sutil `#f8fafc`.
  - Cabeçalhos de tabela com fundo `#0f172a` e texto branco.
  - Badges de status: Lilac/Cyan para pendente/concluída.
  - Tipografia limpa baseada em Helvetica/Helvetica-Bold padrão do ReportLab.

### 3. Integração com Backend Xano
- **Decisão:** Criar um endpoint de consulta e consolidação de relatório em `apis/academic_reports/get_academic_report_data.xs` (ou grupo correspondente) autenticado com `auth = "user"`.
- **Justificativa:** Garante isolamento multi-tenant restrito por `$auth.id`, reunindo dados de `user`, `subjects` e `academic_tasks` já relacionados para fornecimento ao gerador ou diretamente ao fluxo de exportação.
- **Alternativas consideradas:** Fazer múltiplas chamadas individuais no frontend e montar o payload no cliente. A agregação no backend reduz latência e garante integridade referencial dos dados do usuário.

### 4. Acionamento e Download no Dashboard Frontend
- **Decisão:** Adicionar o botão "Baixar Relatório PDF" no cabeçalho do Dashboard (`pages/dashboard.html`) ao lado do campo de busca.
- **Fluxo:**
  1. Usuário clica no botão;
  2. O botão exibe spinner de carregamento e fica desabilitado temporariamente;
  3. A aplicação obtém os dados do backend e aciona a geração do PDF;
  4. O navegador inicia o download do arquivo com nome padronizado (ex.: `edutrack-relatorio-<data>.pdf`);
  5. O botão retorna ao estado normal.

## Risks / Trade-offs

- **[Dependência do ReportLab]** → O ambiente Python deve ter a biblioteca `reportlab` instalada.
  *Mitigação:* Declarar formalmente o pacote nas tarefas e instruir instalação via `pip install reportlab`.
- **[Relatórios com muitas tarefas e quebra de páginas]** → Textos longos em tabelas podem ultrapassar limites visuais da página.
  *Mitigação:* Encapsular todo o conteúdo textual em `Paragraph` com `ParagraphStyle` customizado e definir `colWidths` proporcionais explícitos nas tabelas Platypus.
- **[Campos opcionais nulos ou ausentes]** → Professores, descrições ou datas podem não estar preenchidos no banco.
  *Mitigação:* Função utilitária no script Python que normaliza valores nulos para `"-"` ou `"Não informado"`.

