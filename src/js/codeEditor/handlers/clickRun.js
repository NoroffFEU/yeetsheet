const runBtn = document.getElementById('run-code');
const editor = document.getElementById('code-editor');
const cellId = editor.parentElement.querySelector('h2').textContent;

/**
 * Handles the click event for the run button.
 */
export default function clickRun() {
  runBtn.addEventListener('click', async () => {
    console.log('Run clicked');
    const code = editor.value;

    const id = document.getElementById(cellId);
    console.log(id);

    try {
      const result = await safeEval(code);
      id.textContent = result;
    } catch (error) {
      console.error('Error executing code: ', error);
    }
  });
}

/**
 * Safe evaluation of code using a Web Worker.
 * @param {string} code - The code to evaluate.
 * @returns {Promise} - A promise that resolves with the evaluation result or rejects with an error.
 */
function safeEval(code) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('worker.js');

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
