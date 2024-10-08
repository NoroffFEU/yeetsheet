import createEle from './createEle';

// Function to create the context menu
export function createContextMenuColumn() {
  // Create the context menu
  const contextMenu = createEle('div', 'context-menu hidden');
  contextMenu.id = 'contextMenuColumn';

  // New column to the right
  const optionRight = createEle(
    'div',
    'menu-option gap-2',
    'New column to the right',
  );
  const rightArrow = createEle('span', 'arrow-right', '→');
  optionRight.appendChild(rightArrow);

  // New column to the left
  const optionLeft = createEle(
    'div',
    'menu-option gap-2',
    'New column to the left',
  );
  const leftArrow = createEle('span', 'arrow-right', '←');
  optionLeft.appendChild(leftArrow);

  // Delete column
  const optionDelete = createEle('div', 'menu-option', 'Delete column');

  contextMenu.appendChild(optionRight);
  contextMenu.appendChild(optionLeft);
  contextMenu.appendChild(optionDelete);

  document.body.appendChild(contextMenu);

  return {
    contextMenu,
    optionRight,
    optionLeft,
    optionDelete,
  };
}

// Function to create the context row menu
export function createContextMenuRow() {
  // Create the context menu
  const contextMenuRow = createEle('div', 'context-menu hidden');
  contextMenuRow.id = 'contextMenuRow';

  // New row above
  const optionAbove = createEle('div', 'menu-option gap-2', 'New row above');
  const aboveArrow = createEle('span', 'arrow-right', '→');
  optionAbove.appendChild(aboveArrow);

  // New row below
  const optionBelow = createEle('div', 'menu-option gap-2', 'New row under');
  const downArrow = createEle('span', 'arrow-right', '←');
  optionBelow.appendChild(downArrow);

  // Delete row
  const optionDeleteRow = createEle('div', 'menu-option', 'Delete row');

  contextMenuRow.appendChild(optionAbove);
  contextMenuRow.appendChild(optionBelow);
  contextMenuRow.appendChild(optionDeleteRow);

  document.body.appendChild(contextMenuRow);

  return {
    contextMenuRow,
    optionAbove,
    optionBelow,
    optionDeleteRow,
  };
}

// Function to hide the context menu when clicked outside
export function addContextMenuListener(contextMenu) {
  document.addEventListener('click', () => {
    contextMenu.classList.add('hidden');
  });
}
