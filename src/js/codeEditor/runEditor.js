import { MergeEditorAndFunctionFields } from './mergeString';

export let storedValue = null;

export function runEditor() {
  // Add an event listener to the button'
  document
    .getElementById('runFunctionBtn')
    .addEventListener('click', function () {
      // Get the Code from the Editor
      const code = MergeEditorAndFunctionFields();

      try {
        // Step 3: Evaluate the Code
        console.log('code that runs trough eval();', code);
        const result = eval(code);
        storedValue = result;
        // Step 4: Log the result to the console
        // console.log(result);
      } catch (error) {
        // Step 5: Handle any errors during evaluation
        console.error('Error while evaluating code:', error);
      }
    });
}
