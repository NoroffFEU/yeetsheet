import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { getValue, mountEditor } from './spreadsheet/codeEditor.js';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';
import { attachSearchEventListener } from './spreadsheet/search.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { showDropdownMenu } from './header/menu.mjs';
import replaceIconsWithSVGs from './icons/replaceIconsWithSVGs.js';
import { toggleHamburgerMenu } from './header/hamburgerMenu';
import changeProjectName from './spreadsheet/sidebar/projectName.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// indexedDB
initDB()
  .then((db) => {
    console.log('IndexedDB initialized');

    // Header menu
    toggleHamburgerMenu();
    showDropdownMenu();

    // Active state of buttons in the console
    consoleBtnsActiveState();

    // DarkMode
    toggleDarkMode();

    const [cols, rows] = userColsAndRows();

    // Create and append the spreadsheet to the container
    spreadsheetContainer.append(spreadsheet(cols, rows));

    mountEditor(() => {
      // get the code editor current value.
      const value = getValue();

      // just log to the console to show how to use it.
      console.log('editor', value);
    });

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
    attachSearchEventListener(db);
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });

replaceIconsWithSVGs();

// Function to change the project name
changeProjectName();
