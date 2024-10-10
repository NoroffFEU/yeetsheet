import createEle from '../helpers/createEle.js';

/**
 * Sets up and inserts a dropdown menu for settings options below the specified settings button.
 *
 * If the settings button (with ID "settingsBtn") is not found in the DOM, the function exits early.
 *
 * @function setupSettingsMenu
 * @returns {void}
 */
export function setupSettingsMenu() {
  const settingsBtn = document.querySelector('#settingsBtn');

  if (!settingsBtn) return;

  const settingsMenuOptions = ['Mode', 'Auto Save', 'Settings'];

  const settingsMenuContainer = createEle(
    'div',
    'border dark:border-ys-overlay-30 border-ys-amethyst-400 hidden absolute z-50 top-full left-0 md:w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
  );
  settingsMenuContainer.id = 'settingsMenu';
  settingsMenuContainer.setAttribute('role', 'menu');
  settingsMenuContainer.setAttribute('aria-orientation', 'vertical');
  settingsMenuContainer.setAttribute('aria-labelledby', 'settingsBtn');
  settingsMenuContainer.setAttribute('tabindex', '-1');

  const settingsMenuList = createEle(
    'ul',
    'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
  );

  settingsMenuOptions.forEach((option, i) => {
    const settingsMenuItem = createEle('li');
    const settingsMenuBtn = createEle(
      'button',
      'w-full text-left dark:text-ys-textAndIconsLight px-5',
      option,
    );
    settingsMenuBtn.id = `settings-item-${i}`;

    settingsMenuItem.appendChild(settingsMenuBtn);
    settingsMenuList.appendChild(settingsMenuItem);
  });

  settingsMenuContainer.appendChild(settingsMenuList);
  settingsBtn.after(settingsMenuContainer);
}
