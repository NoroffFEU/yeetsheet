import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { getCellValue } from './db.js';

export default function cell(row, col) {
  const activeSheetId = document.querySelector(
    '.spreadsheet-content:not(.hidden)',
  ).id;
  const cellContainer = createEle('td', 'p-0 w-28 border relative');
  cellContainer.setAttribute(
    'id',
    `${activeSheetId}-${numberToLetter(col)}${row + 1}`,
  );

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  const cellId = numberToLetter(col) + (row + 1);
  getCellValue(cellId).then((value) => {
    if (value !== null) {
      cellContainer.textContent = value;
    }
  });

  return cellContainer;
}
