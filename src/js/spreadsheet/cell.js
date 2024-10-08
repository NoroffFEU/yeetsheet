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
// Store the reference to the previously clicked cell
let previouslyClickedCell = null;

export default function cell(row, col) {
  const cellContainer = createEle(
    'td',
    'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative flex justify-center items-center',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  const cellId = numberToLetter(col) + (row + 1);
  getCellValue(cellId).then((value) => {
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

  // Add event listener to handle click
  cellContainer.addEventListener('click', () => {
    handleCellClick(cellContainer, cellId);
  });

  // Listen for when the user clicks outside the cell (blur)
  document.addEventListener('click', (event) => {
    if (previouslyClickedCell && event.target !== previouslyClickedCell) {
      restoreEllipsis(previouslyClickedCell); // Restore ellipsis when clicking outside the cell
    }
  });

  return cellContainer; // Return the cell container as-is
}

/**
 *
 * @param {*} cell
 * @param {*} cellId
 * this function is used to handle the click event on the cell, it will remove the pink border from the previously clicked cell and add the pink border to the currently
 */

// Function to handle cell click
function handleCellClick(cell, cellId) {
  // Check if there was a previously clicked cell, and restore its ellipsis
  if (previouslyClickedCell && previouslyClickedCell !== cell) {
    restoreEllipsis(previouslyClickedCell); // Restore the ellipsis on the previous cell
    previouslyClickedCell.classList.remove(
      'border-ys-pink-500',
      'dark:border-ys-pink-500',
    );
    previouslyClickedCell.classList.add(
      'border-ys-amethyst-400',
      'dark:border-ys-overlay-5',
    );
  }

  // Add pink border to the currently clicked cell
  cell.classList.remove('border-ys-amethyst-400', 'dark:border-ys-overlay-5');
  cell.classList.add('border-ys-pink-500', 'dark:border-ys-pink-500');

  // Update the display of the selected cell ID
  const cellIdentifierDisplay = document.getElementById(
    'cellIdentifierDisplay',
  );
  if (cellIdentifierDisplay) {
    cellIdentifierDisplay.value = cellId;
  }

  // Update the reference to the currently clicked cell
  previouslyClickedCell = cell;
}

// Function to restore ellipsis on cell when it loses focus
function restoreEllipsis(cell) {
  const cellId = cell.getAttribute('id');

  // Fetch the value again and reapply the truncation if necessary
  getCellValue(cellId).then((value) => {
    if (value !== null) {
      // Truncate the value again if it's longer than 10 characters
      if (value.length > 10) {
        cell.textContent = value.slice(0, 10) + '...';
      } else {
        cell.textContent = value;
      }
    }
  });
}
