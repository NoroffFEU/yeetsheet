import createEle from '../helpers/createEle';
import cell from './cell';
import ifValidNumber from '../helpers/ifValidNumber';
import {
  createContextMenuRow,
  addContextMenuListener,
} from '../helpers/columnRowMenu';
import { highlightRow } from './cellHighlight';

// Create the context menu globally
const { contextMenuRow, optionAbove, optionBelow, optionDeleteRow } =
  createContextMenuRow();
addContextMenuListener(contextMenuRow);

/**
 * Creates a table row container with a specified number of cells.
 *
 * This function generates a `tr` element containing the specified number of cells.
 * It also includes a header cell displaying the row number. The row and column
 * indices are validated before the row is created.
 *
 * @function cellRow
 * @param {number} cols - The number of cells in the row.
 * @param {number} row - The row index.
 * @returns {HTMLElement|null} - The created table row element, or null if validation fails.
 */

// creates a cell row container with cols number of cells
export default function cellRow(cols, row) {
  // adds a row number to the row (since it starts at 0)
  const rowIndex = row + 1;

  if (!ifValidNumber(cols, rowIndex)) return;

  const rowContainer = createEle('tr', `row-${row} flex`);

  // Displaying the row number
  const rowNumber = createEle(
    'th',
    'w-28 text-center border-y dark:border-ys-overlay-5 border-ys-amethyst-400 dark:bg-ys-overlay-15 bg-white py-2 flex-none snap-start',
    rowIndex,
  );
  highlightRow(rowNumber);

  // Add menu event listener for the row header
  rowNumber.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const contextMenuColumn = document.getElementById('contextMenuColumn');
    if (contextMenuColumn) {
      contextMenuColumn.classList.add('hidden');
    }

    contextMenuRow.style.left = `${e.pageX}px`;
    contextMenuRow.style.top = `${e.pageY}px`;
    contextMenuRow.classList.remove('hidden');

    // Option for adding a row above
    optionAbove.onclick = () => {
      console.log(`Insert a row above row ${rowIndex}`);
      contextMenuRow.classList.add('hidden');
    };

    // Option for adding a row below
    optionBelow.onclick = () => {
      console.log(`Insert a row below row ${rowIndex}`);
      contextMenuRow.classList.add('hidden');
    };

    // Option for deleting the row
    optionDeleteRow.onclick = () => {
      console.log(`Delete row ${rowIndex}`);
      contextMenuRow.classList.add('hidden');
    };
  });

  rowContainer.appendChild(rowNumber);

  for (let i = 0; i < cols; i++) {
    rowContainer.appendChild(cell(row, i));
  }

  return rowContainer;
}
