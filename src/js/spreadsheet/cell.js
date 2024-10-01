import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { getCellValue } from './db.js';

/**
 * Creates a table cell element with specified row and column indices.
 *
 * This function generates a `td` element with specific classes and attributes based on the provided
 * row and column. It also retrieves and sets the cell value asynchronously.
 *
 * @function cell
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @returns {HTMLElement} - The created table cell element.
 */

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
  cellContainer.addEventListener('click', () => {
    const cellIdentifierDisplay = document.getElementById(
      'cellIdentifierDisplay',
    );
    if (cellIdentifierDisplay) {
      cellIdentifierDisplay.value = cellId;
    }
  });

  return cellContainer;
}
