export default function showFileMenu() {
  const fileBtn = document.querySelector("#fileBtn");
  const fileMenu = document.querySelector("#fileMenu");
  if (fileBtn) {
    fileBtn.addEventListener("click", () => {
      fileMenu.classList.toggle("hidden");
    })
  }
}