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

            // Estimated time calculated ONLY for completed tasks
            const completedMinutesTotal = completedTasks.reduce((sum, t) => sum + (Number(t.estimated_time) || 0), 0);
            const metricEstimatedEl = document.getElementById('metric-estimated-time');
            if (metricEstimatedEl) {
                metricEstimatedEl.textContent = formatHoursMinutes(completedMinutesTotal);
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
                        const totalMins = sTasks.reduce((sum, t) => sum + (Number(t.estimated_time) || 0), 0);
                        return {
                            id: s.id,
                            name: s.name,
                            minutes: totalMins,
                            hours: totalMins / 60
                        };
                    });

                    const maxHours = Math.max(...subjectTimes.map(st => st.hours), 1);

                    chartContainerEl.innerHTML = subjectTimes.map((st, idx) => {
                        const fillPercent = st.hours > 0 ? Math.min(Math.max(Math.round((st.hours / maxHours) * 90), 15), 90) : 0;
                        const colorClass = idx % 2 === 0 ? 'cyan' : 'lilac';
                        const labelHours = formatHoursMinutes(st.minutes);

                        return `
                            <div class="chart-bar-group">
                                <div class="bar-wrapper">
                                    <span class="bar-tooltip">${labelHours}</span>
                                    <div class="bar-fill ${colorClass}" style="height: ${fillPercent}%;"></div>
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

                        return `
                            <article class="task-item-card">
                                <i class="fa-regular fa-square task-status-icon"></i>
                                <div class="task-details">
                                    <h4 class="task-title">${escapeHtml(t.title)}</h4>
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

});
