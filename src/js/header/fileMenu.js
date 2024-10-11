// fileMenu.js

import createEle from '../helpers/createEle.js';
import {
  createNewFile,
  setCurrentFileId,
  getFiles,
  getCurrentFileId,
  getAllCells,
  saveCellValue,
} from '../spreadsheet/db.js';

/**
 * Sets up and inserts a dropdown menu for file options below the specified file button.
 *
 * If the file button (with ID "fileBtn") is not found in the DOM, the function exits early.
 *
 * @function setupFileMenu
 * @returns {void}
 */
export function setupFileMenu() {
  const fileBtn = document.querySelector('#fileBtn');

  if (!fileBtn) return;

  const fileMenuOptions = [
    'New file...',
    'Open file...',
    'Save',
    'Save as...',
    'Save copy',
    'Export',
  ];

  const fileMenuContainer = createEle(
    'div',
    'border dark:border-ys-overlay-30 border-ys-amethyst-400 hidden absolute z-50 top-full left-0 md:w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
  );
  fileMenuContainer.id = 'fileMenu';
  fileMenuContainer.setAttribute('role', 'menu');
  fileMenuContainer.setAttribute('aria-orientation', 'vertical');
  fileMenuContainer.setAttribute('aria-labelledby', 'fileBtn');
  fileMenuContainer.setAttribute('tabindex', '-1');

  const fileMenuList = createEle(
    'ul',
    'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
  );

  fileMenuOptions.forEach((option, i) => {
    const fileMenuItem = createEle('li');
    const fileMenuBtn = createEle(
      'button',
      'w-full text-left dark:text-ys-textAndIconsLight px-5',
      option,
    );
    fileMenuBtn.id = `file-item-${i}`;

    // Add event listeners based on the option
    if (option === 'New file...') {
      fileMenuBtn.addEventListener('click', handleNewFile);
    } else if (option === 'Open file...') {
      fileMenuBtn.addEventListener('click', handleOpenFile);
    } else if (option === 'Save') {
      fileMenuBtn.addEventListener('click', handleSaveFile);
    } else if (option === 'Save as...') {
      fileMenuBtn.addEventListener('click', handleSaveAsFile);
    }
    // Add other handlers as needed

    fileMenuItem.appendChild(fileMenuBtn);
    fileMenuList.appendChild(fileMenuItem);
  });

  fileMenuContainer.appendChild(fileMenuList);
  fileBtn.after(fileMenuContainer);
}

// Event handlers for menu options

function handleNewFile() {
  const fileName = prompt('Enter a name for the new file:', 'Untitled');
  if (fileName !== null) {
    createNewFile(fileName)
      .then(({ fileId, fileName }) => {
        setCurrentFileId(fileId);
        // Reload or reinitialize the app with the new file
        location.reload();
      })
      .catch((error) => {
        console.error('Error creating new file:', error);
      });
  }
}

function handleOpenFile() {
  // Retrieve the list of files and allow the user to select one
  getFiles()
    .then((files) => {
      // Create a simple prompt to select a file
      const fileNames = files.map((file, index) => `${index + 1}: ${file.fileName}`).join('\n');
      const choice = prompt(`Select a file to open:\n${fileNames}`);
      const index = parseInt(choice) - 1;
      if (!isNaN(index) && files[index]) {
        const file = files[index];
        setCurrentFileId(file.fileId);
        // Reload or reinitialize the app with the selected file
        location.reload();
      }
    })
    .catch((error) => {
      console.error('Error retrieving files:', error);
    });
}

function handleSaveFile() {
  // For IndexedDB, data is saved automatically when saving cell values
  // We might want to provide feedback to the user
  alert('File saved successfully.');
}

function handleSaveAsFile() {
  const newFileName = prompt('Enter a new name for the file:');
  if (newFileName !== null) {
    // Create a new file with the current data
    const currentFileId = getCurrentFileId();

    // Get all cells from the current file
    getAllCells(currentFileId).then((cells) => {
      // Create a new file
      createNewFile(newFileName).then(({ fileId: newFileId }) => {
        // Save all cells to the new file
        const promises = cells.map((cell) => {
          return new Promise((resolve, reject) => {
            saveCellValue(newFileId, cell.id, cell.value);
            resolve();
          });
        });
        Promise.all(promises).then(() => {
          setCurrentFileId(newFileId);
          alert('File saved as successfully.');
          location.reload();
        });
      });
    });
  }
}
