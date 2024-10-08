import { lastActiveTd } from './showPopup';

export function createPopup(tdElement) {
  const popup = document.createElement('div');
  popup.id = 'cell-popup';
  popup.classList.add(
    'absolute',
    'bg-red-500',
    'border',
    'border-ys-buttonGray',
    'shadow-lg',
    'max-h-fit',
    'p-4',
    'z-50',
    'w-72',
    'dark:bg-ys-backgroundAndText',
    'bg-ys-amethyst-300',
  );
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('absolute', 'top-0', 'right-0');

  const closeButton = document.createElement('button');
  // closeButton.classList.add('absolute', 'top-0', 'right-0', 'p-2');
  closeButton.classList.add('w-8', 'text-ys-buttonGray');
  const closeButtonIcon = document.createElement('i');
  closeButtonIcon.classList.add('fa-solid', 'fa-x');
  closeButton.append(closeButtonIcon);
  closeButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    lastActiveTd.classList.remove(
      'dark:border-ys-pink-500',
      'border-ys-pink-500',
    );
    lastActiveTd.classList.add('dark:border-ys-overlay-5');
    console.log('last active td: ', lastActiveTd);
  });
  const trashButton = document.createElement('button');
  // trashButton.classList.add('absolute', 'top-3', 'left-3');
  trashButton.classList.add('w-8', 'text-ys-buttonGray');
  const trashButtonIcon = document.createElement('i');
  trashButtonIcon.classList.add('fa-solid', 'fa-trash');
  trashButton.append(trashButtonIcon);
  trashButton.addEventListener('click', () => {
    tdElement.textContent = '';
    popup.classList.add('hidden');
  });

  buttonsDiv.append(trashButton, closeButton);

  const valueHeading = document.createElement('h3');
  valueHeading.textContent = 'Value:';

  const valueInput = document.createElement('span');
  if (tdElement.tagName === 'INPUT') {
    valueInput.textContent = tdElement.value;
  } else if (tdElement.textContent.length === 0) {
    valueInput.textContent = 'No value yet.';
  } else {
    valueInput.textContent = tdElement.textContent;
  }

  popup.append(buttonsDiv, valueHeading, valueInput);

  document.body.append(popup);
  return popup;
}
