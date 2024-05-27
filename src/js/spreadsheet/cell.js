import createEle from '../helpers/createEle';

export default function cell(col, row) {
  const cellContainer = createEle('div', 'relative');
  const cellInput = createEle(
    'input',
    'w-28 border outline-none focus:bg-red-100',
  );

  cellInput.setAttribute('id', col + '' + row);
  cellContainer.append(cellInput);

  return cellContainer;
}
