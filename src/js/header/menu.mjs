import closeOnOutsideClick from '../helpers/closeOnOutsideClick.mjs';

/**
 * Shows a dropdown menu when a button with a data-menu attribute is clicked.
 *
 * This function attaches click event listeners to all elements with the data-menu attribute.
 * When a button is clicked, it toggles the visibility of the corresponding dropdown menu by
 * toggling the "hidden" class on the menu element. It also ensures the dropdown menu closes
 * when clicking outside of it by utilizing the closeOnOutsideClick helper function :).
 *
 * @function showDropdownMenu
 * @returns {void}
 */

export function showDropdownMenu() {
  const menuBtns = document.querySelectorAll('[data-menu]');
  if (menuBtns) {
    menuBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const menuBtn = e.target.dataset.menu;
        const menuDropdown = document.querySelector('#' + menuBtn);
        menuBtns.forEach((prevBtn) => {
          const otherBtn = prevBtn.dataset.menu;
          const otherDropdown = document.querySelector('#' + otherBtn);
          if(otherDropdown !== menuDropdown){
            otherDropdown.classList.add("hidden");
          }
        })
        e.stopPropagation();
        menuDropdown.classList.toggle('hidden');
        closeOnOutsideClick(menuDropdown);
      });
    });
  }
}
