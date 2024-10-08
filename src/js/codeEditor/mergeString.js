import { getValue } from './codeEditor';

// merge the text from the code editor with the function field to build a full code snippet
export function MergeEditorAndFunctionFields() {
  // get string of code from the code editor + check if anything is written in the editor
  const editorCode = getValue().length > 1 ? getValue() : 'Code is too short';

  const inputField = document.getElementById('functionTextInput');
  // get string of code from the function text field  + check if anything is written in the input
  const inputText =
    inputField.value.length > 1 ? inputField.value : 'Input is too short';

  // code from code editor and function input field merged together
  const mergedCode = editorCode + inputText;

  return mergedCode;
}
