import createEle from '../helpers/createEle';
import numberToLetter from '../helpers/numberToLetter';

const editor = document.querySelector('#code-editor');
const cellIndex = editor.parentElement.querySelector('h2');

export default function cell(row, col) {
  const cellContainer = createEle(
    'td',
    'p-0  w-28  border relative text-center px-2',
  );
  cellContainer.setAttribute('id', numberToLetter(col) + (row + 1));

  cellContainer.dataset.col = col;
  cellContainer.dataset.row = row;
  // const cellInput = createEle('div', '  focus:bg-red-100');

  // cellContainer.append(cellInput);
  cellContainer.addEventListener('click', (e) => {
    editor.focus();
    cellIndex.textContent = e.target.id;
  });

  return cellContainer;
}

function add(a, b) {
  return a + b;
}

add(3, 5);
