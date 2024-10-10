import { getValue, setValue } from './codeEditor';
import { storedValue } from './runEditor';

export function editorRouter() {
  let storedCodeEditor = '';
  let storedConsole = '';
  let currentTab = 0;

  const codeWrapper = document.getElementById('code-wrapper');
  const editorButton = document.getElementById('editor-button');
  const consoleButton = document.getElementById('console-button');

  // Save the current editor or console value on focus out
  codeWrapper.addEventListener('focusout', () => {
    const currentValue = getValue();
    if (currentTab === 0) {
      storedCodeEditor = currentValue;
    } else if (currentTab === 1) {
      storedConsole = currentValue;
    }
  });

  // Switch to the editor tab
  editorButton.addEventListener('click', () => {
    currentTab = 0;
    setValue(storedCodeEditor || '');
  });

  // Switch to the console tab
  consoleButton.addEventListener('click', () => {
    currentTab = 1;
    setValue(storedConsole || storedValue ? storedValue.toString() : '');
  });
}
