document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Retrieve the saved theme from localStorage
    let savedTheme = localStorage.getItem('theme');

    // Apply saved theme or default to light mode
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        savedTheme = 'light-mode'; // Set default
    }

    updateToggleButtonText(themeToggle, savedTheme);

    // Toggle theme when the button is clicked
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode'); // Toggle class
        const newTheme = isDarkMode ? 'dark-mode' : 'light-mode';

        localStorage.setItem('theme', newTheme);
        updateToggleButtonText(themeToggle, newTheme);
    });

    // Function to update button text based on the theme
    function updateToggleButtonText(button, theme) {
        button.textContent = theme === 'dark-mode' ? '🌞' : '🌙';
    }
});
