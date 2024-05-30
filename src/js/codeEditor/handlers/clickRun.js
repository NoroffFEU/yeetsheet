const runBtn = document.getElementById('run-code');
const editor = document.getElementById('code-editor');
const cellId = editor.parentElement.querySelector('h2');

/**
 * Handles the click event for the run button.
 */
export default function clickRun() {
  runBtn.addEventListener('click', () => {
    console.log('Run clicked');
    const code = editor.value;

    const id = document.getElementById(cellId.textContent);
    console.log(id);

    try {
      id.textContent = eval(code);
    } catch (error) {
      console.error('Error executing code: ', error);
    }
  });
}
