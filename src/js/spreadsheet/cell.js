import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { /* saveCellValue, */ getCellValue } from './db.js';

export default function cell(row, col) {
  const cellContainer = createEle('td', 'p-0  w-28  border relative');
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;
  // const cellInput = createEle('div', '  focus:bg-red-100');

  // cellContainer.append(cellInput);

  // Sets a stored value in DB to a cell. (Delete this if u want to do it another way zenta)
  const cellId = numberToLetter(col) + (row + 1);
  getCellValue(cellId).then((value) => {
    if (value !== null) {
      cellContainer.textContent = value;
    }
  });

  // cellContainer.addEventListener('click', handleCellClick);

  return cellContainer;
}

//--Click eventlistner for cell --//
// function handleCellClick(event) {
//   const cell = event.target;
//   const cellId = cell.getAttribute('id');
//   const cellValue = prompt('Enter cell value:', cell.textContent);

//   if (cellValue !== null) {
//     cell.textContent = cellValue;
//     saveCellValue(cellId, cellValue);
//   }
// }
