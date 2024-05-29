import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

const [cols, rows] = userColsAndRows();

spreadsheetContainer.append(spreadsheet(cols, rows));

toggleDarkMode();
