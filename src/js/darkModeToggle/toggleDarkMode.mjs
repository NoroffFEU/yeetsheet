/**
 * Toggles the dark mode for the website.
 *
 * This function checks the current theme from local storage and sets the initial state of dark mode accordingly.
 * It then adds a click event listener to both dark mode buttons for small and large screens.
 * The button's text content and the local storage theme value are updated based on the mode.
 *
 * @function toggleDarkMode
 * @returns {void}
 */
export default function toggleDarkMode() {
  const darkModeToggleBtns = document.querySelectorAll("#darkModeToggleBtn, #darkModeToggleBtnMobile");
  const darkModeToggleText = document.querySelectorAll(".toggle-text");

  function setDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      darkModeToggleText.forEach(text => text.innerText = "Dark on");
      darkModeToggleBtns.forEach(btn => btn.classList.remove("light"));
      localStorage.removeItem("theme");
    } else {
      document.documentElement.classList.remove("dark");
      darkModeToggleText.forEach(text => text.innerText = "Dark off");
      darkModeToggleBtns.forEach(btn => btn.classList.add("light"));
      localStorage.setItem("theme", "light");
    }
  }

  // Set initial state based on local storage
  const theme = localStorage.getItem("theme");
  setDarkMode(theme !== "light");

  // Add event listeners for both buttons
  darkModeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDarkMode = !document.documentElement.classList.contains("dark");
      setDarkMode(isDarkMode);
    });
  });
}

