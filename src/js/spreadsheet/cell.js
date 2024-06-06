import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
// import { getCellValue } from './db.js';

export default function cell(row, col, cellData = null) {
  const cellContainer = createEle(
    'td',
    'p-0 w-28 border relative flex items-center justify-center dark:border-ys-overlay-5 border-ys-amethyst-400 ',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  if (cellData) {
    cellContainer.textContent = cellData.value;
  }

  return cellContainer;
}
