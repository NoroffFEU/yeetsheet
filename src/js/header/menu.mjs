import closeOnOutsideClick from "../helpers/closeOnOutsideClick.mjs";

export function showDropdownMenu() {
  const menuBtn = document.querySelectorAll("[data-menu]");
  if (menuBtn) {
    menuBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const menuBtn = e.target.dataset.menu;
        const menuDropdown = document.querySelector("#" + menuBtn)
        e.stopPropagation();
        menuDropdown.classList.toggle("hidden");
        closeOnOutsideClick(menuDropdown)
      })
    })
  }
}