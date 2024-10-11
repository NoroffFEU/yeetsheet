// search.js

import { getCurrentFileId } from '../spreadsheet/db.js';

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
    let fileId = getCurrentFileId();

    // Ensure fileId is a number
    if (typeof fileId === 'string') {
      fileId = Number(fileId);
    }

    if (fileId === null || isNaN(fileId)) {
      console.error('Invalid fileId:', fileId);
      reject(new Error('Invalid fileId'));
      return;
    }

    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const results = [];

    // Create a key range to only include cells from the current file
    const keyRange = IDBKeyRange.bound([fileId, ''], [fileId, '\uffff']);

    const request = store.openCursor(keyRange);

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
      console.error('Search cursor error:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Attaches an input event listener to the search input element to perform searches on input.
 *
 * @param {IDBDatabase} db - The IndexedDB database instance.
 */
export function attachSearchEventListener(db) {
  const searchInput = document.getElementById('searchInput');
  const searchInputBtn = document.getElementById('searchInputBtn');
  const searchResultsCount = document.getElementById('searchResultsCount');
  const searchResultsContainer = document.getElementById('searchResultsContainer');
  const searchResultsList = document.getElementById('searchResultsList');

  if (!searchInput || !searchInputBtn) {
    console.error('Search input elements not found.');
    return;
  }

  // Input event listener for highlighting results
  searchInput.addEventListener('input', function () {
    const query = this.value.trim();

    if (!query) {
      // Remove existing highlights
      document.querySelectorAll('.bg-red-400').forEach((cell) => {
        cell.classList.remove('bg-red-400', 'text-black');
      });
      if (searchResultsCount) {
        searchResultsCount.textContent = '';
        searchResultsCount.classList.remove('dark:text-red-400', 'dark:text-green-500', 'font-bold');
      }
      if (searchResultsList) {
        searchResultsList.innerHTML = '';
      }
      if (searchResultsContainer) {
        searchResultsContainer.classList.add('hidden');
      }
      return;
    }

    searchCellValue(db, query)
      .then((results) => {
        console.log('Search results:', results);

        // Remove existing highlights
        document.querySelectorAll('.bg-red-400').forEach((cell) => {
          cell.classList.remove('bg-red-400', 'text-black');
        });

        if (results.length > 0) {
          results.forEach((result) => {
            const cellId = result.id;
            const cellElement = document.getElementById(cellId);
            if (cellElement) {
              cellElement.classList.add('bg-red-400', 'text-black');
              cellElement.setAttribute('aria-label', `Match found: ${result.value}`);
            }
          });

          // Update search results count with success message and green color
          if (searchResultsCount) {
            searchResultsCount.textContent = `${results.length} result(s) found.`;
            searchResultsCount.classList.remove('dark:text-red-500');
            searchResultsCount.classList.add('dark:text-green-500', 'font-bold', 'm-2');
            if (searchResultsList) {
              searchResultsList.innerHTML = '';
              results.forEach((result) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Cell ${result.id}: ${result.value}`;
                searchResultsList.appendChild(listItem);
              });
            }
          }
          if (searchResultsContainer) {
            searchResultsContainer.classList.remove('hidden');
          }
        } else {
          // No results found, show error message and red color
          if (searchResultsCount) {
            searchResultsCount.textContent = 'No results found.';
            searchResultsCount.classList.remove('dark:text-green-500');
            searchResultsCount.classList.add('dark:text-red-500', 'font-bold');
          }
          if (searchResultsContainer) {
            searchResultsContainer.classList.add('hidden');
          }
        }
      })
      .catch((error) => {
        console.error('Search error:', error);
        if (searchResultsCount) {
          searchResultsCount.textContent = 'Error performing search.';
        }
        if (searchResultsList) {
          searchResultsList.innerHTML = '';
        }
        if (searchResultsContainer) {
          searchResultsContainer.classList.add('hidden');
        }
      });
  });

  // Button click event listener for scrolling to the first result
  searchInputBtn.addEventListener('click', function () {
    scrollToFirstResult(db);
  });

  // Listen for "Enter" key to trigger the scroll action
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if within a form
      scrollToFirstResult(db);
    }
  });

  function scrollToFirstResult(db) {
    const query = searchInput.value.trim();

    if (!query) return;

    searchCellValue(db, query)
      .then((results) => {
        if (results.length > 0) {
          const firstResult = results[0];
          const cellElement = document.getElementById(firstResult.id);
          if (cellElement) {
            cellElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      })
      .catch((error) => {
        console.error('Error scrolling to first result:', error);
      });
  }
}
