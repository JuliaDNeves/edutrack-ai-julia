/**
 * EduTrack AI - Front-End Interactions & Standalone Page Scripts
 */

// ==========================================================================
// EduTrack Theme Manager Module (Light / Dark Mode)
// ==========================================================================
const EduTrackTheme = {
    STORAGE_KEY: 'edutrack_theme',
    
    getPreferredTheme() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
            return saved;
        }
        return 'light'; // Light Mode is the default for new users
    },

    setTheme(theme) {
        const targetTheme = (theme === 'dark') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem(this.STORAGE_KEY, targetTheme);
        this.updateToggleUI(targetTheme);
    },

    init() {
        // Apply theme immediately to document element to avoid FOUC
        const currentTheme = this.getPreferredTheme();
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Sync UI toggles when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindUI());
        } else {
            this.bindUI();
        }
    },

    bindUI() {
        const currentTheme = this.getPreferredTheme();
        this.updateToggleUI(currentTheme);

        // Bind clicks on theme toggle buttons (landing page top bar)
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedTheme = btn.dataset.themeTarget;
                if (selectedTheme) {
                    this.setTheme(selectedTheme);
                }
            });
        });

        // Bind theme option cards on Settings page (pages/settings.html)
        document.querySelectorAll('.theme-option-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedTheme = card.dataset.themeChoice;
                if (selectedTheme) {
                    this.setTheme(selectedTheme);
                }
            });
        });
    },

    updateToggleUI(theme) {
        // Toggle buttons (landing page)
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            if (btn.dataset.themeTarget === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Theme option cards on Settings page
        document.querySelectorAll('.theme-option-card').forEach(card => {
            if (card.dataset.themeChoice === theme) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
};

// Immediately initialize theme on script load
EduTrackTheme.init();

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
            const nameInput = document.getElementById('register-name');
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            const confirmPasswordInput = document.getElementById('register-confirm-password');
            const submitBtn = document.getElementById('btn-submit-register');
            const feedbackAlert = document.getElementById('register-feedback');
            const feedbackText = document.getElementById('register-feedback-text');

            if (feedbackAlert) feedbackAlert.style.display = 'none';

            const nameValue = nameInput ? nameInput.value.trim() : '';
            if (!nameValue) {
                if (feedbackText && feedbackAlert) {
                    feedbackText.textContent = 'Por favor, informe seu nome.';
                    feedbackAlert.style.display = 'flex';
                }
                return;
            }

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
                await EduTrackAuth.signup(emailInput.value.trim(), passwordInput.value, nameValue);
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
    // 4. Password Recovery Form Handling (auth/request_password_reset)
    // ==========================================================================
    const formRecovery = document.getElementById('form-recovery');
    if (formRecovery) {
        formRecovery.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('recovery-email');
            const submitBtn = document.getElementById('btn-submit-recovery');
            const feedbackAlert = document.getElementById('recovery-feedback');

            if (!emailInput || !emailInput.value.trim()) return;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            }

            try {
                if (typeof EduTrackAuth !== 'undefined') {
                    const result = await EduTrackAuth.requestPasswordReset(emailInput.value.trim());
                    if (feedbackAlert) {
                        feedbackAlert.className = 'auth-alert-success';
                        const messageText = (result && result.message) ? result.message : 'Instruções de recuperação geradas com sucesso!';
                        
                        let continueBtnHtml = '';
                        if (result && result.token) {
                            continueBtnHtml = `
                                <div style="margin-top: 12px;">
                                    <a href="reset-password.html?token=${encodeURIComponent(result.token)}" class="auth-btn-primary full-width" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; border-radius: 8px; padding: 10px 16px; font-weight: 600;">
                                        <i class="fa-solid fa-key"></i> Continuar para redefinir senha
                                    </a>
                                </div>
                            `;
                        }

                        feedbackAlert.innerHTML = `
                            <i class="fa-solid fa-circle-check"></i>
                            <div style="flex: 1;">
                                <span>${messageText}</span>
                                ${continueBtnHtml}
                            </div>
                        `;
                        feedbackAlert.style.display = 'flex';
                    }
                } else {
                    if (feedbackAlert) feedbackAlert.style.display = 'flex';
                }
            } catch (err) {
                if (feedbackAlert) {
                    feedbackAlert.className = 'auth-alert-error';
                    feedbackAlert.innerHTML = `
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <span>${err.message || 'Erro ao solicitar recuperação de senha. Verifique o e-mail informado.'}</span>
                    `;
                    feedbackAlert.style.display = 'flex';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Solicitar recuperação';
                }
            }
        });
    }

    // ==========================================================================
    // 4.1. Password Reset Completion Handling (auth/reset_password)
    // ==========================================================================
    const formResetPassword = document.getElementById('form-reset-password');
    if (formResetPassword) {
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get('token');
        const feedbackAlert = document.getElementById('reset-feedback');
        const feedbackText = document.getElementById('reset-feedback-text');

        if (!resetToken) {
            if (feedbackAlert && feedbackText) {
                feedbackText.textContent = 'Token de redefinição ausente. Solicite uma nova recuperação de senha.';
                feedbackAlert.style.display = 'flex';
            }
        }

        formResetPassword.addEventListener('submit', async (e) => {
            e.preventDefault();
            const passwordInput = document.getElementById('reset-password');
            const confirmPasswordInput = document.getElementById('reset-confirm-password');
            const submitBtn = document.getElementById('btn-submit-reset');

            if (feedbackAlert) feedbackAlert.style.display = 'none';

            if (!resetToken) {
                if (feedbackText && feedbackAlert) {
                    feedbackText.textContent = 'Token de redefinição ausente na URL. Por favor, solicite a recuperação novamente.';
                    feedbackAlert.style.display = 'flex';
                }
                return;
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                if (feedbackText && feedbackAlert) {
                    feedbackText.textContent = 'As senhas não coincidem. Por favor, verifique.';
                    feedbackAlert.style.display = 'flex';
                }
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Redefinindo...';
            }

            try {
                if (typeof EduTrackAuth !== 'undefined') {
                    const result = await EduTrackAuth.resetPassword(resetToken, passwordInput.value);
                    if (feedbackAlert) {
                        feedbackAlert.className = 'auth-alert-success';
                        const messageText = (result && result.message) ? result.message : 'Senha redefinida com sucesso!';
                        feedbackAlert.innerHTML = `
                            <i class="fa-solid fa-circle-check"></i>
                            <div style="flex: 1;">
                                <span>${messageText}</span>
                                <div style="margin-top: 12px;">
                                    <a href="${getAuthLoginUrl()}" class="auth-btn-primary full-width" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; border-radius: 8px; padding: 10px 16px; font-weight: 600;">
                                        <i class="fa-solid fa-arrow-right-to-bracket"></i> Ir para o Login
                                    </a>
                                </div>
                            </div>
                        `;
                        feedbackAlert.style.display = 'flex';
                    }
                    if (submitBtn) submitBtn.style.display = 'none';
                    setTimeout(() => {
                        window.location.href = getAuthLoginUrl();
                    }, 2000);
                }
            } catch (err) {
                if (feedbackAlert) {
                    feedbackAlert.className = 'auth-alert-error';
                    feedbackAlert.innerHTML = `
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <span>${err.message || 'Falha ao redefinir senha. O token pode ser inválido ou ter expirado.'}</span>
                    `;
                    feedbackAlert.style.display = 'flex';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-key"></i> Redefinir senha';
                }
            }
        });
    }

    // ==========================================================================
    // 5. Dashboard Guard & User Profile Hydration (auth/me)
    // ==========================================================================
    let currentDashboardUser = null;
    let currentDashboardSubjects = [];
    let currentDashboardTasks = [];

    const isDashboardPage = !!document.getElementById('welcome-user-heading') || !!document.getElementById('user-name-sidebar');
    if (isDashboardPage && typeof EduTrackAuth !== 'undefined') {
        if (!EduTrackAuth.isAuthenticated()) {
            EduTrackAuth.logout(getAuthLoginUrl());
            return;
        }

        try {
            const user = await EduTrackAuth.getMe();
            currentDashboardUser = user;
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

            // Hydrate Settings Page User Profile Details
            const settingsUserName = document.getElementById('settings-user-name');
            if (settingsUserName) {
                const displayName = user.name || user.email || 'Estudante';
                const displayEmail = user.email || 'Não informado';
                settingsUserName.textContent = displayName;
                
                const settingsUserEmail = document.getElementById('settings-user-email');
                if (settingsUserEmail) settingsUserEmail.textContent = displayEmail;

                const settingsAvatarDisplay = document.getElementById('settings-avatar-display');
                const settingsAvatarInitials = document.getElementById('settings-avatar-initials');

                if (settingsAvatarDisplay) {
                    if (user.avatar || user.avatar_url) {
                        const avatarSrc = user.avatar || user.avatar_url;
                        settingsAvatarDisplay.innerHTML = `<img src="${escapeHtml(avatarSrc)}" alt="Foto de perfil">`;
                    } else if (settingsAvatarInitials) {
                        settingsAvatarInitials.textContent = initials;
                    }
                }
            }

            // Hydrate Dashboard Real Data from Xano APIs
            await hydrateDashboardData();

        } catch (err) {
            console.error('Sessão inválida ou expirada:', err);
            EduTrackAuth.logout(getAuthLoginUrl());
        }
    }

    async function hydrateDashboardData() {
        try {
            const subjectsBaseUrl = EduTrackAuth.XANO_SUBJECTS_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:asoARar9';
            const tasksBaseUrl = EduTrackAuth.XANO_TASKS_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls';

            const [subjectsRes, tasksRes] = await Promise.all([
                fetch(`${subjectsBaseUrl}/subjects`, { headers: EduTrackAuth.getAuthHeaders() }),
                fetch(`${tasksBaseUrl}/academic_tasks`, { headers: EduTrackAuth.getAuthHeaders() })
            ]);

            const subjectsData = subjectsRes.ok ? await subjectsRes.json() : [];
            const tasksData = tasksRes.ok ? await tasksRes.json() : [];

            const subjects = Array.isArray(subjectsData) ? subjectsData : [];
            const tasks = Array.isArray(tasksData) ? tasksData : [];

            currentDashboardSubjects = subjects;
            currentDashboardTasks = tasks;

            // 1. Task Progress Calculation
            const completedTasks = tasks.filter(t => t.status === 'completed');
            const pendingTasks = tasks.filter(t => t.status === 'pending');
            const totalTasks = tasks.length;
            const percentage = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

            const progressTextEl = document.getElementById('progress-summary-text');
            if (progressTextEl) {
                progressTextEl.innerHTML = `Você concluiu <strong>${completedTasks.length} de ${totalTasks} tarefas</strong> planejadas.`;
            }

            const progressBarFillEl = document.getElementById('progress-bar-fill');
            if (progressBarFillEl) {
                progressBarFillEl.style.width = `${percentage}%`;
            }

            const statCompletedCountEl = document.getElementById('stat-completed-count');
            if (statCompletedCountEl) {
                statCompletedCountEl.innerHTML = `<strong>${completedTasks.length}</strong> Concluídas`;
            }

            const statPendingCountEl = document.getElementById('stat-pending-count');
            if (statPendingCountEl) {
                statPendingCountEl.innerHTML = `<strong>${pendingTasks.length}</strong> Pendentes`;
            }

            const circleTextEl = document.getElementById('progress-circle-text');
            if (circleTextEl) {
                circleTextEl.textContent = `${percentage}%`;
            }

            const circleFillPathEl = document.getElementById('circle-fill-path');
            if (circleFillPathEl) {
                // Circumference for r=38 is 2 * PI * 38 ≈ 238.76
                const circumference = 238.76;
                const dashOffset = circumference - (circumference * percentage) / 100;
                circleFillPathEl.style.strokeDasharray = `${circumference}`;
                circleFillPathEl.style.strokeDashoffset = `${dashOffset}`;
            }

            // 2. Metrics Cards
            const metricSubjectsEl = document.getElementById('metric-subjects-count');
            if (metricSubjectsEl) {
                metricSubjectsEl.textContent = subjects.length;
            }

            const metricPendingEl = document.getElementById('metric-pending-count');
            if (metricPendingEl) {
                metricPendingEl.textContent = pendingTasks.length;
            }

            // Study time (Tempo de estudo) calculated ONLY for completed tasks with filled spent_time
            const completedSpentMinutesTotal = completedTasks
                .filter(t => t.spent_time !== null && t.spent_time !== undefined && t.spent_time !== '')
                .reduce((sum, t) => sum + (Number(t.spent_time) || 0), 0);
            const metricEstimatedEl = document.getElementById('metric-estimated-time');
            if (metricEstimatedEl) {
                metricEstimatedEl.textContent = formatHoursMinutes(completedSpentMinutesTotal);
            }

            // 3. Study Time per Subject Chart
            const chartContainerEl = document.getElementById('study-chart-container');
            if (chartContainerEl) {
                if (subjects.length === 0) {
                    chartContainerEl.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; padding: 24px; color: var(--text-muted);">
                            <i class="fa-solid fa-book-open" style="font-size: 1.5rem; margin-bottom: 8px; opacity: 0.5;"></i>
                            <p>Nenhuma disciplina cadastrada.</p>
                        </div>
                    `;
                } else {
                    const subjectTimes = subjects.map(s => {
                        const sTasks = completedTasks.filter(t => Number(t.subject_id) === Number(s.id));
                        
                        // 1. Horas estimadas: soma de estimated_time das tarefas concluídas
                        const estimatedMins = sTasks.reduce((sum, t) => sum + (Number(t.estimated_time) || 0), 0);

                        // 2. Tempo de estudo: soma de spent_time quando preenchido; caso contrário usar estimated_time
                        const studyMins = sTasks.reduce((sum, t) => {
                            const hasSpent = t.spent_time !== null && t.spent_time !== undefined && t.spent_time !== '' && !isNaN(Number(t.spent_time));
                            const val = hasSpent ? Number(t.spent_time) : (Number(t.estimated_time) || 0);
                            return sum + val;
                        }, 0);

                        return {
                            id: s.id,
                            name: s.name,
                            estimatedMins,
                            studyMins
                        };
                    });

                    const allValues = subjectTimes.flatMap(st => [st.estimatedMins, st.studyMins]);
                    const maxMins = Math.max(...allValues, 1);

                    chartContainerEl.innerHTML = subjectTimes.map(st => {
                        const fillPercentEst = st.estimatedMins > 0 ? Math.min(Math.max(Math.round((st.estimatedMins / maxMins) * 88), 6), 90) : 0;
                        const fillPercentStudy = st.studyMins > 0 ? Math.min(Math.max(Math.round((st.studyMins / maxMins) * 88), 6), 90) : 0;

                        const labelEst = formatHoursMinutes(st.estimatedMins);
                        const labelStudy = formatHoursMinutes(st.studyMins);

                        return `
                            <div class="chart-bar-group">
                                <div class="dual-bars-wrapper">
                                    <div class="chart-comparative-tooltip">
                                        <div class="tooltip-subject-name">${escapeHtml(st.name)}</div>
                                        <div class="tooltip-series-item">
                                            <span class="tooltip-dot lilac"></span>
                                            <span class="tooltip-series-label">Horas estimadas:</span>
                                            <strong class="tooltip-series-value">${labelEst}</strong>
                                        </div>
                                        <div class="tooltip-series-item">
                                            <span class="tooltip-dot cyan"></span>
                                            <span class="tooltip-series-label">Tempo de estudo:</span>
                                            <strong class="tooltip-series-value">${labelStudy}</strong>
                                        </div>
                                    </div>
                                    <div class="bar-fill lilac" style="height: ${fillPercentEst}%;" aria-label="Horas estimadas: ${labelEst}"></div>
                                    <div class="bar-fill cyan" style="height: ${fillPercentStudy}%;" aria-label="Tempo de estudo: ${labelStudy}"></div>
                                </div>
                                <span class="bar-label" title="${escapeHtml(st.name)}">${escapeHtml(st.name)}</span>
                            </div>
                        `;
                    }).join('');
                }
            }

            // 4. Upcoming Tasks Side Panel
            const upcomingContainerEl = document.getElementById('upcoming-tasks-container');
            if (upcomingContainerEl) {
                // Map subjects for quick name lookup
                const subjectsMap = new Map();
                subjects.forEach(s => subjectsMap.set(Number(s.id), s.name));

                // Sort pending tasks by due_date ascending (closest deadline first)
                const sortedPending = [...pendingTasks].sort((a, b) => {
                    if (!a.due_date) return 1;
                    if (!b.due_date) return -1;
                    return new Date(a.due_date) - new Date(b.due_date);
                });

                const upcomingList = sortedPending.slice(0, 6);

                if (upcomingList.length === 0) {
                    upcomingContainerEl.innerHTML = `
                        <div style="text-align: center; padding: 20px 10px; color: var(--text-muted); font-size: 0.9rem;">
                            <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--accent-cyan);"></i>
                            <p>Nenhuma tarefa pendente!</p>
                        </div>
                    `;
                } else {
                    upcomingContainerEl.innerHTML = upcomingList.map((t, idx) => {
                        const subjectName = subjectsMap.get(Number(t.subject_id)) || 'Geral';
                        const tagClass = idx % 2 === 0 ? 'cyan' : 'lilac';
                        const formattedDate = formatDueDateString(t.due_date);
                        const isCompleted = t.status === 'completed';

                        return `
                            <article class="task-item-card ${isCompleted ? 'completed' : ''}" data-id="${t.id}">
                                <i class="${isCompleted ? 'fa-solid fa-square-check' : 'fa-regular fa-square'} task-status-icon"
                                   style="cursor: pointer; ${isCompleted ? 'color: #53dce3;' : ''}"
                                   title="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluída'}"
                                   onclick="window.toggleDashboardTaskStatus(${t.id}, '${isCompleted ? 'pending' : 'completed'}', this)"></i>
                                <div class="task-details">
                                    <h4 class="task-title" style="${isCompleted ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${escapeHtml(t.title)}</h4>
                                    <div class="task-meta">
                                        <span class="task-date"><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                                        <span class="task-tag ${tagClass}">${escapeHtml(subjectName)}</span>
                                    </div>
                                </div>
                            </article>
                        `;
                    }).join('');
                }
            }

        } catch (err) {
            console.error('Erro ao carregar dados do Dashboard:', err);
        }
    }

    // Interactive Handler for Dashboard Task Completion Checkbox
    window.toggleDashboardTaskStatus = async (taskId, targetStatus, iconEl) => {
        if (!taskId) return;

        if (iconEl) {
            iconEl.style.pointerEvents = 'none';
            iconEl.className = 'fa-solid fa-spinner fa-spin task-status-icon';
        }

        try {
            const tasksBaseUrl = EduTrackAuth.XANO_TASKS_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls';
            const response = await fetch(`${tasksBaseUrl}/academic_tasks/${taskId}`, {
                method: 'PATCH',
                headers: EduTrackAuth.getAuthHeaders(),
                body: JSON.stringify({ status: targetStatus })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || errData.error || 'Erro ao atualizar tarefa no Xano.');
            }

            // Instantly recalculate all Dashboard metrics & UI
            await hydrateDashboardData();
        } catch (err) {
            console.error('Erro ao alternar status da tarefa no Dashboard:', err);
            if (iconEl) {
                iconEl.style.pointerEvents = 'auto';
                iconEl.className = targetStatus === 'completed' ? 'fa-regular fa-square task-status-icon' : 'fa-solid fa-square-check task-status-icon';
            }
        }
    };

    function formatHoursMinutes(totalMinutes) {
        if (!totalMinutes || totalMinutes <= 0) return '0h';
        const hrs = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        if (hrs === 0) return `${mins}min`;
        if (mins === 0) return `${hrs}h`;
        return `${hrs}h ${mins}min`;
    }

    function formatDueDateString(dateString) {
        if (!dateString) return 'Sem data';
        try {
            const parts = String(dateString).split('T')[0].split('-');
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}`;
            }
            const d = new Date(dateString);
            if (isNaN(d.getTime())) return dateString;
            return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        } catch (e) {
            return dateString;
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
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

    // ==========================================================================
    // 7. Academic Report Generation & Download Handler (ReportLab PDF / Xano)
    // ==========================================================================
    const btnDownloadReport = document.getElementById('btn-download-report');
    if (btnDownloadReport && typeof EduTrackAuth !== 'undefined') {
        btnDownloadReport.addEventListener('click', async (e) => {
            e.preventDefault();
            const originalHtml = btnDownloadReport.innerHTML;
            btnDownloadReport.disabled = true;
            btnDownloadReport.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Gerando PDF...</span>';

            try {
                // 1. Obter dados reais e autenticados do estudante, disciplinas e tarefas
                const subjectsBaseUrl = EduTrackAuth.XANO_SUBJECTS_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:asoARar9';
                const tasksBaseUrl = EduTrackAuth.XANO_TASKS_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:8PdLH3Ls';

                const [user, subjectsRes, tasksRes] = await Promise.all([
                    EduTrackAuth.getMe(),
                    fetch(`${subjectsBaseUrl}/subjects`, { headers: EduTrackAuth.getAuthHeaders() }),
                    fetch(`${tasksBaseUrl}/academic_tasks`, { headers: EduTrackAuth.getAuthHeaders() })
                ]);

                const subjectsData = subjectsRes.ok ? await subjectsRes.json() : [];
                const tasksData = tasksRes.ok ? await tasksRes.json() : [];

                const payload = {
                    user: {
                        id: user.id,
                        name: user.name && user.name.trim() !== '' ? user.name : user.email.split('@')[0],
                        email: user.email
                    },
                    subjects: Array.isArray(subjectsData) ? subjectsData : [],
                    tasks: Array.isArray(tasksData) ? tasksData : [],
                    generated_at: new Date().toISOString()
                };

                // 2. Tentar gerar e obter o PDF real a partir do serviço ReportLab (local ou Xano)
                const localPdfUrl = (EduTrackAuth.LOCAL_REPORTS_URL || 'http://127.0.0.1:5001/api') + '/academic_reports/pdf';
                const xanoPdfUrl = (EduTrackAuth.XANO_REPORTS_URL || EduTrackAuth.XANO_BASE_URL) + '/academic_reports/pdf';

                let pdfBlob = null;

                // Tentativa 1: Serviço de geração PDF ReportLab (porta 5001)
                try {
                    const localRes = await fetch(localPdfUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/pdf'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (localRes.ok) {
                        const contentType = localRes.headers.get('content-type') || '';
                        if (contentType.includes('application/pdf')) {
                            const rawBlob = await localRes.blob();
                            pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
                        }
                    }
                } catch (localErr) {
                    // Serviço local indisponível, tentar backend Xano
                }

                // Tentativa 2: Endpoint backend Xano se o serviço local não respondeu
                if (!pdfBlob) {
                    try {
                        const xanoRes = await fetch(xanoPdfUrl, {
                            method: 'POST',
                            headers: {
                                ...EduTrackAuth.getAuthHeaders(),
                                'Accept': 'application/pdf'
                            },
                            body: JSON.stringify(payload)
                        });

                        if (xanoRes.ok) {
                            const contentType = xanoRes.headers.get('content-type') || '';
                            if (contentType.includes('application/pdf')) {
                                const rawBlob = await xanoRes.blob();
                                pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
                            } else {
                                const resJson = await xanoRes.json().catch(() => null);
                                if (resJson && resJson.pdf_base64) {
                                    const byteChars = atob(resJson.pdf_base64);
                                    const byteNums = new Array(byteChars.length);
                                    for (let i = 0; i < byteChars.length; i++) {
                                        byteNums[i] = byteChars.charCodeAt(i);
                                    }
                                    pdfBlob = new Blob([new Uint8Array(byteNums)], { type: 'application/pdf' });
                                }
                            }
                        }
                    } catch (xanoErr) {
                        // Backend Xano não respondeu com PDF
                    }
                }

                // 3. Efetuar download do arquivo .pdf real ou exibir erro claro
                if (pdfBlob && pdfBlob.size > 0) {
                    triggerBrowserDownload(pdfBlob, `edutrack-relatorio-${getDateStamp()}.pdf`);
                    showReportToast('Relatório acadêmico em PDF gerado com sucesso!', 'success');
                } else {
                    console.error('Falha na geração do PDF: nenhum serviço retornou application/pdf válido.');
                    showReportToast('Serviço de geração de PDF indisponível. Inicie o servidor Python (scripts/report_server.py).', 'error');
                }

            } catch (err) {
                console.error('Erro ao gerar relatório acadêmico:', err);
                showReportToast('Falha ao gerar o relatório acadêmico. Verifique suas credenciais.', 'error');
            } finally {
                btnDownloadReport.disabled = false;
                btnDownloadReport.innerHTML = originalHtml;
            }
        });
    }

    function triggerBrowserDownload(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    function getDateStamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function showReportToast(message, type = 'info') {
        const existing = document.getElementById('report-feedback-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'report-feedback-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: ${type === 'error' ? '#ef4444' : 'var(--gradient-primary, #0284c7)'};
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25);
            font-size: 0.88rem;
            font-weight: 600;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        const iconClass = type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check';
        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${escapeHtml(message)}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.4s ease';
                setTimeout(() => {
                    if (toast.parentNode) toast.parentNode.removeChild(toast);
                }, 400);
            }
        }, 4000);
    }

    // ==========================================================================
    // 8. Intelligent Insights Handler (Dashboard IA & Recomendações sob Demanda)
    // ==========================================================================
    const btnGenerateInsights = document.getElementById('btn-generate-insights');
    const btnInsightsRetry = document.getElementById('btn-insights-retry');
    const insightsPlaceholder = document.getElementById('insights-placeholder');
    const insightsResultsGrid = document.getElementById('insights-results-grid');
    const insightsErrorCard = document.getElementById('insights-error-card');
    const insightsEngineBadge = document.getElementById('insights-engine-badge');

    if (btnGenerateInsights) {
        btnGenerateInsights.addEventListener('click', () => handleGenerateInsights());
    }
    if (btnInsightsRetry) {
        btnInsightsRetry.addEventListener('click', () => handleGenerateInsights());
    }

    async function handleGenerateInsights() {
        if (!btnGenerateInsights) return;

        const originalBtnHtml = btnGenerateInsights.innerHTML;
        btnGenerateInsights.disabled = true;
        btnGenerateInsights.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Gerando insights com IA...</span>';

        if (insightsErrorCard) insightsErrorCard.style.display = 'none';

        try {
            // Prepara o payload acadêmico estruturado para o motor de insights
            const payload = {
                user: currentDashboardUser || { id: 1, name: 'Estudante' },
                subjects: currentDashboardSubjects || [],
                tasks: currentDashboardTasks || []
            };

            const localInsightsUrl = (EduTrackAuth.LOCAL_INSIGHTS_URL || 'http://127.0.0.1:5002/api') + '/insights';
            const xanoInsightsUrl = (EduTrackAuth.XANO_INSIGHTS_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:insights') + '/academic_insights';

            let resultData = null;

            // Tentativa 1: Serviço local de insights (porta 5002)
            try {
                const localRes = await fetch(localInsightsUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (localRes.ok) {
                    resultData = await localRes.json();
                }
            } catch (localErr) {
                console.warn('Serviço local de insights não acessível, tentando Xano...', localErr);
            }

            // Tentativa 2: Endpoint no Xano
            if (!resultData && typeof EduTrackAuth !== 'undefined') {
                try {
                    const xanoRes = await fetch(xanoInsightsUrl, {
                        method: 'POST',
                        headers: EduTrackAuth.getAuthHeaders(),
                        body: JSON.stringify(payload)
                    });
                    if (xanoRes.ok) {
                        resultData = await xanoRes.json();
                    }
                } catch (xanoErr) {
                    console.warn('Falha na chamada ao endpoint Xano de insights:', xanoErr);
                }
            }

            if (!resultData || !resultData.insights) {
                throw new Error('Não foi possível obter a análise de insights no momento.');
            }

            // Renderiza os dados recebidos nos cards estruturados
            renderInsightsData(resultData);

            if (insightsPlaceholder) insightsPlaceholder.style.display = 'none';
            if (insightsResultsGrid) insightsResultsGrid.style.display = 'grid';

            btnGenerateInsights.innerHTML = '<i class="fa-solid fa-rotate"></i> <span>Atualizar insights</span>';

        } catch (err) {
            console.error('Erro ao gerar insights inteligentes:', err);
            if (insightsErrorCard) {
                const descEl = document.getElementById('insights-error-desc');
                if (descEl) descEl.textContent = err.message || 'Verifique sua conexão ou se o serviço de insights está ativo e tente novamente.';
                insightsErrorCard.style.display = 'flex';
            }
            btnGenerateInsights.innerHTML = originalBtnHtml;
        } finally {
            btnGenerateInsights.disabled = false;
        }
    }

    function renderInsightsData(data) {
        const insights = data.insights || {};
        const engine = data.ai_engine || {};

        // 1. Badge Indicador de Motor (IA vs Fallback)
        if (insightsEngineBadge) {
            if (engine.status === 'success') {
                insightsEngineBadge.className = 'insights-engine-badge badge-ai';
                insightsEngineBadge.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Gerado com IA</span>';
                insightsEngineBadge.title = 'Análise processada pelo modelo de linguagem Google Gemini';
            } else {
                insightsEngineBadge.className = 'insights-engine-badge badge-fallback';
                insightsEngineBadge.innerHTML = '<i class="fa-solid fa-shield-halved"></i> <span>Regras Heurísticas / Modo Offline</span>';
                insightsEngineBadge.title = 'Análise gerada pelo motor determinístico de contingência';
            }
            insightsEngineBadge.style.display = 'inline-flex';
        }

        // 2. Card 1: Resumo Geral
        const summaryContentEl = document.getElementById('insight-summary-content');
        if (summaryContentEl) {
            summaryContentEl.textContent = insights.resumo_geral || 'Nenhum resumo acadêmico gerado.';
        }

        // 3. Card 2: Diagnósticos por Disciplina
        const diagnosticsListEl = document.getElementById('insight-diagnostics-list');
        if (diagnosticsListEl) {
            const diags = insights.diagnosticos_disciplinas || [];
            if (diags.length === 0) {
                diagnosticsListEl.innerHTML = '<p class="diagnostic-text">Nenhuma disciplina cadastrada para diagnóstico.</p>';
            } else {
                diagnosticsListEl.innerHTML = diags.map(d => {
                    let tagClass = 'sem_dados';
                    let tagLabel = 'Sem Tempo Registrado';

                    const status = (d.status_tempo || '').toLowerCase();
                    if (status === 'subestimado') {
                        tagClass = 'subestimado';
                        tagLabel = 'Tempo Subestimado';
                    } else if (status === 'superestimado') {
                        tagClass = 'superestimado';
                        tagLabel = 'Tempo Superestimado';
                    } else if (status === 'dentro_esperado') {
                        tagClass = 'dentro_esperado';
                        tagLabel = 'Dentro do Esperado';
                    }

                    return `
                        <div class="diagnostic-item">
                            <div class="diagnostic-item-top">
                                <span class="diagnostic-subject-name">${escapeHtml(d.subject_name || 'Disciplina')}</span>
                                <span class="status-tag ${tagClass}">
                                    <i class="fa-solid fa-circle-info"></i> ${tagLabel}
                                </span>
                            </div>
                            <p class="diagnostic-text">${escapeHtml(d.diagnostico || '')}</p>
                        </div>
                    `;
                }).join('');
            }
        }

        // 4. Card 3: Recomendações Práticas
        const recommendationsListEl = document.getElementById('insight-recommendations-list');
        if (recommendationsListEl) {
            const recs = insights.recomendacoes_praticas || [];
            if (recs.length === 0) {
                recommendationsListEl.innerHTML = '<li><i class="fa-solid fa-circle-check"></i> <span>Tudo em dia! Mantenha a consistência em seus estudos.</span></li>';
            } else {
                recommendationsListEl.innerHTML = recs.map(r => `
                    <li>
                        <i class="fa-solid fa-arrow-right"></i>
                        <span>${escapeHtml(r)}</span>
                    </li>
                `).join('');
            }
        }

        // 5. Card 4: Pontos Fortes
        const strengthsListEl = document.getElementById('insight-strengths-list');
        if (strengthsListEl) {
            const strengths = insights.pontos_fortes || [];
            if (strengths.length === 0) {
                strengthsListEl.innerHTML = '<li><i class="fa-solid fa-star"></i> <span>Engajamento contínuo nas atividades acadêmicas.</span></li>';
            } else {
                strengthsListEl.innerHTML = strengths.map(s => `
                    <li>
                        <i class="fa-solid fa-star"></i>
                        <span>${escapeHtml(s)}</span>
                    </li>
                `).join('');
            }
        }
    }

});
