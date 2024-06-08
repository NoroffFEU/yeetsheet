describe('Data Entry Using Keyboard Input and Save Changes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  // Ensure the cell is visible by scrolling the container
  it('should enter data and verify it is displayed', () => {
    cy.get('#spreadsheetContainer').scrollTo('topLeft');

    cy.get('#A1').should('be.visible');
    cy.get('#A1').click();
    cy.get('#A1').type('Test Data{enter}');
    cy.get('#A1').should('contain.text', 'Test Data');
  });

  it('should enter a JavaScript function and verify it is displayed as text', () => {
    cy.get('#spreadsheetContainer').scrollTo('topLeft');

    cy.get('#B1').should('be.visible');
    cy.get('#B1').click();
    cy.get('#B1').type('{selectall}() => 2 + 2{enter}');

    // Log the cell content for debugging
    cy.get('#B1')
      .invoke('text')
      .then((text) => {
        cy.log('Cell B1 content after typing:', text);
      });

    cy.get('#B1').should('contain.text', '() => 2 + 2');
  });

  // Click the "Save Changes" button
  it('should save changes and verify confirmation message', () => {
    cy.get('[data-cy="save-changes-button"]').should('be.visible');
    cy.get('[data-cy="save-changes-button"]').click();
    cy.get('[data-cy="confirmation-message"]').should('be.visible');
  });

  // Open IndexedDB and verify data
  it('should verify data is stored in IndexedDB', () => {
    cy.window().then(() => {
      const request = indexedDB.open('SpreadsheetDB');

      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['cells'], 'readonly');
        const objectStore = transaction.objectStore('cells');

        const getRequest = objectStore.get('A1');
        getRequest.onsuccess = function (event) {
          expect(event.target.result).to.equal('Test Data');
        };

        const getFunctionRequest = objectStore.get('B1');
        getFunctionRequest.onsuccess = function (event) {
          expect(event.target.result).to.equal('() => 2 + 2');
        };
      };
    });
  });

  // Reload the page and verify data persists
  it('should reload the application and verify data persists', () => {
    cy.reload();

    // Verify the previously entered data and JavaScript functions are still present
    cy.get('#A1').should('contain.text', 'Test Data');
    cy.get('#B1').should('contain.text', '() => 2 + 2');
  });
});
