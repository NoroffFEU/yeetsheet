import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';

export default function cell(row, col) {
  const cellContainer = createEle('td', 'p-0  w-28  border relative');
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;
  // const cellInput = createEle('div', '  focus:bg-red-100');

  // cellContainer.append(cellInput);

  return cellContainer;
}
