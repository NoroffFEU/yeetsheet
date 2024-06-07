import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { getValue, mountEditor } from './spreadsheet/codeEditor.js';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { showDropdownMenu } from './header/menu.mjs';
import { showTab, initTabs } from './utils/tabs.mjs';
import { displayConsoleOutput } from './console/consoleOutPut.mjs';

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

    mountEditor(() => {
      // get the code editor current value.
      const value = getValue();
      displayConsoleOutput();
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
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });

//Add the show tab to global scope
window.showTab = showTab;
//Adding and initializing tabs of the code editor, console, and terminal
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the tabs by showing the first tab and hiding the others
  initTabs();
});
