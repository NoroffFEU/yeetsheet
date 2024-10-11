// main.js

import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import numberToLetter from './helpers/numberToLetter';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { getValue, mountEditor } from './codeEditor/codeEditor.js';
import {
  initDB,
  saveCellValue,
  getCellValue,
  deleteSheetData,
  createNewFile,
  getCurrentFileId,
  setCurrentFileId,
} from './spreadsheet/db.js';
import { runEditor } from './codeEditor/runEditor.js';
import { attachSearchEventListener } from './spreadsheet/search.js';
import consoleBtnsActiveState from './console/consoleBtns.mjs';
import { setupFileMenu } from './header/fileMenu.js';
import { showDropdownMenu } from './header/menu.mjs';
import replaceIconsWithSVGs from './icons/replaceIconsWithSVGs.js';
import { setupZoomMenu } from './header/zoomMenu.js';
import { toggleHamburgerMenu } from './header/hamburgerMenu';
import { toggleEditorSize } from './helpers/toggleEditorSize.js';
import { renderHelpMenu } from './header/helpMenu.js';
import { rightClickEventListener } from './spreadsheet/popup/rightClickEventListener';
import { changeSheetName } from './spreadsheet/sidebar/sheetName.js';
import { updateProjectName } from './spreadsheet/sidebar/projectName.js'; 

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

      // Check if there is a current file
      let currentFileId = getCurrentFileId();
      if (!currentFileId) {
        // No current file, create a new one
        createNewFile('Untitled').then(({ fileId, fileName }) => {
          setCurrentFileId(fileId);
          console.log(`New file "${fileName}" created with ID ${fileId}`);
          initializeApp();
        });
      } else {
        // Load existing file
        initializeApp();
      }
    })
    .catch((error) => {
      console.error('Failed to initialize IndexedDB:', error);
    });

  // Add keyboard shortcut for saving (Ctrl+S or Cmd+S)
  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      handleSaveFile();
    }
  });

  function handleSaveFile() {
    // For IndexedDB, data is saved automatically when saving cell values
    // We might want to provide feedback to the user
    alert('File saved successfully.');
  }

  /**
   * Initializes the application after the database and files are set up.
   */
  function initializeApp() {
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
        const fileId = getCurrentFileId();
        return getCellValue(fileId, cellId).then((value) => value || '');
      },
      (col, row, value) => {
        const cellId = numberToLetter(col) + (row + 1);
        // save cell value to IndexedDB
        const fileId = getCurrentFileId();
        saveCellValue(fileId, cellId, value);
      },
    );

    attachSearchEventListener(db);

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
    updateProjectName();
    changeSheetName();
    // function for running code from the code editor
    runEditor();
  }

  /**
   * Handles the deletion of all cell data from the spreadsheet.
   * This function shows a confirmation dialog to the user,
   * and upon confirmation, it deletes all cell data from IndexedDB and clears the UI.
   *
   * @function handleDeleteSheetData
   */
  function handleDeleteSheetData() {
    const confirmation = confirm(
      'Are you sure you want to delete all cell data in this file?',
    );
    if (confirmation) {
      const fileId = getCurrentFileId();
      deleteSheetData(fileId)
        .then(() => {
          const cells = document.querySelectorAll('td');
          cells.forEach((cell) => {
            cell.textContent = '';
          });
          alert('All cell data deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting cell data:', error);
        });
    }
  }
});
