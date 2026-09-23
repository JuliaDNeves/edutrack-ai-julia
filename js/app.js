/**
 * EduTrack AI - Dashboard Front-End Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Navigation Switcher Visual Feedback
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 2. Interactive Task Checkboxes Visual Toggle
    const taskIcons = document.querySelectorAll('.task-status-icon');

    taskIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.classList.contains('fa-square')) {
                icon.classList.remove('fa-square', 'fa-regular');
                icon.classList.add('fa-solid', 'fa-square-check');
                icon.style.color = '#53dce3';
                const taskTitle = icon.nextElementSibling.querySelector('.task-title');
                if (taskTitle) {
                    taskTitle.style.textDecoration = 'line-through';
                    taskTitle.style.opacity = '0.6';
                }
            } else {
                icon.classList.remove('fa-solid', 'fa-square-check');
                icon.classList.add('fa-regular', 'fa-square');
                icon.style.color = '';
                const taskTitle = icon.nextElementSibling.querySelector('.task-title');
                if (taskTitle) {
                    taskTitle.style.textDecoration = 'none';
                    taskTitle.style.opacity = '1';
                }
            }
        });
    });

    // 3. Notification Button Click Visual Effect
    const notificationBtn = document.getElementById('notifications-btn');
    const notificationBadge = document.querySelector('.notification-badge');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            if (notificationBadge) {
                notificationBadge.style.display = notificationBadge.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
});
