/**
 * EduTrack AI - Front-End Interactions & Standalone Page Scripts
 */

document.addEventListener('DOMContentLoaded', async () => {
    
    // Path Helpers for Navigation
    function getAuthLoginUrl() {
        const path = window.location.pathname;
        if (path.includes('/pages/auth/') || path.includes('\\pages\\auth\\')) {
            return 'login.html';
        } else if (path.includes('/pages/') || path.includes('\\pages\\')) {
            return 'auth/login.html';
        } else {
            return 'pages/auth/login.html';
        }
    }

    function getDashboardUrl() {
        const path = window.location.pathname;
        if (path.includes('/pages/auth/') || path.includes('\\pages\\auth\\')) {
            return '../dashboard.html';
        } else if (path.includes('/pages/') || path.includes('\\pages\\')) {
            return 'dashboard.html';
        } else {
            return 'pages/dashboard.html';
        }
    }

    // ==========================================================================
    // 1. Dashboard Navigation & Checkbox Interactions
    // ==========================================================================
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const taskIcons = document.querySelectorAll('.task-status-icon');
    taskIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.classList.contains('fa-square')) {
                icon.classList.remove('fa-square', 'fa-regular');
                icon.classList.add('fa-solid', 'fa-square-check');
                icon.style.color = '#53dce3';
                const taskTitle = icon.nextElementSibling ? icon.nextElementSibling.querySelector('.task-title') : null;
                if (taskTitle) {
                    taskTitle.style.textDecoration = 'line-through';
                    taskTitle.style.opacity = '0.6';
                }
            } else {
                icon.classList.remove('fa-solid', 'fa-square-check');
                icon.classList.add('fa-regular', 'fa-square');
                icon.style.color = '';
                const taskTitle = icon.nextElementSibling ? icon.nextElementSibling.querySelector('.task-title') : null;
                if (taskTitle) {
                    taskTitle.style.textDecoration = 'none';
                    taskTitle.style.opacity = '1';
                }
            }
        });
    });

    // ==========================================================================
    // 2. Login Form Handling (auth/login)
    // ==========================================================================
    const formLogin = document.getElementById('form-login');
    if (formLogin && typeof EduTrackAuth !== 'undefined') {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const submitBtn = document.getElementById('btn-submit-login');
            const feedbackAlert = document.getElementById('login-feedback');
            const feedbackText = document.getElementById('login-feedback-text');

            if (feedbackAlert) feedbackAlert.style.display = 'none';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
            }

            try {
                await EduTrackAuth.login(emailInput.value.trim(), passwordInput.value);
                window.location.href = getDashboardUrl();
            } catch (err) {
                if (feedbackText && feedbackAlert) {
                    feedbackText.textContent = err.message || 'Falha ao realizar login. Verifique suas credenciais.';
                    feedbackAlert.style.display = 'flex';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Entrar';
                }
            }
        });
    }

    // ==========================================================================
    // 3. Register Form Handling (auth/signup)
    // ==========================================================================
    const formRegister = document.getElementById('form-register');
    if (formRegister && typeof EduTrackAuth !== 'undefined') {
        formRegister.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            const confirmPasswordInput = document.getElementById('register-confirm-password');
            const submitBtn = document.getElementById('btn-submit-register');
            const feedbackAlert = document.getElementById('register-feedback');
            const feedbackText = document.getElementById('register-feedback-text');

            if (feedbackAlert) feedbackAlert.style.display = 'none';

            if (passwordInput.value !== confirmPasswordInput.value) {
                if (feedbackText && feedbackAlert) {
                    feedbackText.textContent = 'As senhas não coincidem. Por favor, verifique.';
                    feedbackAlert.style.display = 'flex';
                }
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Criando conta...';
            }

            try {
                await EduTrackAuth.signup(emailInput.value.trim(), passwordInput.value);
                window.location.href = getDashboardUrl();
            } catch (err) {
                if (feedbackText && feedbackAlert) {
                    feedbackText.textContent = err.message || 'Falha ao criar conta. Verifique os dados informados.';
                    feedbackAlert.style.display = 'flex';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Criar conta';
                }
            }
        });
    }

    // ==========================================================================
    // 4. Password Recovery Form Demonstration
    // ==========================================================================
    const formRecovery = document.getElementById('form-recovery');
    if (formRecovery) {
        formRecovery.addEventListener('submit', (e) => {
            const feedbackAlert = document.getElementById('recovery-feedback');
            if (feedbackAlert) {
                e.preventDefault();
                feedbackAlert.style.display = 'flex';
            }
        });
    }

    // ==========================================================================
    // 5. Dashboard Guard & User Profile Hydration (auth/me)
    // ==========================================================================
    const isDashboardPage = !!document.getElementById('welcome-user-heading') || !!document.getElementById('user-name-sidebar');
    if (isDashboardPage && typeof EduTrackAuth !== 'undefined') {
        if (!EduTrackAuth.isAuthenticated()) {
            EduTrackAuth.logout(getAuthLoginUrl());
            return;
        }

        try {
            const user = await EduTrackAuth.getMe();
            const displayName = user.name && user.name.trim() !== '' ? user.name : user.email.split('@')[0];
            const initials = EduTrackAuth.getInitials(user.name, user.email);

            const welcomeHeading = document.getElementById('welcome-user-heading');
            if (welcomeHeading) {
                welcomeHeading.innerHTML = `Olá, ${displayName}! <i class="fa-solid fa-sparkles" style="color: #53dce3; font-size: 1.2rem;"></i>`;
            }

            const nameSidebar = document.getElementById('user-name-sidebar');
            if (nameSidebar) nameSidebar.textContent = user.name || user.email;

            const emailSidebar = document.getElementById('user-email-sidebar');
            if (emailSidebar) emailSidebar.textContent = user.role ? `Estudante (${user.role})` : user.email;

            const avatarMini = document.getElementById('user-avatar-mini');
            if (avatarMini) avatarMini.textContent = initials;

            const namePanel = document.getElementById('user-name-panel');
            if (namePanel) namePanel.textContent = displayName;

            const rolePanel = document.getElementById('user-role-panel');
            if (rolePanel) rolePanel.textContent = user.role ? `Estudante • ${user.role}` : 'Estudante EduTrack';

            const avatarLarge = document.getElementById('user-avatar-large');
            if (avatarLarge) avatarLarge.textContent = initials;

        } catch (err) {
            console.error('Sessão inválida ou expirada:', err);
            EduTrackAuth.logout(getAuthLoginUrl());
        }
    }

    // ==========================================================================
    // 6. Logout Handler
    // ==========================================================================
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout && typeof EduTrackAuth !== 'undefined') {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            EduTrackAuth.logout(getAuthLoginUrl());
        });
    }

});
