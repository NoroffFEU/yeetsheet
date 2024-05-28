export default function toggleDarkMode() {
  const darkModeToggleBtn = document.querySelector("#darkModeToggleBtn");
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    darkModeToggleBtn.innerText = "DRK"
  }
  darkModeToggleBtn.addEventListener("click", (e) => {
    document.documentElement.classList.toggle("dark");
    if (!document.documentElement.classList.contains("dark")) {
      e.target.innerText = "DRK"
      localStorage.setItem("theme", "light")
    } else {
      e.target.innerText = "LHT"
      localStorage.removeItem("theme")
    }
  })
}

