import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { initDB, getFromDB } from './spreadsheet/db.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { showDropdownMenu } from './header/menu.mjs';
import { mountEditor, getValue } from './spreadsheet/codeEditor.js';
import codeEditor from './codeEditor/index.js';
import Spreadsheet from './spreadsheet/Class/index.js';
import replaceIconsWithSVGs from './icons/replaceIconsWithSVGs.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// indexedDB
initDB()
  .then(() => {
    console.log('IndexedDB initialized');

    getFromDB('spreadsheetData').then((data) => {
      console.log(data);
      // Create and append the spreadsheet to the container
      const sheet = new Spreadsheet(data);
      mountEditor(() => {
        // get the code editor current value.
        const value = getValue();
        // just log to the console to show how to use it.
        console.log(value);
      });
      codeEditor(sheet);
      spreadsheetContainer.append(sheet.displaySheet());
    });

    // Header menu
    showDropdownMenu();

    // Active state of buttons in the console
    consoleBtnsActiveState();

    // DarkMode
    toggleDarkMode();
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });

replaceIconsWithSVGs();
