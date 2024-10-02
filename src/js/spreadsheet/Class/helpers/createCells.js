import Cell from '../Cell';
import numberToLetter from '../../../helpers/numberToLetter';

export default function createCells(rows, cols, allCells = [], parent) {
  console.log(allCells);
  if (allCells.length > 0) {
    console.log(allCells[0][0]);
    return allCells.map((row, i) =>
      row.map(
        (cell, j) =>
          new Cell({
            ...cell,
            row: i,
            col: j,
            parent: parent,
          }),
      ),
    );
  } else {
    for (let i = 0; i < rows; i++) {
      allCells.push([]);
      for (let j = 0; j < cols; j++) {
        allCells[i].push(
          new Cell({
            row: i,
            col: j,
            id: `${numberToLetter(j)}${i + 1}`,
            parent: parent,
          }),
        );
      }
    }
  }
  return allCells;
}
