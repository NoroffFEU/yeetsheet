import { setValue } from '../../codeEditor';

const displaySelectId = document.getElementById('selected-cell');
const caller = document.getElementById('function-call-input');

export function updateSelect(id, { allCells, display, selectedCell }) {
  const prevId = selectedCell ? selectedCell.id : false;

  // allCells, display, selectedCell
  if (!id) return selectedCell;
  if (prevId === id) return selectedCell;
  selectedCell = allCells.flat().find((cell) => cell.id === id);

  if (prevId) {
    const prevCell = display.querySelector('#' + prevId);
    prevCell.classList.remove('dark:border-ys-buttonPrimary');
    prevCell.classList.add('dark:border-ys-overlay-5');
  }
  const displayCell = display.querySelector('#' + id);
  if (displayCell) {
    displayCell.classList.add('dark:border-ys-buttonPrimary');
    displayCell.classList.remove('dark:border-ys-overlay-5');
  }
  setValue(selectedCell.code);
  caller.value = selectedCell.callInput;
  displaySelectId.textContent = selectedCell.id;

  return selectedCell;
}
