import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { initDB, getFromDB } from './spreadsheet/db.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { showDropdownMenu } from './header/menu.mjs';
import { mountEditor, getValue } from './spreadsheet/codeEditor.js';
import runCodeEdit from './codeEditor/index.js';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation.js';
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

      runCodeEdit(sheet);

      spreadsheetContainer.append(sheet.displaySheet());

      // cell navigation
      addCellTargetingEvents(
        'table.spreadsheet-container',
        (col, row) => {
          console.log('focus', { col, row });
          /*
           * onFocusCellCallback => here the cell focus can be handled, for example to set the editor content
           * NB. Just remove the lambda if not needed
           */

          // previous code...
          // const cellId = numberToLetter(col) + (row + 1);
          // // read cell value from IndexedDB
          // return getCellValue(cellId).then((value) => value || '');
        },
        (col, row) => {
          console.log('blur', { col, row });
          /*
           * onBlurCellCallback => here the cell blur can be handled, for example to save the cell value using the editor content
           * It's "similar" to mountEditor => onBlurCallback
           * NB. Just remove the lambda if not needed
           */

          // previous code...
          // const cellId = numberToLetter(col) + (row + 1);
          // // save cell value to IndexedDB
          // saveCellValue(cellId, value);
        },
      );
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
