import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { initDB } from './spreadsheet/db.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// indexedDB
initDB()
  .then(() => {
    console.log('IndexedDB initialized');

    const [cols, rows] = userColsAndRows();

    // Create and append the spreadsheet to the container
    spreadsheetContainer.append(spreadsheet(cols, rows));

    // DarkMode
    toggleDarkMode();
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });
