import createEle from '../helpers/createEle';

export default function cell(col, row) {
  const cellContainer = createEle('td', 'p-0  w-28  border relative');
  cellContainer.setAttribute('id', col + '' + row);
  // const cellInput = createEle('div', '  focus:bg-red-100');

  // cellContainer.append(cellInput);

  return cellContainer;
}
