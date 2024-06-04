// addRow.js
import Cell from '../Cell';
import numberToLetter from '../../../helpers/numberToLetter';
import cellRow from '../../cellRow';

export default function addRow(cols, row) {
  // function to add a row to the spreadsheet

  const newRow = [];

  for (let i = 0; i < cols; i++) {
    newRow.push(
      new Cell({
        row: row,
        col: i,
        id: `${numberToLetter(i)}${row + 1}`,
      }),
    );
  }
  const spreadSheetContainer = document.querySelector('.spreadsheet-container');

  // checks first if there is a spreadsheet container to append to (incase of readOnlyMode in future)
  spreadSheetContainer && spreadSheetContainer.appendChild(cellRow(cols, row));

  // Returns the new row of cells for the allCells array
  return newRow;
}
