/**
 * Callback on cell focus. Can be used to set the cell value.
 *
 * @callback OnFocusCellCallback
 * @param {number} col - The column index.
 * @param {number} row - The row index.
 * @return {string} value - The cell value content.
 */

// import { setValue } from './codeEditor';

/**
 * Callback on cell blur. Can be used to save the cell value.
 *
 * @callback OnBlurCellCallback
 * @param {number} col - The column index.
 * @param {number} row - The row index.
 */

/**
 * @description Add events to handle cell navigation.
 * @param {string} tableSelector
 * @param {OnFocusCellCallback} onFocusCellCallback Callback function to handle the load cell content on `focus` event. It sends col, row and expects back the text that should be used.
 * @param {OnBlurCellCallback} onBlurCellCallback Callback function to handle the save cell content on `blur`event. It sends col, row and value params.
 */
export function addCellTargetingEvents(
  tableSelector,
  onFocusCellCallback,
  onBlurCellCallback,
) {
  const table = document.querySelector(tableSelector);

  table.addEventListener(
    'click',
    (ev) => {
      const td = ev.target;

      const col = parseInt(td.dataset.col, 10);
      const row = parseInt(td.dataset.row, 10);

      if (isNaN(col) || isNaN(row)) {
        return;
      }

      td.focus();
      ev.preventDefault();

      // Use the onFocusCellCallback and handle the promise
      const focusResult = onFocusCellCallback && onFocusCellCallback(col, row);
      if (focusResult !== undefined) {
        // console.log({ focusResult });
        // focusResult.then((value) => {
        //   setValue(value);
        // });
      }
    },
    false,
  );

  table.addEventListener(
    'blur',
    (ev) => {
      ev.preventDefault();

      console.log('keydown', ev);
      const td = ev.target;

      const col = parseInt(td.dataset.col, 10);
      const row = parseInt(td.dataset.row, 10);

      onBlurCellCallback && onBlurCellCallback(col, row);
    },
    false,
  );

  table.addEventListener(
    'keydown',
    (ev) => {
      console.log('keydown', ev);
      const td = ev.target;
      const col = parseInt(td.dataset.col, 10);
      const row = parseInt(td.dataset.row, 10);

      let handled = false;

      if (ev.key === 'ArrowRight') {
        handled = true;
        selectNextCell(col + 1, row);
      } else if (ev.key === 'ArrowLeft') {
        handled = true;
        selectNextCell(col - 1, row);
      } else if (ev.key === 'ArrowDown') {
        handled = true;
        selectNextCell(col, row + 1);
      } else if (ev.key === 'ArrowUp') {
        handled = true;
        selectNextCell(col, row - 1);
      } else if (ev.key === 'Tab' && ev.shiftKey === true) {
        // left
        handled = true;
        selectNextCell(col - 1, row);
      } else if (ev.key === 'Tab' && ev.shiftKey === false) {
        // right
        handled = true;
        selectNextCell(col + 1, row);
      } else if (ev.key === 'Enter') {
        handled = true;
        selectNextCell(col, row + 1);
      }

      if (handled) {
        ev.preventDefault();
      }
    },
    false,
  );
}

/**
 * @description Find the cell and click on it to give the focus.
 * @method selectNextCell
 * @param {number} col  The col index.
 * @param {number} row  The row index.
 * */
function selectNextCell(col, row) {
  // handle the min col and row
  if (row < 0) {
    row = 0;
  }

  if (col < 0) {
    col = 0;
  }

  //handle max col and row
  const maxCol = document.querySelectorAll('[data-row="0"]').length - 1;
  const maxRow = document.querySelectorAll('[data-col="0"]').length - 1;

  if (col > maxCol) {
    col = maxCol;
  }

  if (row > maxRow) {
    row = maxRow;
  }

  const td = document.querySelector(`td[data-col="${col}"][data-row="${row}"]`);
  if (td) {
    td.click();
  }
}
