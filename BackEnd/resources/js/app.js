
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '../../vendor/masmerise/livewire-toaster/resources/js';
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const header = document.getElementById('header')
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        header.add('light-theme')
        header.remove('dark-theme')
    }
    else{
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');

    }
    toggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main-content");
        const toggleSidebar = document.getElementById("toggle-sidebar");
        const welcomeText = document.getElementById("welcome-text");
        const sidebarTextElements = document.querySelectorAll(".sidebar-text");

        toggleSidebar.addEventListener("click", () => {
            const isCollapsed = sidebar.classList.contains("w-16");

            if (isCollapsed) {
                sidebar.classList.remove("w-16");
                sidebar.classList.add("w-64");
                mainContent.classList.remove("ml-16");
                mainContent.classList.add("ml-64");
                welcomeText.classList.remove("opacity-0", "hidden");
                sidebarTextElements.forEach(el => el.classList.remove("hidden", "opacity-0"));
            } else {
                sidebar.classList.remove("w-64");
                sidebar.classList.add("w-16");
                mainContent.classList.remove("ml-64");
                mainContent.classList.add("ml-16");
                welcomeText.classList.add("opacity-0", "hidden");
                sidebarTextElements.forEach(el => el.classList.add("hidden", "opacity-0"));
            }
        });
});
