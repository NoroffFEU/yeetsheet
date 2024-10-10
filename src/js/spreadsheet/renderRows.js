import {
  addContextMenuListener,
  createContextMenuRow,
} from '../helpers/columnRowMenu';
import createEle from '../helpers/createEle';
import { highlightRow } from './cellHighlight';
import { newRows } from './newRows';

// Create the context menu globally
const { contextMenuRow, optionAbove, optionBelow, optionDeleteRow } =
  createContextMenuRow();
addContextMenuListener(contextMenuRow);

export function renderRows(rowIndex, rowContainer, row, cols) {
  // Displaying the row number
  const rowNumber = createEle(
    'th',
    'w-28 text-center border-y dark:border-ys-overlay-5 border-ys-amethyst-400 dark:bg-ys-overlay-15 bg-white py-2 flex-none snap-start',
    rowIndex,
  );
  highlightRow(rowNumber);

  rowContainer.appendChild(rowNumber, row);

  // Add menu event listener for the row header
  rowNumber.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log(rowIndex);

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
      newRows('above', cols, rowContainer.parentElement, row); // Pass current row index
      contextMenuRow.classList.add('hidden');
    };

    // Option for adding a row below
    optionBelow.onclick = () => {
      console.log(`Insert a row below row ${rowIndex}`);
      //   const currentRowCount = rowContainer.parentElement.rows.length;
      newRows('below', cols, rowContainer.parentElement, row + 1);
      contextMenuRow.classList.add('hidden');
    };

    // Option for deleting the row
    optionDeleteRow.onclick = () => {
      console.log(`Delete row ${rowIndex}`);
      contextMenuRow.classList.add('hidden');
    };
  });
}
