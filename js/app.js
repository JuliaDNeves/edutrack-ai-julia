/**
 * EduTrack AI - Dashboard Front-End Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar / Bottom Navbar Item Active State
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
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

    // 3. User Quick Profile Touch / Click Visual Toggle
    const sidebarUserProfile = document.getElementById('sidebar-user-profile');
    if (sidebarUserProfile) {
        sidebarUserProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebarUserProfile.classList.toggle('active-account-toggle');
        });

        document.addEventListener('click', () => {
            sidebarUserProfile.classList.remove('active-account-toggle');
        });
    }
});
