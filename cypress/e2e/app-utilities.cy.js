describe('Utility Element Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should open the code editor when clicking the code editor button', () => {
    // Fill in a cell with a JavaScript function
    cy.get('#A1').type('() => return 3 + 3 {enter}');
    cy.get('#A1').should('have.text', '6');

    // Click the code editor button
    cy.get('[data-cy="code-editor-btn"]').click();

    // Check that the content in the textarea is the function from the cell A1
    cy.get('[data-cy="app-utilities"] textarea').should(
      'have.text',
      '() => return 3 + 3',
    );
  });

  it('should display console messages and return value when clicking the console button', () => {
    // Add a console log to the JavaScript function in cell A1
    cy.get('#A1').type('() => (console.log("hello world"), 2 + 2) {enter}');
    cy.get('#A1').should('have.text', 'hello world 4');

    // Click the console button
    cy.get('[data-cy="console-btn"]').click();

    // Check that the content in the textarea contains the right content from cell A1
    cy.get('[data-cy="app-utilities"] textarea').should(
      'have.text',
      'hello world/n 4',
    );
  });

  it('should display errors if the JavaScript function has invalid syntax when clicking the errors button', () => {
    // Make the function invalid
    cy.get('#A1').type('() => return 2 +) {enter}');
    cy.get('#A1').should('have.text', 'Error');

    // Click the error button
    cy.get('[data-cy="errors-btn"]').click();

    // Check that the content in the textarea displays the errors if there is an invalid function
    cy.get('[data-cy="app-utilities"] textarea').should(
      'have.text',
      'Invalid Syntax - Error message',
    );

    // Change back to a valid JavaScript function
    cy.get('#A1').type('() => return 2 + 2) {enter}');
    cy.get('#A1').should('have.text', '4');

    // Verify that the error window does not show any errors
    cy.get('[data-cy="app-utilities"] textarea').should(
      'have.text',
      'No errors!',
    );
  });

  it('should be able to switch the terminal tab and execute commands', () => {
    // Switch to the terminal window
    cy.get('[data-cy="terminal-btn"]').click();

    // Ensure the terminal is functional and can display input as output
    const command = 'echo "hello world"';
    cy.get('[data-cy="app-utilities"] textarea').type(`${command}{enter}`);

    // Verify the output is the same as the input command
    cy.get('[data-cy="app-utilities"] textarea').should(
      'contain.text',
      command,
    );
  });

  it('should change back to the code panel and still display the function', () => {
    // Click the code editor button
    cy.get('[data-cy="code-editor-btn"]').click();

    // Verify that the function still is displayed in the textarea
    cy.get('[data-cy="app-utilities"] textarea').should(
      'have.text',
      '() => return 2 + 2',
    );
  });
});
