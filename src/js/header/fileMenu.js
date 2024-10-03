import createEle from '../helpers/createEle.js';

/**
 * Sets up and inserts a dropdown menu for file options below the specified file button.
 *
 * If the file button (with ID "fileBtn") is not found in the DOM, the function exits early.
 *
 * @function setupFileMenu
 * @returns {void}
 */
export function setupFileMenu() {
  const fileBtn = document.querySelector('#fileBtn');

  if (!fileBtn) return;

  const fileMenuOptions = [
    'New file...',
    'Import existing file',
    'Edit',
    'Save',
    'Save as...',
    'Save copy',
    'Export',
  ];

  const fileMenuContainer = createEle(
    'div',
    'border dark:border-ys-overlay-30 border-ys-amethyst-400 hidden absolute z-50 top-full left-0 md:w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
  );
  fileMenuContainer.id = 'fileMenu';
  fileMenuContainer.setAttribute('role', 'menu');
  fileMenuContainer.setAttribute('aria-orientation', 'vertical');
  fileMenuContainer.setAttribute('aria-labelledby', 'fileBtn');
  fileMenuContainer.setAttribute('tabindex', '-1');

  const fileMenuList = createEle(
    'ul',
    'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
  );

  fileMenuOptions.forEach((option, i) => {
    const fileMenuItem = createEle('li');
    const fileMenuBtn = createEle(
      'button',
      'w-full text-left dark:text-ys-textAndIconsLight px-5',
      option,
    );
    fileMenuBtn.id = `file-item-${i}`;

    fileMenuItem.appendChild(fileMenuBtn);
    fileMenuList.appendChild(fileMenuItem);
  });

  fileMenuContainer.appendChild(fileMenuList);
  fileBtn.after(fileMenuContainer);
}
