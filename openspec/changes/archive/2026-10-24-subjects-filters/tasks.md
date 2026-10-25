# Tasks

## 1. Interface e Estilos dos Filtros (`pages/subjects.html`)

- [x] 1.1 Inserir o botão de alternância com ícone de filtro (`#btn-filter-toggle`) à esquerda da barra de pesquisa e o painel de filtros (`#subjects-filters-bar`) com campos de data de início, data de término, professor, carga horária e botão de limpar filtros, iniciando oculto por padrão (`display: none`).
- [x] 1.2 Adicionar as regras de CSS no bloco de estilos de `pages/subjects.html` para estilizar o botão de alternância e o painel de filtros, garantindo compatibilidade com os temas claro e escuro (`[data-theme="light"]` e `[data-theme="dark"]`) e responsividade em dispositivos móveis.

## 2. Integração e Lógica dos Filtros (`pages/subjects.html`)

- [x] 2.1 Implementar o evento de clique no botão `#btn-filter-toggle` para mostrar ou ocultar o painel de filtros com alternância do estado visual ativo.
- [x] 2.2 Implementar a população dinâmica das opções de professor no select de filtro a partir das disciplinas cadastradas pelo usuário logado.
- [x] 2.3 Implementar a lógica de filtragem combinada na função `renderSubjects()` de `pages/subjects.html`, aplicando conjuntamente os filtros de datas (início e término), professor, carga horária e busca textual, recalculando a contagem de disciplinas e o total de carga horária.
- [x] 2.4 Implementar a ação do botão "Limpar Filtros" para resetar todos os campos de filtro (datas, professor, carga horária e busca) e atualizar a listagem e os contadores de disciplinas.
- [x] 2.5 Verificar o funcionamento dos filtros combinados, a exibição de estado vazio quando nenhum resultado for encontrado e a preservação das operações de CRUD existentes na página de Disciplinas.
