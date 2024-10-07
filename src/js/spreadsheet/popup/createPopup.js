export function createPopup(tdElement) {
  const popup = document.createElement('div');
  popup.id = 'cell-popup';
  popup.classList.add(
    'absolute',
    'bg-red-500',
    'border',
    'shadow-lg',
    'max-h-fit',
    'p-4',
    'z-50',
  );

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('flex', 'items-center', 'justify-end');

  const closeButton = document.createElement('button');
  // closeButton.classList.add('absolute', 'top-0', 'right-0', 'p-2');
  closeButton.classList.add('w-4');
  const closeButtonIcon = document.createElement('i');
  closeButtonIcon.classList.add('fa-solid', 'fa-x');
  closeButton.append(closeButtonIcon);
  closeButton.addEventListener('click', () => popup.classList.add('hidden'));

  const trashButton = document.createElement('button');
  // trashButton.classList.add('absolute', 'top-3', 'left-3');
  const trashButtonIcon = document.createElement('i');
  trashButtonIcon.classList.add('fa-solid', 'fa-trash');
  trashButton.append(trashButtonIcon);
  trashButton.addEventListener('click', () => {
    tdElement.textContent = '';
    popup.classList.add('hidden');
  });

  buttonsDiv.append(closeButton, trashButton);

  const valueHeading = document.createElement('h3');
  valueHeading.textContent = 'Value:';

  const valueInput = document.createElement('span');
  if (tdElement.textContent.length === 0) {
    valueInput.textContent = 'No value yet.';
  } else {
    valueInput.textContent = tdElement.textContent;
  }

  popup.append(buttonsDiv, valueHeading, valueInput);

  document.body.append(popup);
  return popup;
}
