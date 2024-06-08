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
      console.log('Setup complete');
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
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const cell = { id, value };

  const request = store.put(cell);

  request.onsuccess = function () {
    console.log(`Cell ${id} saved successfully`);
  };

  request.onerror = function (event) {
    console.error(`Error saving cell ${id}:`, event.target.error);
  };
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

// All under this line is a temporary solution for storing the whole spreadsheet data
// but would be nice if someone with more experience with indexedDB could look over it and change it (if needed)

export function initFullDB() {
  return new Promise((resolve, reject) => {
    let request;

    request = indexedDB.open('SpreadsheetDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('sheets')) {
        db.createObjectStore('sheets', { keyPath: 'key' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(`Database error: ${event.target.error}`);
    };
  });
}

export function saveToDB(key, value) {
  console.log('Saving data:', value);
  return initFullDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sheets'], 'readwrite');
      const store = transaction.objectStore('sheets');
      const request = store.put({ key, value });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(`Save error: ${event.target.errorCode}`);
      };
    });
  });
}

export function getFromDB(key) {
  return initFullDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sheets'], 'readonly');
      const store = transaction.objectStore('sheets');
      const request = store.get(key);

      request.onsuccess = (event) => {
        if (event.target.result) {
          resolve(event.target.result.value);
        } else {
          resolve(null);
        }
      };

      request.onerror = (event) => {
        reject(`Get error: ${event.target.errorCode}`);
      };
    });
  });
}
