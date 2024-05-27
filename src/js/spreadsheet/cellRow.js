import createEle from '../helpers/createEle';
import cell from './cell';

export default function cellRow(cols, row) {
  const rowContainer = createEle('tr', `row-${row} flex`);

  const rowNumber = createEle(
    'div',
    'w-24 text-center border-y border-gray-300 bg-gray-200',
    row + 1,
  );

  rowContainer.appendChild(rowNumber);

  for (let i = 0; i < cols; i++) {
    rowContainer.appendChild(cell(row, i));
  }

  return rowContainer;
}
