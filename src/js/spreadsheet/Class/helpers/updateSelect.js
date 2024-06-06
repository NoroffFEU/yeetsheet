import { setValue } from '../../codeEditor';

const displaySelectId = document.getElementById('selected-cell');
const caller = document.getElementById('function-call-input');

export function updateSelect(id, { allCells, display, selectedCell }) {
  const prevId = selectedCell.id ? selectedCell.id : false;

  // allCells, display, selectedCell
  if (!id) return selectedCell;
  if (prevId === id) return selectedCell;
  selectedCell = allCells.flat().find((cell) => cell.id === id);

  if (prevId) {
    display
      .querySelector('#' + prevId)
      .classList.remove('dark:border-ys-buttonPrimary');
  }
  display &&
    display
      .querySelector('#' + id)
      .classList.add('dark:border-ys-buttonPrimary');
  setValue(selectedCell.code);
  caller.value = selectedCell.callInput;
  displaySelectId.textContent = selectedCell.id;

  return selectedCell;
}
