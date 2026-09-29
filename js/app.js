/**
 * EduTrack AI - Front-End Interactions & Standalone Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
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

    const sidebarUserProfile = document.getElementById('sidebar-user-profile');
    if (sidebarUserProfile) {
        sidebarUserProfile.addEventListener('click', (e) => {
            // Allow native navigation if clicking directly on link/button
        });
    }

    // ==========================================================================
    // 2. Standalone Form Demonstration Interactions
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
});
