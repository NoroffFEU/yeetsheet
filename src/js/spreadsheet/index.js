import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import numberToLetter from '../helpers/numberToLetter';
import ifValidNumber from '../helpers/ifValidNumber';

/**
 * Creates a spreadsheet with the specified number of columns and rows.
 *
 * @param {number} cols - The number of columns in the spreadsheet.
 * @param {number} rows - The number of rows in the spreadsheet.
 * @returns {HTMLTableElement} The spreadsheet table element.
 */
export default function spreadsheet(cols, rows, data) {
  if (!ifValidNumber(cols, rows)) return;

  const container = createEle('table', 'spreadsheet-container');

  const tableHead = createEle('thead');

  const columnNumbers = createEle('tr', 'flex bg-ys-overlay-15 w-fit');
  columnNumbers.setAttribute('id', 'column-placement');

  const emptyTh = createEle('th', 'w-28');

  container.appendChild(tableHead);

  tableHead.appendChild(columnNumbers);

  columnNumbers.appendChild(emptyTh);

  for (let i = 0; i < cols; i++) {
    const colNumber = createEle(
      'th',
      'w-28 text-center border-x dark:border-ys-overlay-5 border-ys-amethyst-400 dark:bg-ys-overlay-15 bg-white py-2 snap-start',
      numberToLetter(i),
    );
    columnNumbers.appendChild(colNumber);
  }

  const tableBody = createEle('tbody');

  for (let i = 0; i < rows; i++) {
    tableBody.appendChild(cellRow(cols, i));
  }

  container.appendChild(tableBody);

  container.addEventListener('click', (e) => {
    data.sellect = e.target.id;
  });

  return container;
}
