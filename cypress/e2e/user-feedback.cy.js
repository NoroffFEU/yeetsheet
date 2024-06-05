describe('Clear Messages for Userfeedback and Errors', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should give an error when writing an invalid javascript function', () => {
    // Write an invalid JavaScript function in a cell and check that it returns an error.
    cy.get('#A1').type('() => return 3 + "three" {enter}');
    cy.get('#A1').should('have.text', 'Invalid function');
  });

  it('should return the correct value if the javascript function is valid', () => {
    // Write a valid JavaScript function in a cell and check that the return value is the result of the function
    cy.get('#A1').type('() => return 3 + 3 {enter}');
    cy.get('#A1').should('have.text', '6');
  });

  it('should give the user a success message when saving changes', () => {
    // Check the function is still valid
    cy.get('#A1').should('have.text', '6');

    // Save the changes
    cy.saveChanges();

    // Verify that the user receives a message indicating that the spreadsheet was successfully saved
    cy.get('.save-success')
      .should('be.visible')
      .and('contain', 'Changes has been saved.');
  });

  it('should give the user a success message when importing a valid csv file', () => {
    const content = 'Name,Age\nKarl,24';
    // Write the CSV content to a file
    cy.writeFile('cypress/fixtures/import-valid.csv', content).then(() => {
      // Finding and selecting import option in navigation
      cy.locateImport();

      // Trigger file input for CSV import
      cy.get('input[type="file"]').attachFile('sample.csv');

      // Verify that user receives a success message for importing the csv file
      cy.get('.import-success')
        .should('be.visible')
        .and('contain', 'File successfully imported to the spreadsheet.');
    });
  });

  it('should give the user an error if the imported csv file is invalid', () => {
    const invalidContent = 'Invalid CSV Content';
    // Write the CSV content to a file
    cy.writeFile('cypress/fixtures/import-invalid.csv', invalidContent).then(
      () => {
        // Finding and selecting import option in navigation
        cy.locateImport();

        // Trigger file input for CSV import
        cy.get('input[type="file"]').attachFile('sample.csv');

        // Verify that user receives a success message for importing the csv file
        cy.get('.import-error')
          .should('be.visible')
          .and(
            'contain',
            'Failed to import file. Please check the CSV format and try again.',
          );
      },
    );
  });
});
