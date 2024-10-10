import createEle from '../helpers/createEle';
import cellRow from './cellRow';
import ifValidNumber from '../helpers/ifValidNumber';
// import { newColumn } from './newColumn';
import { renderColumns } from './renderColumns';
import {
  createContextMenuColumn,
  addContextMenuListener,
} from '../helpers/columnRowMenu';

// Create the context menus
const { contextMenu } = createContextMenuColumn();
addContextMenuListener(contextMenu);
/**
 * Creates a spreadsheet with the specified number of columns and rows.
 *
 * @param {number} cols - The number of columns in the spreadsheet.
 * @param {number} rows - The number of rows in the spreadsheet.
 * @returns {HTMLTableElement} The spreadsheet table element.
 */
export default function spreadsheet(cols, rows) {
  if (!ifValidNumber(cols, rows)) return;

  const container = createEle('table', 'spreadsheet-container');
  const tableHead = createEle('thead');
  const tableBody = createEle('tbody');
  const columnNumbers = createEle('tr', 'flex w-fit');
  const emptyTh = createEle('th', 'w-28');

  columnNumbers.appendChild(emptyTh);

  renderColumns(cols, columnNumbers, tableBody);

  // Create table body rows
  for (let i = 0; i < rows; i++) {
    tableBody.appendChild(cellRow(cols, i));
  }

  container.appendChild(tableHead);
  tableHead.appendChild(columnNumbers);
  container.appendChild(tableBody);

  return container;
}
