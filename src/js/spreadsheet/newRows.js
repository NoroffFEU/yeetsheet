import {
  saveCellValue,
  saveTableMetadata,
  getTableMetadata,
  getCellValue,
} from './db';
import numberToLetter from '../helpers/numberToLetter';
import cellRow from './cellRow';

/**
 * Adds a new row to the table body at the specified position, ensures it's cleared, and updates row headers.
 *
 * @param {number} cols - The number of columns in the spreadsheet.
 * @param {HTMLElement} tableBody - The table body element where rows will be appended.
 * @param {number} rowIndex - The index at which the new row will be inserted.
 */
export async function newRows(position, cols, tableBody, rowIndex) {
  const insertBeforeIndex = position === 'above' ? rowIndex : rowIndex + 1;

  const newRow = cellRow(cols, rowIndex);

  // Insert the new row at the correct position
  if (insertBeforeIndex < tableBody.rows.length) {
    tableBody.insertBefore(newRow, tableBody.rows[insertBeforeIndex]);
  } else {
    tableBody.appendChild(newRow);
  }

  // Clear the contents of the new row cells
  clearRowCells(newRow);

  // Update row headers for all rows below the new row
  updateRowHeaders(tableBody, insertBeforeIndex);

  // Update the table metadata (rows and columns)
  const metadata = await getTableMetadata();
  const newRowCount = (metadata.rows || 0) + 1;
  await saveTableMetadata(cols, newRowCount);
}

function clearRowCells(row, rowIndex) {
  const cells = row.querySelectorAll('td'); // Assuming cells are <td> elements
  cells.forEach((cell, colIndex) => {
    const cellId = `${numberToLetter(colIndex)}${rowIndex + 1}`; // Generate cell ID (e.g., "A1", "B2")

    // Clear the cell content in the UI
    cell.textContent = '';

    // Clear the cell value in the database
    getCellValue(cellId)
      .then(() => {
        saveCellValue(cellId, ''); // Save empty value to IndexedDB
      })
      .catch((error) => {
        console.error(`Error clearing value for cell ${cellId}:`, error);
      });
  });
}

function updateRowHeaders(tableBody, startIndex) {
  for (let i = startIndex; i < tableBody.rows.length; i++) {
    const rowHeader = tableBody.rows[i].querySelector('th');
    if (rowHeader) {
      rowHeader.textContent = i + 1;
    }
  }
}
