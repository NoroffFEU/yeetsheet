import numberToLetter from '../helpers/numberToLetter';
import {
  getCellValue,
  saveCellValue,
  deleteCellValue,
  saveTableMetadata,
} from './db';
import { renderColumns } from './renderColumns';

export async function deleteColumn(columnIndex, columnNumbers, tableBody) {
  const cols = columnNumbers.children.length;
  const rows = tableBody.children.length;

  for (let row = 0; row < rows; row++) {
    const rowCells = tableBody.children[row].children;

    // Get the ID of the cell to be deleted
    const deleteCellId = numberToLetter(columnIndex) + (row + 1);

    // Delete the value from IndexedDB and remove the cell from the DOM
    await deleteCellValue(deleteCellId);
    rowCells[columnIndex].remove();

    for (let col = columnIndex; col < rowCells.length; col++) {
      const currentCell = rowCells[col];
      const currentCellId = numberToLetter(col + 1) + (row + 1);
      const newCellId = numberToLetter(col) + (row + 1);

      const cellValue = await getCellValue(currentCellId);
      saveCellValue(newCellId, cellValue || '');

      // Update the DOM: change the ID and data attributes for remaining cells
      currentCell.setAttribute('id', newCellId);
      currentCell.dataset.col = col - 1;
      currentCell.dataset.row = row;

      await deleteCellValue(currentCellId);
    }
  }
  columnNumbers.children[columnIndex].remove();

  // Update the column headers and save cols, rows after the deletion
  renderColumns(cols - 2, columnNumbers, tableBody);
  saveTableMetadata(cols - 2, rows);
}
