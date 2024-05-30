import spreadsheet from './spreadsheet';
import userColsAndRows from './helpers/userColsAndRows';
import toggleDarkMode from './darkModeToggle/toggleDarkMode.mjs';
import { addCellTargetingEvents } from './spreadsheet/cellNavigation';
import { initDB, saveCellValue, getCellValue } from './spreadsheet/db.js';

const spreadsheetContainer = document.querySelector('#spreadsheetContainer');

// Function to load initial data from IndexedDB
async function loadInitialData(cols, rows) {
  const data = [];
  for (let row = 0; row < rows; row++) {
    const rowData = [];
    for (let col = 0; col < cols; col++) {
      const cellId = `cell-${row}-${col}`;
      const cellValue = await getCellValue(cellId);
      rowData.push(cellValue !== null ? cellValue : '');
    }
    data.push(rowData);
  }
  return data;
}

// Initialize the spreadsheet with data from IndexedDB or default data
initDB()
  .then(async () => {
    console.log('IndexedDB initialized');

    // DarkMode
    toggleDarkMode();

    const [cols, rows] = userColsAndRows();

    // Load initial data
    const initialData = await loadInitialData(cols, rows);

    // Create and append the spreadsheet to the container
    const hot = spreadsheet(cols, rows, initialData);
    spreadsheetContainer.append(hot);

    addCellTargetingEvents('#spreadsheetContainer table', (col, row, value) => {
      const cellId = `cell-${row}-${col}`;
      saveCellValue(cellId, value);
    });

    // Auto-save every 10 seconds
    setInterval(() => {
      hot.getData().forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellId = `cell-${rowIndex}-${colIndex}`;
          saveCellValue(cellId, cell);
        });
      });
      console.log('Spreadsheet state saved');
    }, 10000);
  })
  .catch((error) => {
    console.error('Failed to initialize IndexedDB:', error);
  });
