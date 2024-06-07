/**
 * Toggles the dark mode for the website.
 *
 * This function checks the current theme from local storage and sets the initial state of dark mode accordingly.
 * It then adds a click event listener to the button with the ID "darkModeToggleBtn" to toggle the dark mode class on the
 * document's root element. The button's text content and the local storage theme value are updated based on the mode.
 *
 * @function toggleDarkMode
 * @returns {void}
 */
export default function toggleDarkMode() {
  const darkModeToggleBtn = document.querySelector('#darkModeToggleBtn');
  if (darkModeToggleBtn) {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      darkModeToggleBtn.innerText = 'DRK';
    }
    darkModeToggleBtn.addEventListener('click', (e) => {
      document.documentElement.classList.toggle('dark');
      if (!document.documentElement.classList.contains('dark')) {
        e.target.innerText = 'DRK';
        localStorage.setItem('theme', 'light');
      } else {
        e.target.innerText = 'LHT';
        localStorage.removeItem('theme');
      }
    });
  }
}
