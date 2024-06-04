import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
import { getCellValue } from './db.js';

export default function cell(row, col) {
  const cellContainer = createEle(
    'td',
    'p-0.5 w-28 border border-ys-overlay-5 relative flex items-center justify-center',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  const cellId = numberToLetter(col) + (row + 1);
  getCellValue(cellId).then((value) => {
    if (value !== null) {
      cellContainer.textContent = value;
    }
  });

  return cellContainer;
}
