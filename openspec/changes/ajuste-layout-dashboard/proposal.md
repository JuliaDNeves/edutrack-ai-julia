# Proposal

## Why

Para tornar a interface do Dashboard mais limpa, focada e intuitiva para o estudante, é necessário simplificar a barra superior de cabeçalho removendo a caixa de pesquisa desnecessária nesta visão, e reposicionar o botão de ação "Relatório PDF" no menu lateral direito (entre o card de usuário e a listagem de próximas tarefas), melhorando o acesso e a ergonomia visual dos elementos.

## What Changes

- Remover o elemento da barra de pesquisa (`.search-box` / `#header-search`) do cabeçalho do Dashboard em `pages/dashboard.html`.
- Mover o botão de ação **Relatório PDF** (`#btn-download-report`) do cabeçalho para o painel lateral direito (`.right-panel`), posicionando-o logo abaixo do card de perfil do usuário (`.profile-card`) e imediatamente acima da seção de próximas tarefas (`.tasks-panel`).
- Ajustar os espaçamentos e dimensões no CSS (`css/styles.css`) para garantir perfeito alinhamento e largura total harmoniosa no menu lateral, preservando seu estilo visual original (gradiente, ícone e tipografia), responsividade e suporte aos temas claro e escuro.
- Manter a funcionalidade completa de geração e download do relatório PDF sem alterações em regras de negócio, dados, APIs ou outras páginas.

## Capabilities

### Modified Capabilities
- `dashboard-frontend`: Ajustar a estrutura do cabeçalho removendo o campo de pesquisa e reconfigurar o painel lateral direito para acomodar o botão de download do relatório PDF posicionado entre o perfil e as próximas tarefas.

## Impact

- **Frontend HTML**: `pages/dashboard.html` (remoção da barra de pesquisa do cabeçalho e reposicionamento do botão no painel lateral direito).
- **Frontend CSS**: `css/styles.css` (ajustes pontuais de espaçamento e largura do botão no painel lateral direito).
- **Outras funcionalidades**: Nenhuma alteração em lógica JavaScript, APIs, backend ou outras páginas.

