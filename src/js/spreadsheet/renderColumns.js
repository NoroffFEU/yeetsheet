import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { newColumn } from './newColumn';
import { deleteColumn } from './deleteColumn';

import {
  createContextMenuColumn,
  addContextMenuListener,
} from '../helpers/columnRowMenu';
const { contextMenu, optionRight, optionLeft, optionDelete } =
  createContextMenuColumn();
addContextMenuListener(contextMenu);

// Function to render column headers and attach context menu event listeners
export function renderColumns(cols, columnNumbers, tableBody) {
  columnNumbers.innerHTML = '';

  // Add the empty corner cell
  const emptyTh = createEle('th', 'w-28');
  columnNumbers.appendChild(emptyTh);

  for (let i = 0; i < cols; i++) {
    const colNumber = createEle(
      'th',
      'w-28 text-center border-x dark:border-ys-overlay-5 border-ys-amethyst-400 dark:bg-ys-overlay-15 bg-white py-2 snap-start',
      numberToLetter(i),
    );
    columnNumbers.appendChild(colNumber);

    // Menu event listener to each column header (A, B, C...)
    colNumber.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      console.log(i + 1);

      // Hide any other context menus
      const contextMenuRow = document.getElementById('contextMenuRow');
      if (contextMenuRow) {
        contextMenuRow.classList.add('hidden');
      }

      // Position and show the column context menu
      contextMenu.style.left = `${e.pageX}px`;
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.classList.remove('hidden');

      // Add event listener for inserting a column to the right
      optionRight.onclick = () => {
        console.log(`Insert a column to the right of column ${i + 1}`);
        newColumn('right', i, columnNumbers, tableBody);
        contextMenu.classList.add('hidden');
      };

      // Add event listener for inserting a column to the left
      optionLeft.onclick = () => {
        console.log(`Insert a column to the left of column ${i + 1}`);
        newColumn('left', i, columnNumbers, tableBody);
        contextMenu.classList.add('hidden');
      };

      // Add event listener for deleting a column
      optionDelete.onclick = () => {
        console.log(`Delete column ${i + 1}`);
        deleteColumn(i + 1, columnNumbers, tableBody);
        contextMenu.classList.add('hidden');
      };
    });
  }
}
