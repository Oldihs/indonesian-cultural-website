document.addEventListener('DOMContentLoaded', function () {
    var themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    var body = document.body;

    themeToggleCheckbox.addEventListener('change', function() {
        // Toggle dark mode class on the body
        body.classList.toggle('dark-mode');
    });
});