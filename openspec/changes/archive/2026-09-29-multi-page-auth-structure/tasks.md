# Tasks

## 1. Page File Structure Setup

- [x] 1.1 Create `pages/auth/` directory structure and update `index.html` as the standalone landing page, verifying link href targets point to `pages/auth/login.html` and `pages/auth/register.html`.
- [x] 1.2 Move `dashboard.html` to `pages/dashboard.html` and update its relative CSS stylesheet (`../css/styles.css`), JavaScript (`../js/app.js`), and account switch link (`auth/login.html`), verifying asset loading.

## 2. Standalone Authentication Pages

- [x] 2.1 Create `pages/auth/login.html` as a standalone HTML page with Email, Password, "Entrar" button (navigating to `../dashboard.html`), "Esqueci minha senha" link (`forgot-password.html`), "Criar conta" link (`register.html`), and "Voltar à página inicial" link (`../../index.html`), verifying native browser navigation links.
- [x] 2.2 Create `pages/auth/register.html` as a standalone HTML page with Email, Password, Confirm Password, "Criar conta" button (navigating to `login.html`), "Fazer login" link (`login.html`), and "Voltar à página inicial" link (`../../index.html`), verifying layout and link targets.
- [x] 2.3 Create `pages/auth/forgot-password.html` as a standalone HTML page with Email input, visual guidance block, "Solicitar recuperação" button, "Voltar ao login" link (`login.html`), and "Voltar à página inicial" link (`../../index.html`), verifying layout and link targets.

## 3. CSS & JS Clean-Up for Multi-Page Navigation

- [x] 3.1 Adjust `css/styles.css` classes for standalone full-page flex layouts (`.auth-page-wrapper`), preserving dark mode `#090d16`, cyan `#53dce3`, lilac `#b19bf1`, rounded cards, and responsive rules without display toggle dependencies, verifying styling consistency across all pages.
- [x] 3.2 Update `js/app.js` to simplify handlers for native page form submissions and link events across standalone pages, verifying console error-free execution.

## 4. Local Dev Server Execution

- [x] 4.1 Launch local HTTP development server on `http://localhost:3000` in the background, verifying HTTP 200 server response and accessibility.
