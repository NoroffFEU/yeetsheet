import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import numberToLetter from '../helpers/numberToLetter';
const number = numberToLetter(0);
console.log(number);

export default function spreadsheet(cols, rows) {
  const container = createEle('table', 'spreadsheet-container ');

  const columnNumbers = createEle('div', 'flex pl-24 bg-gray-200 w-fit');

  for (let i = 0; i < cols; i++) {
    const colNumber = createEle(
      'div',
      'w-28 text-center border-x border-gray-300 bg-gray-200',
      numberToLetter(i),
    );
    columnNumbers.appendChild(colNumber);
  }
  container.appendChild(columnNumbers);

  for (let i = 0; i < rows; i++) {
    container.append(cellRow(cols, i));
  }

  document.querySelector('#spreadsheetContainer').append(container);
}
