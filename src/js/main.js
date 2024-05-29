import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

const [cols, rows] = userColsAndRows();

spreadsheetContainer.append(spreadsheet(cols, rows));

toggleDarkMode();

addCellTargetingEvents('#spreadsheetContainer table', (col, row, value) => {
  // Here you can put the save function with params for cell contents.
  console.log('save', col, row, value);
});
