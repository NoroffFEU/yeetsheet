// import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
// import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { initDB } from './spreadsheet/db.js';
import showFileMenu from './header/file.mjs';
import showZoomMenu from './header/zoom.mjs';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import Spreadsheet from './spreadsheet/Class/index.js';
import codeEditor from './codeEditor/index.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

const sheet = new Spreadsheet();

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
    const spreadSheet = sheet.displaySheet();
    spreadsheetContainer.append(spreadSheet);

    document
      .querySelector('#add-row-btn')
      .addEventListener('click', sheet.addRow);
    document
      .querySelector('#add-col-btn')
      .addEventListener('click', sheet.addCol);
    codeEditor(sheet);
    console.log(sheet);

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
