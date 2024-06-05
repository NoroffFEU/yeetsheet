import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';
// import { getCellValue } from './db.js';

export default function cell(row, col, cellData = null) {
  const cellContainer = createEle(
    'td',
    'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;

  // data[row][col]?.value && (cellContainer.textContent = data[row][col].value);
  if (row === 0 && col === 0) {
    console.log(cellData);
  }

  if (cellData) {
    cellContainer.textContent = cellData?.value;
  }

  // const cellId = numberToLetter(col) + (row + 1);
  // getCellValue(cellId).then((value) => {
  //   if (value !== null) {
  //     cellContainer.textContent = value;
  //   }
  // });

  return cellContainer;
}
