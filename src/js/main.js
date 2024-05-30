import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { initDB } from './spreadsheet/db.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// indexedDB
initDB()
  .then(() => {
    console.log('IndexedDB initialized');

    // DarkMode
    toggleDarkMode();

    const [cols, rows] = userColsAndRows();

    // Create and append the spreadsheet to the container
    spreadsheetContainer.append(spreadsheet(cols, rows));

    addCellTargetingEvents(
      '#spreadsheetContainer table',
      (col, row) => {
        // read cell value from db/memory
        console.log('load', col, row);
        return `() => { return 'hi' }`;
      },
      (col, row, value) => {
        // Here you can put the save function with params for cell contents.
        console.log('save', col, row, value);
      },
    );
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });
