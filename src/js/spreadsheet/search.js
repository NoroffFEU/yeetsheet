const STORE_NAME = 'cells';

/**
 * Searches for cell values in the IndexedDB store that include the specified query.
 *
 * @param {IDBDatabase} db - The IndexedDB database instance.
 * @param {string} query - The query string to search for in cell values.
 * @returns {Promise<Array>} A promise that resolves to an array of matching cell values.
 */
export function searchCellValue(db, query) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.openCursor();
    const results = [];

    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.value.value.includes(query)) {
          results.push(cursor.value);
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

/**
 * Attaches an event listener to the search input element to perform searches on input.
 *
 * @param {IDBDatabase} db - The IndexedDB database instance.
 */
export function attachSearchEventListener(db) {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const query = this.value.trim();

    if (!query) {
      // If the search input is empty, clear all highlights
      document.querySelectorAll('.bg-red-400').forEach((cell) => {
        cell.classList.remove('bg-red-400', 'text-black');
      });
      return; // Exit the function early
    }

    searchCellValue(db, query)
      .then((results) => {
        console.log('Search results:', results);
        // Clear previous highlights
        document.querySelectorAll('.bg-red-400').forEach((cell) => {
          cell.classList.remove('bg-red-400', 'text-black');
        });

        // Highlight the cells that match the search results
        results.forEach((result) => {
          const cellId = result.id; // Assuming each result has an 'id' field that corresponds to the cell's ID
          const cellElement = document.getElementById(cellId);
          if (cellElement) {
            cellElement.classList.add('bg-red-400', 'text-black');
          }
        });
      })
      .catch((error) => {
        console.error('Search error:', error);
      });
  });
}
