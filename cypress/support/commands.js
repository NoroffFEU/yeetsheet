// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import 'cypress-downloadfile/lib/downloadFileCommand';

Cypress.Commands.add('locateImport', () => {
  cy.get('#fileBtn').click();
  cy.get('#file-item-2').click();
});

Cypress.Commands.add('saveChanges', () => {
  cy.get('aside button').click();
});

Cypress.Commands.add('checkIndexedDBValues', (dbName, storeName, keyValues) => {
  const getIndexedDBData = (key) => {
    return new Cypress.Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);

      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction([storeName], 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const getRequest = objectStore.get(key);

        getRequest.onsuccess = function (event) {
          resolve(event.target.result.value);
        };

        getRequest.onerror = function () {
          reject(`Failed to retrieve data from IndexedDB for key ${key}`);
        };
      };
    });
  };

  // Iterate over keyValues and check each key-value pair
  Cypress.Promise.all(
    Object.entries(keyValues).map(([key, expectedValue]) => {
      return getIndexedDBData(key).then((value) => {
        expect(value).to.equal(expectedValue);
      });
    }),
  );
});
