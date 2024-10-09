import { showPopup } from './showPopup';

export function rightClickEventListener() {
  const tdElements = document.querySelectorAll('td');

  tdElements.forEach((td) => {
    td.addEventListener('contextmenu', showPopup);
  });
}
