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
  const darkModeToggleBtn = document.querySelector("#darkModeToggleBtn");
  const darkModeToggleText = document.querySelector(".toggle-text");

  // Error handling if elements are missing
  if (!darkModeToggleText) throw new Error('Toggle Text (.toggle-text) not found.');
  if (!darkModeToggleBtn ) {   
    throw new Error('Dark Mode Toggle Button (#darkModeToggleBtn) not found.')
  }
  else {
    // if elements are available, then use this code
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      darkModeToggleText.innerText = "Dark off"
      darkModeToggleBtn.classList.add("light");
    }
    darkModeToggleBtn.addEventListener("click", (e) => {
      document.documentElement.classList.toggle("dark");
      if (!document.documentElement.classList.contains("dark")) {
        e.target.classList.add("light");
        darkModeToggleText.innerText = "Dark off"
        localStorage.setItem("theme", "light")
      } else {
        e.target.classList.remove("light");
        darkModeToggleText.innerText = "Dark on"
        localStorage.removeItem("theme")
      }
    });
  }
}
