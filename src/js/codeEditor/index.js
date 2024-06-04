const runBtn = document.getElementById('runFunctionBtn');
// const selectedCell = document.getElementById('selected-cell');
const editor = document.getElementById('code-editor-input');
const caller = document.getElementById('function-call-input');

export default function codeEditor(sheet) {
  runBtn.addEventListener('click', () => {
    const value = editor.value;
    console.log(value);
    sheet.runCode(value, caller.value);
  });
}
