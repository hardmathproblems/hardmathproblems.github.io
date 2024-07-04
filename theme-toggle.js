document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('theme-selector');

    const setTheme = (theme) => {
        const themeLink = document.getElementById('theme-style');
        console.log(`Setting theme to: ${theme}`);
        themeLink.href = `/${theme}`; // Set the absolute path to the CSS file
        document.cookie = `theme=${theme}; path=/; max-age=31536000`; // Store theme in a cookie
    };

    const getThemeFromCookie = () => {
        const match = document.cookie.match(/(^| )theme=([^;]+)/);
        return match ? match[2] : 'style.css'; // Default to light theme if no cookie found
    };

    const applyStoredTheme = () => {
        const storedTheme = getThemeFromCookie();
        console.log(`Applying stored theme: ${storedTheme}`);
        setTheme(storedTheme);
        if (themeSelector) {
            themeSelector.value = storedTheme;
        }
    };

    if (themeSelector) {
        themeSelector.addEventListener('change', (event) => {
            const selectedTheme = event.target.value;
            setTheme(selectedTheme);
        });
    }

    applyStoredTheme();
});