import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import numberToLetter from '../helpers/numberToLetter';
import ifValidNumber from '../helpers/ifValidNumber';

const number = numberToLetter(0);
console.log(number);

/**
 * Creates a spreadsheet with the specified number of columns and rows.
 *
 * @param {number} cols - The number of columns in the spreadsheet.
 * @param {number} rows - The number of rows in the spreadsheet.
 * @returns {HTMLTableElement} The spreadsheet table element.
 */
export default function spreadsheet(cols, rows) {
  if (!ifValidNumber(cols, rows)) return;

  const container = createEle('table', 'spreadsheet-container ');

  const columnNumbers = createEle('div', 'flex pl-24 bg-gray-200 w-fit');

  container.appendChild(columnNumbers);

  for (let i = 0; i < cols; i++) {
    const colNumber = createEle(
      'div',

      'w-28 text-center border-x border-gray-300 bg-gray-200 py-2',
      numberToLetter(i),
    );
    columnNumbers.appendChild(colNumber);
  }
  for (let i = 0; i < rows; i++) {
    container.appendChild(cellRow(cols, i));
  }

  return container;
}
