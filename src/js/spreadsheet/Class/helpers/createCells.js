import Cell from '../Cell';
import numberToLetter from '../../../helpers/numberToLetter';

export default function createCells(rows, cols, allCells = [], parent) {
  for (let i = 0; i < rows; i++) {
    allCells.push([]);
    for (let j = 0; j < cols; j++) {
      const data = allCells.find((cell) => cell.row === i && cell.col === j);
      allCells[i].push(
        new Cell(
          data
            ? data
            : {
                row: i,
                col: j,
                id: `${numberToLetter(j)}${i + 1}`,
                parent: parent,
              },
        ),
      );
    }
  }
  return allCells;
}
