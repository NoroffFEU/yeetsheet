/**
 * Shows the tab with the given tabId by hiding all other tabs and buttons, 
 * and adding the active class to the button that opened the tab.
 *
 * @param {string} tabId - The id of the tab to show.
 * @return {void} This function does not return anything.
 */
export function showTab(tabId) {
  // Get all elements with class="tab-pane" and hide them
  var tabPanes = document.getElementsByClassName('tab-pane');
  for (let i = 0; i < tabPanes.length; i++) {
    tabPanes[i].style.display = 'none';
  }

  // Get all elements with class="console-btn" and remove the active class
  var tabButtons = document.getElementsByClassName('console-btn');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }

  // Show the current tab
  document.getElementById(tabId).style.display = 'block';

  // Add the active class to the button that opened the tab
  event.currentTarget.classList.add('active');
}

/**
 * Initializes the tabs by hiding all tab panes and showing the 'code-wrapper' tab pane.
 * Also adds the 'active' class to the 'code-editor-btn' button.
 *
 * @return {void} This function does not return anything.
 */
export function initTabs() {
  const tabPanes = document.getElementsByClassName('tab-pane');
  for (const tabPane of tabPanes) {
    tabPane.style.display = 'none';
  }
  document.getElementById('code-wrapper').style.display = 'block';
  document.querySelector('[data-cy="code-editor-btn"]').classList.add('active');
}
