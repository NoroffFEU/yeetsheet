const DB_NAME = 'SpreadsheetDB';
const DB_VERSION = 1;
const STORE_NAME = 'cells';

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
export function getFromDB(key) {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('spreadsheetDB', 1);

    openRequest.onsuccess = function () {
      const db = openRequest.result;
      const transaction = db.transaction('spreadsheet', 'readonly');
      const spreadsheet = transaction.objectStore('spreadsheet');
      const request = spreadsheet.get(key);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(request.error);
      };
    };

    openRequest.onerror = function () {
      reject(openRequest.error);
    };
  });
}

export function saveToDB(key, value) {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('spreadsheetDB', 1);

    openRequest.onupgradeneeded = function () {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('spreadsheet')) {
        db.createObjectStore('spreadsheet');
      }
    };

    openRequest.onsuccess = function () {
      const db = openRequest.result;
      const transaction = db.transaction('spreadsheet', 'readwrite');
      const spreadsheet = transaction.objectStore('spreadsheet');
      const request = spreadsheet.put(value, key);

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(request.error);
      };
    };

    openRequest.onerror = function () {
      reject(openRequest.error);
    };
  });
}
export function deleteFromDB(key) {
  const openRequest = indexedDB.open('spreadsheetDB', 1);

  openRequest.onupgradeneeded = function () {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains('spreadsheet')) {
      db.createObjectStore('spreadsheet');
    }
  };

  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const transaction = db.transaction(['spreadsheet'], 'readwrite');
    const store = transaction.objectStore('spreadsheet');
    const request = store.delete(key);

    request.onsuccess = function () {
      console.log(`Data with key ${key} deleted successfully`);
    };

    request.onerror = function (event) {
      console.error(`Error deleting data with key ${key}:`, event.target.error);
    };
  };

  openRequest.onerror = function () {
    console.error('Failed to open database:', openRequest.error);
  };
}
