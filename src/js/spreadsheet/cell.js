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
  const cellContainer = createEle(
    'td',
    'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

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
