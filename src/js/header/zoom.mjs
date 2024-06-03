export default function showZoomMenu() {
  const zoomBtn = document.querySelector("#zoomBtn");
  const zoomMenu = document.querySelector("#zoomMenu");
  if (zoomBtn) {
    zoomBtn.addEventListener("click", () => {
      zoomMenu.classList.toggle("hidden");
    })
  }
}