// cell.js

import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { getCellValue, getCurrentFileId } from './db.js';

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

let previouslyClickedCell = null;

export default function cell(row, col) {
  const cellContainer = createEle(
    'td',
    'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative flex justify-center items-center',
  );
  const cellId = numberToLetter(col) + (row + 1);
  cellContainer.setAttribute('id', cellId);

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;
  cellContainer.textContent = '';

  const fileId = getCurrentFileId();
  getCellValue(fileId, cellId).then((value) => {
    if (value !== null) {
      // Set the cell value
      if (value.length > 10) {
        // If the value is longer than 10 characters, truncate it and add an ellipsis
        cellContainer.textContent = value.slice(0, 10) + '...';
      } else {
        cellContainer.textContent = value;
      }
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

  // Listen for when the user clicks outside the cell (blur)
  document.addEventListener('click', (event) => {
    if (previouslyClickedCell && event.target !== previouslyClickedCell) {
      restoreEllipsis(previouslyClickedCell); // Restore ellipsis when clicking outside the cell
    }
  });

  return cellContainer; // Return the cell container as-is
}

// Function to restore ellipsis on cell when it loses focus
function restoreEllipsis(cell) {
  const cellId = cell.getAttribute('id');
  const fileId = getCurrentFileId();

  // Fetch the value again and reapply the truncation if necessary
  getCellValue(fileId, cellId).then((value) => {
    if (value !== null) {
      // Truncate the value again if it's longer than 10 characters
      if (value.length > 10) {
        cell.textContent = value.slice(0, 10) + '...';
      } else {
        cell.textContent = value;
      }
    } else {
      cell.textContent = '';
    }
  });
}
