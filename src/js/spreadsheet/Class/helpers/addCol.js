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
  console.log(rows);
  columnPlacement.append(
    createEle(
      'div',
      'w-28 text-center border-x border-ys-backgroundAndText bg-ys-overlay-15 py-2 snap-start',
      numberToLetter(cols),
    ),
  );

  return allCells;
}
