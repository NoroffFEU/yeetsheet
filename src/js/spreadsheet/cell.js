import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
// import { getCellValue } from './db.js';

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
export default function cell(row, col, cellData = null) {
  const cellContainer = createEle(
    'td',
    'p-0 w-28 border relative flex items-center justify-center dark:border-ys-overlay-5 border-ys-amethyst-400 ',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));
  cellContainer.setAttribute('tabindex', 0);

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  // data[row][col]?.value && (cellContainer.textContent = data[row][col].value);
  if (row === 0 && col === 0) {
    console.log(cellData);
  }

  if (cellData) {
    cellContainer.textContent = cellData.value ? cellData.value : '';
  }

  // const cellId = numberToLetter(col) + (row + 1);
  // getCellValue(cellId).then((value) => {
  //   if (value !== null) {
  //     cellContainer.textContent = value;
  //   }
  // });

  return cellContainer;
}
