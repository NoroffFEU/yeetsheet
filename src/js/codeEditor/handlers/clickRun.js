/**
 * Button element that triggers the code execution.
 * @type {HTMLElement}
 */
const runBtn = document.getElementById('run-code');

/**
 * Code editor element where the user inputs code to be evaluated.
 * @type {HTMLTextAreaElement}
 */
const editor = document.getElementById('code-editor');

/**
 * Attaches a click event handler to the run button that executes the code in the editor.
 * This function retrieves the cellId from the nearest h2 element, evaluates the code,
 * and updates the corresponding cell's content with the result.
 *
 * @function clickRun
 */
export default function clickRun() {
  runBtn.addEventListener('click', async () => {
    const h2Element = editor.parentElement.querySelector('h2');

    /**
     * The cell ID retrieved from the nearest h2 element.
     * @type {string|null}
     */
    const cellId = h2Element ? h2Element.textContent : null;

    if (!cellId) {
      console.error('Cell ID not found');
      return;
    }

    console.log('Run clicked');

    /**
     * Code entered by the user in the editor.
     * @type {string}
     */
    const code = editor.value;

    /**
     * The element that corresponds to the retrieved cell ID.
     * @type {HTMLElement|null}
     */
    const idElement = document.getElementById(cellId);

    if (!idElement) {
      console.error(`Element with id "${cellId}" not found`);
      return;
    }

    try {
      const result = await safeEval(code);
      idElement.textContent = result;
    } catch (error) {
      console.error('Error executing code: ', error);
    }
  });
}

/**
 * Safely evaluates code using a Web Worker.
 * The Web Worker runs the code in a separate thread, ensuring that the main UI thread is not blocked.
 *
 * @function safeEval
 * @param {string} code - The code to evaluate.
 * @returns {Promise<string>} - A promise that resolves with the result of the code evaluation or rejects with an error.
 */
function safeEval(code) {
  return new Promise((resolve, reject) => {
    let worker;
    try {
      worker = new Worker('worker.js');
    } catch (error) {
      console.error('Failed to initialize Web Worker:', error);
      reject(error);
      return;
    }

    worker.onmessage = function (event) {
      if (event.data.success) {
        resolve(event.data.result);
      } else {
        reject(new Error(event.data.error));
      }
      worker.terminate();
    };

    worker.onerror = function (error) {
      reject(error);
      worker.terminate();
    };

    worker.postMessage(code);
  });
}
