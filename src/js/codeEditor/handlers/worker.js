self.onmessage = function (event) {
  try {
    // Limit the scope of evaluation
    const result = (function () {
      'use strict';
      return eval(event.data);
    })();
    self.postMessage({ success: true, result: result });
  } catch (e) {
    self.postMessage({ success: false, error: e.message });
  }
};
