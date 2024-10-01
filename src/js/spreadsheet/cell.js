import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { getCellValue } from './db.js';

export default function cell(row, col) {
  const activeSheetId = document.querySelector(
    '.spreadsheet-content:not(.hidden)',
  ).id;

  // Create unique cell ID by combining the sheet ID with the column and row (e.g., 'spreadsheet1-A1')
  const cellId = `${activeSheetId}-${numberToLetter(col)}${row + 1}`;

  const cellContainer = createEle('td', 'p-0 w-28 border relative');
  cellContainer.setAttribute('id', cellId);

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  getCellValue(cellId).then((value) => {
    if (value !== null) {
      cellContainer.textContent = value;
    }
  });

  return cellContainer;
}
