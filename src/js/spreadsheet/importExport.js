/**
 * Imports data from a CSV file.
 *
 * @param {File} file The CSV file to import.
 */
export function importCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const parsedData = parseCSV(csvData);
      console.log(csvData);
      resolve(parsedData);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
}

/**
 * Parses CSV data.
 *
 * @param {string} csvData The CSV data as a string.
 */
function parseCSV(csvData) {
  try {
    const rows = csvData.split('\n');
    return rows.map((row) => row.split(','));
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    return null;
  }
}

/**
 * Imports data from a JSON file.
 *
 * @param {File} file The JSON file to import.
 */
export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const parsedData = parseJSON(jsonData);
        if (parsedData === null) {
          reject(new Error('Invalid JSON file format'));
          return;
        } else {
          resolve(parsedData);
        }
      } catch (error) {
        reject(new Error('Invalid JSON file format'));
        console.log('Error: ', error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
}

/**
 * Parses JSON data.
 *
 * @param {Object} jsonData - The JSON data to parse.
 */
function parseJSON(jsonData) {
  try {
    const keys = Object.keys(jsonData);
    const maxCol = keys.reduce((max, key) => {
      const col = key.charCodeAt(0) - 'A'.charCodeAt(0);
      return Math.max(max, col);
    }, -1);
    const maxRow = keys.reduce((max, key) => {
      const row = parseInt(key.substring(1), 10) - 1;
      return Math.max(max, row);
    }, -1);
    const data = Array.from({ length: maxRow + 1 }, () =>
      Array(maxCol + 1).fill(''),
    );

    keys.forEach((key) => {
      const col = key.charCodeAt(0) - 'A'.charCodeAt(0);
      const row = parseInt(key.substring(1), 10) - 1;
      if (data[row]) {
        data[row][col] = jsonData[key];
      } else {
        throw new Error(`Invalid cell data`);
      }
    });

    return data;
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return null;
  }
}

/**
 * Generates CSV data.
 *
 * @returns {string} - The CSV data as a string.
 */
export function generateCSVFromData(data) {
  return data.map((row) => row.map((cell) => `${cell}`).join(',')).join('\n');
}

/**
 * Opens the IndexedDB database.
 *
 */
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SpreadsheetDB');
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

/**
 * Generates CSV data from IndexedDB.
 *
 */
export async function generateCSVFromIndexedDB() {
  const allCells = await getAllCellsFromIndexedDB();
  const rows = [];
  let maxRow = 0;
  let maxCol = 0;

  allCells.forEach((cell) => {
    const match = cell.id.match(/([A-Z]+)(\d+)/);
    if (match) {
      const col = match[1].charCodeAt(0) - 'A'.charCodeAt(0);
      const row = parseInt(match[2], 10) - 1;
      maxRow = Math.max(maxRow, row);
      maxCol = Math.max(maxCol, col);
      if (!rows[row]) {
        rows[row] = [];
      }
      rows[row][col] = cell.value;
    }
  });

  const csvData = [];
  for (let r = 0; r <= maxRow; r++) {
    const row = [];
    for (let c = 0; c <= maxCol; c++) {
      row.push(rows[r] && rows[r][c] ? rows[r][c] : '');
    }
    csvData.push(row);
  }

  return generateCSVFromData(csvData);
}

/**
 * Retrieves all cells from IndexedDB.
 *
 */
async function getAllCellsFromIndexedDB() {
  const db = await openIndexedDB();
  const transaction = db.transaction(['cells'], 'readonly');
  const objectStore = transaction.objectStore('cells');
  return new Promise((resolve, reject) => {
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = (event) => resolve(event.target.result);
    getAllRequest.onerror = (event) => reject(event.target.error);
  });
}

/**
 * Generates JSON data from IndexedDB.
 *
 */
export async function generateJSONFromIndexedDB() {
  const allCells = await getAllCellsFromIndexedDB();
  const jsonData = {};

  allCells.forEach((cell) => {
    jsonData[cell.id] = cell.value;
  });

  return JSON.stringify(jsonData, null, 2); // Adds indentation for better readability
}

/**
 * Displays data from IndexedDB on the spreadsheet.
 *
 */
export function displayDataFromIndexedDB() {
  getAllCellsFromIndexedDB().then((allCells) => {
    clearSpreadsheet();
    updateSpreadsheet(allCells);
  });
}

/**
 * Updates the spreadsheet with the given cells.
 *
 */
export function updateSpreadsheet(cells) {
  cells.forEach((cell) => {
    const match = cell.id.match(/([A-Z]+)(\d+)/);
    if (match) {
      const col = match[1].charCodeAt(0) - 'A'.charCodeAt(0);
      const row = parseInt(match[2], 10) - 1;
      const cellElement = document.querySelector(
        `#spreadsheetContainer table tr:nth-child(${row + 1}) td:nth-child(${col + 2})`,
      );
      if (cellElement) {
        cellElement.textContent = cell.value;
      }
    }
  });
}

/**
 * Clears the existing content of the spreadsheet.
 *
 */
export function clearSpreadsheet() {
  const cells = document.querySelectorAll('#spreadsheetContainer table td');
  cells.forEach((cell) => {
    cell.textContent = '';
  });
}

/**
 * Clears the IndexedDB before importing new data.
 *
 */
export async function clearIndexedDB() {
  const db = await openIndexedDB();
  const transaction = db.transaction(['cells'], 'readwrite');
  const objectStore = transaction.objectStore('cells');
  return new Promise((resolve, reject) => {
    const clearRequest = objectStore.clear();
    clearRequest.onsuccess = () => resolve();
    clearRequest.onerror = (event) => reject(event.target.error);
  });
}

/**
 * Initializes the export button functionality.
 *
 * @param {string} exportButtonId - The ID of the export button element.
 */
export function exportButton(exportButtonId) {
  const exportButton = document.getElementById(exportButtonId);
  exportButton.addEventListener('click', async () => {
    const exportFormat = prompt(
      'Enter export format (csv/json):',
    ).toLowerCase();
    if (exportFormat !== 'csv' && exportFormat !== 'json') {
      alert('Invalid export format. Please enter "csv" or "json".');
      return;
    }

    try {
      let exportContent;
      if (exportFormat === 'csv') {
        exportContent = await generateCSVFromIndexedDB();
      } else if (exportFormat === 'json') {
        exportContent = await generateJSONFromIndexedDB();
      }

      const blob = new Blob([exportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error exporting ${exportFormat.toUpperCase()}:`, error);
    }
  });
}

/**
 * Initializes the import button functionality.
 *
 * @param {string} importButtonId - The ID of the import button element.
 */
export function importButton(importButtonId) {
  const importButton = document.getElementById(importButtonId);
  const importModal = document.querySelector('#importModal');
  const cancelImportBtn = document.querySelector('#cancelImportBtn');
  const confirmImportBtn = document.querySelector('#confirmImportBtn');
  const fileInput = document.querySelector('#importFileInput');
  const importDropArea = document.querySelector('#importDropArea');
  const fileDisplay = document.querySelector('#importFileDisplay');
  const fileClickButton = document.querySelector('#fileClickButton');

  importButton.addEventListener('click', () => {
    importModal.classList.remove('hidden');
  });

  cancelImportBtn.addEventListener('click', () => {
    importModal.classList.add('hidden');
  });

  confirmImportBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    importModal.classList.add('hidden');
    handleImportedFile(file);
  });

  function updateFileDisplay(file) {
    if (file) {
      fileDisplay.textContent = 'Selected file: ' + file.name;
    }
  }

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    updateFileDisplay(file);
  });

  importDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    updateFileDisplay(file);
  });

  importDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  fileClickButton.addEventListener('click', () => {
    fileInput.click();
  });
}
/**
 * Handles the imported file by parsing it and storing its data in IndexedDB.
 *
 * @param {File} file - The file to import.
 */
async function handleImportedFile(file) {
  if (!file) return;

  const fileName = file.name.toLowerCase();
  let parsedData;

  try {
    if (fileName.endsWith('.csv')) {
      parsedData = await importCSV(file);
    } else if (fileName.endsWith('.json')) {
      parsedData = await importJSON(file);
    } else {
      throw new Error('Unsupported file type');
    }

    await clearIndexedDB();

    const db = await openIndexedDB();
    const transaction = db.transaction(['cells'], 'readwrite');
    const objectStore = transaction.objectStore('cells');

    parsedData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== null && cell !== undefined && cell !== '') {
          const key = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
          objectStore.put({ id: key, value: cell });
        }
      });
    });

    transaction.oncomplete = () => {
      displayDataFromIndexedDB();
    };
  } catch (error) {
    console.error('Error importing file:', error);
  }
}
