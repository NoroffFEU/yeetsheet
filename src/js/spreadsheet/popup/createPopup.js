import { saveCellValue, getCellValue } from '../db';
import { lastActiveTd } from './showPopup';

export async function createPopup(tdElement) {
  // Get tdElement's col and row from data-col and data-row attributes
  const col = tdElement.getAttribute('data-col');
  const row = tdElement.getAttribute('data-row');

  // Convert col to letter
  const numberToLetter = (num) => {
    let ret = '';
    for (; num >= 0; num = parseInt(num / 26, 10) - 1) {
      ret = String.fromCharCode((num % 26) + 0x41) + ret;
    }
    return ret;
  };

  // Create cellId
  const cellId = numberToLetter(col) + (parseInt(row, 10) + 1);

  // Get cell value from IndexedDB
  let cellValue;
  try {
    cellValue = await getCellValue(cellId);
  } catch (error) {
    console.error('Failed to get cell value:', error);
    cellValue = null;
  }

  const popup = document.createElement('div');
  popup.id = 'cell-popup';
  popup.classList.add(
    'absolute',
    'border',
    'border-ys-buttonGray',
    'shadow-lg',
    'max-h-fit',
    'p-4',
    'z-50',
    'w-72',
    'bg-ys-amethyst-400',
    'dark:bg-ys-backgroundAndText',
  );
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('absolute', 'top-0', 'right-0');

  const closeButton = document.createElement('button');
  closeButton.classList.add('w-8', 'text-ys-buttonGray');
  const closeButtonIcon = document.createElement('i');
  closeButtonIcon.classList.add('fa-solid', 'fa-x');
  closeButton.append(closeButtonIcon);
  closeButton.addEventListener('click', () => {
    popup.remove();
    lastActiveTd.classList.remove(
      'dark:border-ys-pink-500',
      'border-ys-pink-500',
    );
    lastActiveTd.classList.add('dark:border-ys-overlay-5');
  });

  const trashButton = document.createElement('button');
  trashButton.classList.add('w-8', 'text-ys-buttonGray');
  const trashButtonIcon = document.createElement('i');
  trashButtonIcon.classList.add('fa-solid', 'fa-trash');
  trashButton.append(trashButtonIcon);
  trashButton.addEventListener('click', () => {
    let cellId;
    const spreadsheetContainer = document.getElementById(
      'spreadsheetContainer',
    );

    const inputField = spreadsheetContainer.querySelector('input');

    if (inputField) {
      inputField.value = '';
      inputField.parentElement.textContent = '';
      cellId = inputField.id;
    } else {
      tdElement.textContent = '';
    }

    saveCellValue(cellId, '');

    popup.remove();
    tdElement.classList.remove('dark:border-ys-pink-500', 'border-ys-pink-500');
    tdElement.classList.add(
      'dark:border-ys-overlay-5',
      'border-ys-amethyst-400',
    );
  });

  buttonsDiv.append(trashButton, closeButton);

  const valueHeading = document.createElement('h3');
  valueHeading.textContent = 'Value:';

  const valueInput = document.createElement('span');

  if (tdElement.tagName === 'INPUT') {
    valueInput.textContent = tdElement.value || 'No value yet.';
  } else {
    valueInput.textContent = cellValue || 'No value yet.';
  }

  popup.append(buttonsDiv, valueHeading, valueInput);

  return popup;
}
