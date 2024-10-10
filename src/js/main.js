import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { getValue, mountEditor } from './spreadsheet/codeEditor.js';
import {
  initDB,
  saveCellValue,
  getCellValue,
  deleteSheetData,
} from './spreadsheet/db.js';
import { getValue, mountEditor } from './codeEditor/codeEditor.js';
import { runEditor } from './codeEditor/runEditor.js';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';
import { attachSearchEventListener } from './spreadsheet/search.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { setupFileMenu } from './header/fileMenu.js';
import { showDropdownMenu } from './header/menu.mjs';
import replaceIconsWithSVGs from './icons/replaceIconsWithSVGs.js';
import { setupZoomMenu } from './header/zoomMenu.js';
import { toggleHamburgerMenu } from './header/hamburgerMenu';
import { toggleEditorSize } from './helpers/toggleEditorSize.js';
import changeProjectName from './spreadsheet/sidebar/projectName.js';
import { renderHelpMenu } from './header/helpMenu.js';
import { rightClickEventListener } from './spreadsheet/popup/rightClickEventListener';
import { changeSheetName } from './spreadsheet/sidebar/sheetName.js';

document.addEventListener('DOMContentLoaded', () => {
  const spreadsheetContainer = document.querySelector('#spreadsheetContainer');
  console.log(spreadsheetContainer); // Debug to ensure it's found

  if (!spreadsheetContainer) {
    console.error('Spreadsheet container not found');
    return;
  }

  // Initialize the zoom menu
  setupZoomMenu();

  // Initialize IndexedDB
  initDB()
    .then((db) => {
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

      const [cols, rows] = userColsAndRows();

      // Create and append the spreadsheet to the container
      spreadsheetContainer.append(spreadsheet(cols, rows));

      // cell popup listener
      rightClickEventListener();

      mountEditor(() => {
        // get the code editor current value.
        const value = getValue();
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

  const deleteButton = document.querySelector(
    '[data-cy="delete-changes-button"]',
  );

  if (deleteButton) {
    deleteButton.addEventListener('click', handleDeleteSheetData);
  } else {
    console.error('Delete changes button not found');
  }

  replaceIconsWithSVGs();
  toggleEditorSize();
  changeProjectName();
  changeSheetName();
  // function for running code from the code editor
  runEditor();
});

/**
 * Handles the deletion of all cell data from the spreadsheet.
 * This function shows a confirmation dialog to the user,
 * and upon confirmation, it deletes all cell data from IndexedDB and clears the UI.
 *
 * @function handleDeleteSheetData
 */
function handleDeleteSheetData() {
  const confirmation = confirm(
    'Are you sure you want to delete all cell data?',
  );
  if (confirmation) {
    const cells = document.querySelectorAll('td');
    cells.forEach((cell) => {
      const cellId = cell.getAttribute('id');
      if (cellId) {
        deleteSheetData(cellId)
          .then(() => {
            cell.textContent = '';
          })
          .catch((error) => {
            console.error('Error deleting cell data:', error);
          });
      }
    });
    alert('All cell data deleted successfully.');
  }
}
