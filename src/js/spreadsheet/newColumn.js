import numberToLetter from '../helpers/numberToLetter';
import cell from './cell';
import { renderColumns } from './renderColumns';
import { getCellValue, saveCellValue, saveTableMetadata } from './db';

export async function newColumn(
  position,
  columnIndex,
  columnNumbers,
  tableBody,
) {
  const cols = columnNumbers.children.length;
  const rows = tableBody.children.length;
  const newColIndex = position === 'right' ? columnIndex + 2 : columnIndex + 1;

  // Update column headers
  renderColumns(cols, columnNumbers, tableBody);

  for (let row = 0; row < rows; row++) {
    const rowCells = tableBody.children[row].children;

    // Change the values in IndexedDB before modifying the DOM
    for (let col = rowCells.length - 1; col >= newColIndex - 1; col--) {
      const currentCellId = numberToLetter(col) + (row + 1);

      const newCellId = numberToLetter(col + 1) + (row + 1);
      const cellValue = await getCellValue(currentCellId);

      // Save the cell value to the new cell ID
      if (cellValue) {
        saveCellValue(newCellId, cellValue);
      } else {
        saveCellValue(newCellId, '');
      }
    }
    const newCell = cell(row, newColIndex);
    newCell.textContent = '';

    // Insert the new cell at the correct position
    tableBody.children[row].insertBefore(newCell, rowCells[newColIndex]);
    // Set the new cell's ID and data attributes
    newCell.setAttribute('id', numberToLetter(newColIndex) + (row + 1));
    newCell.dataset.col = newColIndex - 1;
    newCell.dataset.row = row;

    const newCellId = numberToLetter(newColIndex - 1) + (row + 1);
    // Clear the cell content in the UI and the database
    getCellValue(newCellId).then(() => {
      // Clear the cell content in the UI and clear the value in IndexedDB
      newCell.textContent = '';
      saveCellValue(newCellId, '');
    });

    // Update the other cells' ID and dataset attributes
    for (let col = newColIndex; col < rowCells.length; col++) {
      const currentCell = rowCells[col];
      currentCell.setAttribute('id', numberToLetter(col) + (row + 1));
      currentCell.dataset.col = col - 1;
      currentCell.dataset.row = row;
    }
  }
  saveTableMetadata(cols, rows);
}
