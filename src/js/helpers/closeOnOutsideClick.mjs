/**
 * Closes the specified element when clicking outside of it.
 *
 * This function adds a click event listener to the document that checks if the click target is outside
 * the specified element. If so, it hides the element by adding the "hidden" class and removes the event listener.
 *
 * @function closeOnOutsideClick
 * @param {HTMLElement} ele - The element to be closed when clicking outside of it.
 * @returns {void}
 *
 *  * @example
 * // HTML:
 * // <button id="menuBtn" data-menu="dropdownMenu">Toggle Dropdown</button>
 * // <div id="dropdownMenu" class="dropdown hidden">This is a dropdown menu.</div>
 *
 * // JavaScript:
 * import closeOnOutsideClick from './closeOnOutsideClick.mjs';
 *
 * document.getElementById('menuBtn').addEventListener('click', (e) => {
 *   const menuDropdown = document.getElementById('dropdownMenu');
 *   menuDropdown.classList.toggle('hidden');
 *   closeOnOutsideClick(menuDropdown);
 * });
 */

export default function closeOnOutsideClick(ele) {
  const clickOutside = document.addEventListener('click', (e) => {
    if (ele.contains(e.target)) return;
    ele.classList.add('hidden');
    document.removeEventListener('click', clickOutside);
  });
}
