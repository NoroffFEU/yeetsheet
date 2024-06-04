import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { showDropdownMenu } from './header/menu.mjs';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// indexedDB
initDB()
  .then(() => {
    console.log('IndexedDB initialized');

    // Header menu
    showDropdownMenu();

    // Active state of buttons in the console
    consoleBtnsActiveState();

    // DarkMode
    toggleDarkMode();

    const [cols, rows] = userColsAndRows();

    // Create and append the spreadsheet to the container
    spreadsheetContainer.append(spreadsheet(cols, rows));

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
