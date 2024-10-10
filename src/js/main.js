import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { getValue, mountEditor } from './spreadsheet/codeEditor.js';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';
import { attachSearchEventListener } from './spreadsheet/search.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { setupFileMenu } from './header/fileMenu.js';
import { showDropdownMenu } from './header/menu.mjs';
import replaceIconsWithSVGs from './icons/replaceIconsWithSVGs.js';
import { toggleHamburgerMenu } from './header/hamburgerMenu';
import { toggleEditorSize } from './helpers/toggleEditorSize.js';
import changeProjectName from './spreadsheet/sidebar/projectName.js';
import { toggleSidebar } from './utils/toggleSidebar.js';
import { renderHelpMenu } from './header/helpMenu.js';
const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

async function initializeApp() {
  try {
    const db = await initDB();
    console.log('IndexedDB initialized');

    // Header menu
    setupFileMenu();
    renderHelpMenu();
    toggleHamburgerMenu();
    showDropdownMenu();

    // Active state of buttons in the console
    consoleBtnsActiveState();

    // DarkMode
    toggleDarkMode();

    // Use async/await for userColsAndRows
    const [cols, rows] = await userColsAndRows();

    // Create and append the spreadsheet to the container
    spreadsheetContainer.append(spreadsheet(cols, rows));

    mountEditor(() => {
      // get the code editor current value.
      const value = getValue();
      console.log('editor', value);
    });

    addCellTargetingEvents(
      '#spreadsheetContainer table',
      (col, row) => {
        const cellId = numberToLetter(col) + (row + 1);
        return getCellValue(cellId).then((value) => value || '');
      },
      (col, row, value) => {
        const cellId = numberToLetter(col) + (row + 1);
        saveCellValue(cellId, value);
      },
    );

    // Call toggleSidebar to set up the event listener
    attachSearchEventListener(db);
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
  }

  replaceIconsWithSVGs();
  toggleEditorSize();
  toggleSidebar();
  changeProjectName();
}

// Run the async function to initialize the app
initializeApp();
