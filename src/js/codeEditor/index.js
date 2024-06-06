import { getValue } from '../spreadsheet/codeEditor.js';

const runBtn = document.getElementById('runFunctionBtn');
const caller = document.getElementById('function-call-input');

export default function runCodeEdit(sheet) {
  runBtn.addEventListener('click', () => {
    const value = getValue();
    console.log(value);

    sheet.runCode(value, caller.value);
  });
}
