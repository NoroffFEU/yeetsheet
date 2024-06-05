// import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
// import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { initDB, getFromDB } from './spreadsheet/db.js';
import showFileMenu from './header/file.mjs';
import showZoomMenu from './header/zoom.mjs';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import Spreadsheet from './spreadsheet/Class/index.js';
import codeEditor from './codeEditor/index.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// indexedDB
initDB()
  .then(() => {
    console.log('IndexedDB initialized');

    // FileBtn
    showFileMenu();

    // ZoomBtn
    showZoomMenu();

    // Active state of buttons in the console
    consoleBtnsActiveState();

    // DarkMode
    toggleDarkMode();

    // Create and append the spreadsheet to the container
    getFromDB('spreadsheetData').then((data) => {
      console.log(data);
      const sheet = new Spreadsheet(data);
      const spreadSheet = sheet.displaySheet();
      spreadsheetContainer.append(spreadSheet);
      codeEditor(sheet);
    });

    // const spreadSheet = sheet.displaySheet();
    // spreadsheetContainer.append(spreadSheet);
    // codeEditor(sheet);

    // addCellTargetingEvents(
    //   '#spreadsheetContainer table',
    //   (col, row) => {
    //     const cellId = numberToLetter(col) + (row + 1);
    //     // read cell value from IndexedDB
    //     return getCellValue(cellId).then((value) => value || '');
    //   },
    //   (col, row, value) => {
    //     const cellId = numberToLetter(col) + (row + 1);
    //     // save cell value to IndexedDB
    //     saveCellValue(cellId, value);
    //   },
    // );
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });
