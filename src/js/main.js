import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { sheetNavigation } from './spreadsheet/sheetNavigation.js';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';

const spreadsheet1 = document.querySelector('#spreadsheet1');
const spreadsheet2 = document.querySelector('#spreadsheet2');
const spreadsheet3 = document.querySelector('#spreadsheet3');
const spreadsheet4 = document.querySelector('#spreadsheet4');

// indexedDB
initDB()
  .then(() => {
    console.log('IndexedDB initialized');

    // DarkMode
    toggleDarkMode();

    const [cols, rows] = userColsAndRows();

    // Create and append the spreadsheets to the container
    spreadsheet1.append(spreadsheet(cols, rows));
    spreadsheet2.append(spreadsheet(cols, rows));
    spreadsheet3.append(spreadsheet(cols, rows));
    spreadsheet4.append(spreadsheet(cols, rows));

    sheetNavigation();

    addCellTargetingEvents(
      '#spreadsheetContainer table',
      (col, row) => {
        const cellId = numberToLetter(col) + (row + 1);
        // read cell value from IndexedDB
        return getCellValue(cellId).then((value) => value || '');
      },
      (col, row, value) => {
        const cellId = numberToLetter(col) + (row + 1);
        // save cell value to IndexedDB
        saveCellValue(cellId, value);
      },
    );
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });
