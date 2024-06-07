/**
 * Toggles the active state of console buttons.
 *
 * This function adds click event listeners to all elements with the class 'console-btn'.
 * When a button is clicked, it removes the 'active' class from all buttons and adds it to the clicked button.
 *
 * @function consoleBtnsActiveState
 * @returns {void}
 */
export default function consoleBtnsActiveState() {
  const btns = document.querySelectorAll('.console-btn');
  if (btns) {
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.remove('active');
          e.target.classList.add('active');
        }
      });
    });
  }
}
