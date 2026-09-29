# Tasks

## 1. Landing Page Visual Structure (`index.html`)

- [x] 1.1 Replace redirect placeholder in `index.html` with full landing page presentation layout featuring EduTrack hero banner, feature highlight badges, and action buttons for "Login" and "Criar conta", verifying element visibility in browser.
- [x] 1.2 Implement modular authentication card view containers (`#view-landing`, `#view-login`, `#view-register`, `#view-recovery`) within `index.html`, verifying semantic HTML structure.

## 2. Authentication Visual Templates

- [x] 2.1 Build Login visual screen with Email field, Password field, "Entrar" button, "Esqueci minha senha" link, "Criar conta" link, and "Voltar à inicial" button, verifying input placement and link presence.
- [x] 2.2 Build Cadastro (Sign Up) visual screen with Email field, Password field, Password Confirmation field, "Criar conta" button, and "Voltar ao login" link, verifying input layout.
- [x] 2.3 Build Recuperação de Senha (Password Recovery) visual screen with Email field, "Solicitar recuperação" button, visual guidance info block, and "Voltar ao login" link, verifying visual guidance layout.

## 3. Styling & Responsive Design (`css/styles.css`)

- [x] 3.1 Add reusable CSS visual classes for authentication containers (`.auth-card`, `.auth-input`, `.auth-btn-primary`, `.auth-btn-secondary`, `.auth-link`) reusing existing design tokens (`#090d16`, `#53dce3`, `#b19bf1`, rounded borders, subtle glows), verifying visual alignment with Dashboard styling.
- [x] 3.2 Apply media queries and flexible layout rules for desktop, tablet, and mobile viewports, verifying display without horizontal scrollbar or content clipping.

## 4. Client-Side Visual Navigation (`js/app.js`)

- [x] 4.1 Add client-side view toggle event handlers in JavaScript to switch visibility smoothly between Landing, Login, Cadastro, and Recuperação de Senha views, verifying view transitions upon clicking action buttons and back links.
