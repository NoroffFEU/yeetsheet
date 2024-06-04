import numberToLetter from '../../../helpers/numberToLetter';
import Cell from '../Cell';
import cell from '../../cell';
import createEle from '../../../helpers/createEle';

export default function addCol(rows, cols, allCells) {
  for (let i = 0; i < rows; i++) {
    allCells[i].push(
      new Cell({
        row: i,
        col: cols,
        id: `${numberToLetter(cols)}${i + 1}`,
      }),
    );

    const currentRow = document.querySelector(`.row-${i}`);
    currentRow.appendChild(cell(i, cols));
  }

  const columnPlacement = document.getElementById('column-placement');

  columnPlacement.append(
    createEle(
      'div',
      'w-28 text-center border-x border-gray-300 bg-gray-200 py-2',
      numberToLetter(cols),
    ),
  );

  return allCells;
}
