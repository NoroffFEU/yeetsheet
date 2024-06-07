describe('Import and Export CSV file', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should succesfully import a csv file onto the spreadsheet', () => {
    // Create a test csv file in memory
    const content = 'Name,Age\nKarl,24';

    // Write the CSV content to a file
    cy.writeFile('cypress/fixtures/test.csv', content).then(() => {
      // Finding and selecting import option in navigation
      cy.locateImport();

      // Trigger file input for CSV import
      cy.get('input[type="file"]').attachFile('sample.csv');

      // Click the Save Changes button
      cy.saveChanges();

      // Verify that the CSV data is loaded onto the spreadsheet
      cy.get('#A1').should('contain.text', 'Name');
      cy.get('#A2').should('contain.text', 'Karl');
      cy.get('#B1"]').should('contain.text', 'Age');
      cy.get('#B2').should('contain.text', '24');

      // Check that the values are added to IndexedDB
      cy.checkIndexedDBValues('SpreadsheetDB', 'cells', {
        A1: 'Name',
        B1: 'Age',
        A2: 'Karl',
        B2: '24',
      });
    });
  });

  it('should be able to modify an imported csv file', () => {
    // Modify some values on the spreadsheet
    cy.get('#A1').type('Bob');
    cy.get('#A2').type('50');

    // Click the Save Changes button
    cy.saveChanges();

    // Check that the values are updated in IndexedDB
    cy.checkIndexedDBValues('SpreadsheetDB', 'cells', {
      A1: 'Name',
      B1: 'Age',
      A2: 'Bob',
      B2: '50',
    });
  });

  it('should be able to export the spreadsheet as a csv file', () => {
    // Finding and selecting export option in navigation
    cy.get('#fileBtn').click();
    cy.get('#file-item-7').click();

    // Wait for the file to be downloaded
    const downloadsFolder = Cypress.config('downloadsFolder');
    const exportedFileName = `${downloadsFolder}/exported_file.csv`;

    // Verify that the exported CSV file contains the correct data
    cy.readFile(exportedFileName).then((content) => {
      const expectedContent = 'Name,Age\nKarl,24';
      expect(content.trim()).to.equal(expectedContent);
    });
  });
});
