import createEle from '../helpers/createEle';
import cell from './cell';
import ifValidNumber from '../helpers/ifValidNumber';

// creates a cell row container with cols number of cells
export default function cellRow(cols, row) {
  // adds a row number to the row (since it starts at 0)
  const rowIndex = row + 1;

  if (!ifValidNumber(cols, rowIndex)) return;

  const rowContainer = createEle('tr', `row-${row} flex`);

  // Displaying the row number
  const rowNumber = createEle(
    'th',
    'w-28 text-center border-y border-ys-backgroundAndText bg-ys-overlay-15 py-2 flex-none snap-start',
    rowIndex,
  );

  rowContainer.appendChild(rowNumber);

  for (let i = 0; i < cols; i++) {
    rowContainer.appendChild(cell(row, i));
  }

  return rowContainer;
}
