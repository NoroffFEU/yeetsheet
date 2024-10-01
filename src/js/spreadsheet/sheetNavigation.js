function showSpreadSheet(spreadSheetId, buttonId) {
  const spreadsheets = document.querySelectorAll('.spreadsheet-content');
  spreadsheets.forEach((sheet) => sheet.classList.add('hidden'));
  document.getElementById(spreadSheetId).classList.remove('hidden');

  const buttons = document.querySelectorAll('.sidePanelNav');
  buttons.forEach((button) => button.classList.remove('underline'));
  document.getElementById(buttonId).classList.add('underline');
}

function addNavigationListener(navId, sheetId) {
  const navButton = document.getElementById(navId);
  if (navButton) {
    navButton.addEventListener('click', () => {
      showSpreadSheet(sheetId, navId);
      console.log(`switched to ${sheetId}`);
    });
  } else {
    console.warn(`Navigation button with id ${navId} not found`);
  }
}

export function sheetNavigation() {
  const navItems = [
    { navId: 'navToSheet1', sheetId: 'spreadsheet1' },
    { navId: 'navToSheet2', sheetId: 'spreadsheet2' },
    { navId: 'navToSheet3', sheetId: 'spreadsheet3' },
    { navId: 'navToSheet4', sheetId: 'spreadsheet4' },
  ];

  navItems.forEach((item) => addNavigationListener(item.navId, item.sheetId));
}
