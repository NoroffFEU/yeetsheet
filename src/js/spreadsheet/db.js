// db.js

const DB_NAME = 'SpreadsheetDB';
const DB_VERSION = 2;
const CELL_STORE_NAME = 'cells';
const FILE_STORE_NAME = 'files';

let db;
let currentFileId = null; // the ID of the currently active file

export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create 'files' object store
      if (!db.objectStoreNames.contains(FILE_STORE_NAME)) {
        const filesStore = db.createObjectStore(FILE_STORE_NAME, {
          keyPath: 'fileId',
          autoIncrement: true,
        });
        filesStore.createIndex('fileName', 'fileName', { unique: false });
      }

      // Delete the old 'cells' store if it exists
      if (db.objectStoreNames.contains(CELL_STORE_NAME)) {
        db.deleteObjectStore(CELL_STORE_NAME);
      }

      // Create 'cells' object store with compound key ['fileId', 'id']
      const cellsStore = db.createObjectStore(CELL_STORE_NAME, {
        keyPath: ['fileId', 'id'],
      });

      console.log('Database setup complete');

      attachSearchEventListener(db);
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };
  });
}

export function createNewFile(fileName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([FILE_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(FILE_STORE_NAME);

    const file = { fileName };

    const request = store.add(file);

    request.onsuccess = function (event) {
      const fileId = event.target.result;
      console.log(`File "${fileName}" created with ID ${fileId}`);
      resolve({ fileId, fileName });
    };

    request.onerror = function (event) {
      console.error('Error creating file:', event.target.error);
      reject(event.target.error);
    };
  });
}

export function getFiles() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([FILE_STORE_NAME], 'readonly');
    const store = transaction.objectStore(FILE_STORE_NAME);

    const request = store.getAll();

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      console.error('Error retrieving files:', event.target.error);
      reject(event.target.error);
    };
  });
}

export function saveCellValue(fileId, id, value) {
  const numericFileId = Number(fileId);
  const transaction = db.transaction([CELL_STORE_NAME], 'readwrite');
  const store = transaction.objectStore(CELL_STORE_NAME);
  const cell = { fileId: numericFileId, id, value };

  const request = store.put(cell);

  request.onsuccess = function () {
    console.log(`Cell ${id} in file ${numericFileId} saved successfully`);
  };

  request.onerror = function (event) {
    console.error(
      `Error saving cell ${id} in file ${numericFileId}:`,
      event.target.error,
    );
  };
}

export function getCellValue(fileId, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CELL_STORE_NAME], 'readonly');
    const store = transaction.objectStore(CELL_STORE_NAME);
    const request = store.get([fileId, id]);

    request.onsuccess = function (event) {
      resolve(event.target.result ? event.target.result.value : null);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export function deleteSheetData(fileId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CELL_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(CELL_STORE_NAME);

    // Use a cursor to delete all cells with the given fileId
    const keyRange = IDBKeyRange.bound([fileId, ''], [fileId, '\uffff']);
    const request = store.openCursor(keyRange);

    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        console.log(`All cells in file ${fileId} deleted successfully.`);
        resolve();
      }
    };

    request.onerror = function (event) {
      console.error(
        `Error deleting cells in file ${fileId}:`,
        event.target.error,
      );
      reject(event.target.error);
    };
  });
}

export function setCurrentFileId(fileId) {
  currentFileId = Number(fileId);
  localStorage.setItem('currentFileId', currentFileId);
}

export function getCurrentFileId() {
  if (currentFileId === null || currentFileId === undefined) {
    const storedFileId = localStorage.getItem('currentFileId');
    currentFileId = storedFileId !== null ? Number(storedFileId) : null;
  }
  return currentFileId;
}

export function getAllCells(fileId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CELL_STORE_NAME], 'readonly');
    const store = transaction.objectStore(CELL_STORE_NAME);

    const keyRange = IDBKeyRange.bound([fileId, ''], [fileId, '\uffff']);
    const request = store.getAll(keyRange);

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      console.error('Error retrieving cells:', event.target.error);
      reject(event.target.error);
    };
  });
}

export function updateFileName(fileId, newFileName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([FILE_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(FILE_STORE_NAME);

    const request = store.get(fileId);

    request.onsuccess = function (event) {
      const file = event.target.result;
      if (file) {
        file.fileName = newFileName;
        const updateRequest = store.put(file);

        updateRequest.onsuccess = function () {
          resolve();
        };

        updateRequest.onerror = function (event) {
          console.error('Error updating file name:', event.target.error);
          reject(event.target.error);
        };
      } else {
        reject('File not found.');
      }
    };

    request.onerror = function (event) {
      console.error('Error retrieving file:', event.target.error);
      reject(event.target.error);
    };
  });
}

export function getCurrentFileName() {
  const fileId = getCurrentFileId();
  if (!fileId) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([FILE_STORE_NAME], 'readonly');
    const store = transaction.objectStore(FILE_STORE_NAME);
    const request = store.get(Number(fileId));

    request.onsuccess = function (event) {
      const file = event.target.result;
      if (file) {
        resolve(file.fileName);
      } else {
        resolve(null);
      }
    };

    request.onerror = function (event) {
      console.error('Error retrieving current file name:', event.target.error);
      reject(event.target.error);
    };
  });
}
