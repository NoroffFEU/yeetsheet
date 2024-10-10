const sheetNameElements = document.querySelectorAll(
  '[data-cy="sidebar"] [data-menu]',
);

/**
 * @name saveNewSheetName
 * @description Save the new sheet name in localStorage and update the sheet name in the DOM
 * @param {*} element the element to save the new sheet name
 * @returns void
 */

function saveNewSheetName(element) {
  const sheetIdentifier = element.getAttribute('data-menu');
  let storedSheets = JSON.parse(localStorage.getItem('yeetsheets')) || [];

  if (!Array.isArray(storedSheets)) {
    storedSheets = [];
  }

  let newSheetName = element.textContent.trim();

  if (!newSheetName) {
    newSheetName = 'Unnamed';
    element.textContent = newSheetName;
  }

  const sheetIndex = storedSheets.findIndex(
    (sheet) => sheet.id === sheetIdentifier,
  );

  if (sheetIndex !== -1) {
    storedSheets[sheetIndex].name = newSheetName;
  } else {
    storedSheets.push({ id: sheetIdentifier, name: newSheetName });
  }

  localStorage.setItem('yeetsheets', JSON.stringify(storedSheets));
}

/**
 * @name changeSheetName
 * @description Get the array of sheet names from localStorage if they have been edited/saved, and edit the name of the sheet
 * @returns void
 */

export function changeSheetName() {
  sheetNameElements.forEach((sheet) => {
    const sheetIdentifier = sheet.getAttribute('data-menu');

    let storedSheets = JSON.parse(localStorage.getItem('yeetsheets')) || [];

    if (!Array.isArray(storedSheets)) {
      storedSheets = [];
    }

    const storedSheet = storedSheets.find(
      (item) => item.id === sheetIdentifier,
    );
    if (storedSheet) {
      sheet.textContent = storedSheet.name;
    }

    sheet.addEventListener('click', () => {
      sheet.setAttribute('contenteditable', 'true');
      sheet.focus();
      //set the cursor to text
      sheet.style.cursor = 'text';

      const handleSave = () => {
        sheet.setAttribute('contenteditable', 'false');
        sheet.style.cursor = 'pointer';
        saveNewSheetName(sheet);

        sheet.removeEventListener('blur', handleSave);
        sheet.removeEventListener('keydown', handleKeyDown);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sheet.blur();
        }
      };

      sheet.addEventListener('blur', handleSave);
      sheet.addEventListener('keydown', handleKeyDown);
    });
  });
}
