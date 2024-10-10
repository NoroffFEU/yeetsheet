import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

/**
 * Callback to handle the editor `blur` event.
 *
 * @callback OnBlurCallback
 */

let editor = undefined;

self.MonacoEnvironment = {
  getWorker(_, label) {
    // if (label === 'json') {
    //     return new jsonWorker();
    // }

    // if (label === 'css' || label === 'scss' || label === 'less') {
    //     return new cssWorker();
    // }

    // if (label === 'html' || label === 'handlebars' || label === 'razor') {
    //     return new htmlWorker();
    // }

    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

/**
 * @description Mount the code editor.
 * @param {OnBlurCallback} onBlurCallback Callback function to handle the editor `blur` event.
 */
export function mountEditor(onBlurCallback) {
  editor = monaco.editor.create(document.querySelector('#code-editor'), {
    value: '',
    language: 'javascript',
    fontSize: 16,
    fontFamily: 'monospace',
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
  });

  monaco.editor.setTheme('vs-dark');

  editor.onDidBlurEditorText(() => {
    // this event has no payload
    onBlurCallback();
  });
}

/**
 * @description Set the editor value.
 * @param {string} value The editor value.
 */
export function setValue(value) {
  editor.value = value;
}

/**
 * @description Get the editor value.
 * @return {string} The current editor value.
 */
export function getValue() {
  return editor.getValue();
}
