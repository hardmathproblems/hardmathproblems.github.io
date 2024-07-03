document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Page loaded');
    const toggleButton = document.getElementById('theme-toggle-button');
    console.log('Toggle button:', toggleButton);

    const setTheme = (theme) => {
        const themeLink = document.getElementById('theme-style');
        console.log('Setting theme:', theme);
        themeLink.href = theme === 'light-mode' ? '/style.css' : '/dark.css';
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
        toggleButton.textContent = theme === 'light-mode' ? 'Dark Mode' : 'Light Mode';
    };

    const getThemeFromCookie = () => {
        const match = document.cookie.match(/(^| )theme=([^;]+)/);
        return match ? match[2] : 'light-mode'; // Default to light-mode
    };

    const applyStoredTheme = () => {
        const storedTheme = getThemeFromCookie();
        console.log('Stored theme:', storedTheme);
        setTheme(storedTheme);
    };

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const currentTheme = getThemeFromCookie() === 'light-mode' ? 'dark-mode' : 'light-mode';
            setTheme(currentTheme);
        });
    }

    applyStoredTheme();
});
