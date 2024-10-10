const DB_NAME = 'SpreadsheetDB';
const DB_VERSION = 1;
const STORE_NAME = 'cells';

/**
 * Initializes the IndexedDB database.
 *
 * This function sets up the IndexedDB database, creating an object store if necessary.
 * It returns a Promise that resolves with the database instance when the setup is complete.
 *
 * @function initDB
 * @returns {Promise<IDBDatabase>} - A promise that resolves with the database instance.
 */

let db;

export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });

      db.createObjectStore('metadata', { keyPath: 'key' });
      // console.log('Setup complete');
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

export function saveCellValue(id, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const cell = { id, value };

    const request = store.put(cell);

    request.onsuccess = function () {
      // console.log(`Cell ${id} saved successfully`);
      resolve();
    };

    request.onerror = function (event) {
      console.error(`Error saving cell ${id}:`, event.target.error);
      reject(event.target.error);
    };
  });
}

export function getCellValue(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME]);
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = function (event) {
      resolve(event.target.result ? event.target.result.value : null);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export function deleteCellValue(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = function () {
      // console.log(`Cell ${id} deleted successfully`);
      resolve();
    };

    request.onerror = function (event) {
      console.error(`Error deleting cell ${id}:`, event.target.error);
      reject(event.target.error);
    };
  });
}

// Save rows and cols in the metadata store
export function saveTableMetadata(cols, rows) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['metadata'], 'readwrite');
    const store = transaction.objectStore('metadata');

    // Save the number of columns and rows
    store.put({ key: 'cols', value: cols });
    store.put({ key: 'rows', value: rows });

    transaction.oncomplete = function () {
      resolve();
    };

    transaction.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

// Fetch rows and cols from the metadata store
export function getTableMetadata() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['metadata'], 'readonly');
    const store = transaction.objectStore('metadata');

    const colsRequest = store.get('cols');
    const rowsRequest = store.get('rows');

    const result = {};

    colsRequest.onsuccess = function () {
      result.cols = colsRequest.result ? colsRequest.result.value : null;
      if (result.rows !== undefined) resolve(result);
    };

    rowsRequest.onsuccess = function () {
      result.rows = rowsRequest.result ? rowsRequest.result.value : null;
      if (result.cols !== undefined) resolve(result);
    };

    transaction.onerror = function (event) {
      reject(event.target.error);
    };
  });
}
