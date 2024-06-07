(function () {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.logs = [];
  console.warns = [];
  console.errors = [];
  /**
   * Pushes the log message to the console.logs array and calls the original log function.
   *
   * @param {string} message - The log message to be pushed to the console.logs array.
   * @return {void} This function does not return anything.
   */
  console.log = function (message) {
    console.logs.push(message);
    originalLog.apply(console, arguments);
  };
  /**
   * Pushes the warning message to the console.warns array and calls the original warn function.
   *
   * @param {string} message - The warning message to be pushed to the console.warns array.
   * @return {void} This function does not return anything.
   */
  console.warn = function (message) {
    console.warns.push(message);
    originalWarn.apply(console, arguments);
  };
  /**
   * Pushes the error message to the console.errors array and calls the original error function.
   *
   * @param {string} message - The error message to be pushed to the console.errors array.
   * @return {void} This function does not return anything.
   */
  console.error = function (message) {
    console.errors.push(message);
    originalError.apply(console, arguments);
  };
})();
/**
 * Displays the console logs, warnings, and errors in the DOM.
 *
 * This function iterates over the `console.logs`, `console.warns`, and `console.errors`
 * arrays and creates a corresponding DOM element for each log, warning, or error.
 * The elements are appended to the `.code-console-output` element in the DOM.
 *
 * @return {void} This function does not return anything.
 */
export function displayConsoleOutput() {
  const consoleOutput = document.querySelector('.code-console-output');
  console.logs.forEach((log) => {
    const logElement = document.createElement('div');
    logElement.className = 'log';
    logElement.textContent = log;
    consoleOutput.appendChild(logElement);
  });

  console.warns.forEach((warn) => {
    const warnElement = document.createElement('div');
    warnElement.className = 'warn';
    warnElement.textContent = warn;
    consoleOutput.appendChild(warnElement);
  });

  console.errors.forEach((error) => {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = error;
    consoleOutput.appendChild(errorElement);
  });
}

/**
 * Instructions on how to use the consoleOutput.mjs file:
 *
 * 1. Import the consoleOutput.mjs file in your JavaScript file.
 *    Example: `import './path/to/consoleOutput.mjs';`
 *
 * 2. Call the `displayConsoleOutput` function to display the console output on the webpage.
 *    Example: `displayConsoleOutput();`
 *
 * Note: Make sure to call the function after the console output has been generated.
 */