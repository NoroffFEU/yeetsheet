const displaySelectId = document.getElementById('selected-cell');
const editor = document.getElementById('code-editor-input');
const caller = document.getElementById('function-call-input');

export function updateSelect(id, { allCells, display, selectedCell }) {
  const prevId = selectedCell?.id;

  // allCells, display, selectedCell
  if (!id) return selectedCell;
  if (prevId === id) return selectedCell;
  selectedCell = allCells.flat().find((cell) => cell.id === id);

  if (prevId) {
    display
      .querySelector('#' + prevId)
      .classList.remove('border-ys-buttonPrimary');
  }
  display &&
    display.querySelector('#' + id).classList.add('border-ys-buttonPrimary');
  editor.value = selectedCell.code;
  caller.value = selectedCell.callInput;
  displaySelectId.textContent = selectedCell.id;

  return selectedCell;
}
