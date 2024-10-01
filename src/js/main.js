import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { sheetNavigation } from './spreadsheet/sheetNavigation.js';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { getValue, mountEditor } from './spreadsheet/codeEditor.js';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { showDropdownMenu } from './header/menu.mjs';
import replaceIconsWithSVGs from './icons/replaceIconsWithSVGs.js';

const spreadsheet1 = document.querySelector('#spreadsheet1');
const spreadsheet2 = document.querySelector('#spreadsheet2');
const spreadsheet3 = document.querySelector('#spreadsheet3');
const spreadsheet4 = document.querySelector('#spreadsheet4');

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

    // Create and append the spreadsheets to the container
    spreadsheet1.append(spreadsheet(cols, rows));
    spreadsheet2.append(spreadsheet(cols, rows));
    spreadsheet3.append(spreadsheet(cols, rows));
    spreadsheet4.append(spreadsheet(cols, rows));

    sheetNavigation();

    mountEditor(() => {
      // get the code editor current value.
      const value = getValue();

      // just log to the console to show how to use it.
      console.log('editor', value);
    });

    addCellTargetingEvents(
      '#spreadsheetContainer table',
      (col, row) => {
        const activeSheetId = document.querySelector(
          '.spreadsheet-content:not(.hidden)',
        ).id;
        const cellId = `${activeSheetId}-${numberToLetter(col)}${row + 1}`;
        // Retrieve cell value from IndexedDB using the new unique cell ID
        return getCellValue(cellId).then((value) => value || '');
      },
      (col, row, value) => {
        const activeSheetId = document.querySelector(
          '.spreadsheet-content:not(.hidden)',
        ).id;
        const cellId = `${activeSheetId}-${numberToLetter(col)}${row + 1}`;
        // Save cell value to IndexedDB using the new unique cell ID
        saveCellValue(cellId, value);
      },
    );
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });

replaceIconsWithSVGs();
