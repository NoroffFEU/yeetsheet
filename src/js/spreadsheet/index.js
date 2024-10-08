import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import numberToLetter from '../helpers/numberToLetter';
import ifValidNumber from '../helpers/ifValidNumber';
import {
  createContextMenuColumn,
  addContextMenuListener,
} from '../helpers/columnRowMenu';

// Create the context menus
const { contextMenu, optionRight, optionLeft, optionDelete } =
  createContextMenuColumn();
addContextMenuListener(contextMenu);

/**
 * Creates a spreadsheet with the specified number of columns and rows.
 *
 * @param {number} cols - The number of columns in the spreadsheet.
 * @param {number} rows - The number of rows in the spreadsheet.
 * @returns {HTMLTableElement} The spreadsheet table element.
 */
export default function spreadsheet(cols, rows) {
  if (!ifValidNumber(cols, rows)) return;

  const container = createEle('table', 'spreadsheet-container');
  const tableHead = createEle('thead');
  const tableBody = createEle('tbody');
  const columnNumbers = createEle('tr', 'flex w-fit');
  const emptyTh = createEle('th', 'w-28');

  columnNumbers.appendChild(emptyTh);

  for (let i = 0; i < cols; i++) {
    const colNumber = createEle(
      'th',
      'w-28 text-center border-x dark:border-ys-overlay-5 border-ys-amethyst-400 dark:bg-ys-overlay-15 bg-white py-2 snap-start',
      numberToLetter(i),
    );

    // Add menu event listener to column header (A, B, C...)
    colNumber.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      const contextMenuRow = document.getElementById('contextMenuRow');
      if (contextMenuRow) {
        contextMenuRow.classList.add('hidden');
      }

      contextMenu.style.left = `${e.pageX}px`;
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.classList.remove('hidden');

      optionRight.onclick = () => {
        console.log(`Insert a column to the right of column ${i + 1}`);
        contextMenu.classList.add('hidden');
      };

      optionLeft.onclick = () => {
        console.log(`Insert a column to the left of column ${i + 1}`);
        contextMenu.classList.add('hidden');
      };

      optionDelete.onclick = () => {
        console.log(`Delete column ${i + 1}`);
        contextMenu.classList.add('hidden');
      };
    });

    columnNumbers.appendChild(colNumber);
  }

  // Create table body rows
  for (let i = 0; i < rows; i++) {
    tableBody.appendChild(cellRow(cols, i));
  }

  container.appendChild(tableHead);
  tableHead.appendChild(columnNumbers);
  container.appendChild(tableBody);

  return container;
}
