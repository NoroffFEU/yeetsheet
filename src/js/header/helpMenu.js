import createEle from '../helpers/createEle';

export function renderHelpMenu() {
  const helpButton = document.querySelector('#helpBtn');

  if (helpButton) {
    const options = ['Legal information', 'Privacy policy', 'yeetSheet Help'];

    const helpContainer = createEle(
      'div',
      'border dark:border-ys-overlay-30 border-ys-amethyst-400 hidden absolute z-50 top-full left-0 md:w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
    );
    console.log(helpContainer);
    helpContainer.id = 'helpMenu';
    helpContainer.setAttribute('role', 'menu');
    helpContainer.setAttribute('aria-orientation', 'vertical');
    helpContainer.setAttribute('aria-labelledby', 'helpBtn');
    helpContainer.setAttribute('tabindex', '-1');

    const helpList = createEle(
      'ul',
      'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
    );

    options.forEach((option, i) => {
      const helpMenuItem = createEle('li');
      const helpMenuBtn = createEle(
        'button',
        'w-full text-left dark:text-ys-textAndIconsLight px-5',
        option,
      );
      helpMenuBtn.id = `help-item-${i}`;

      helpMenuItem.appendChild(helpMenuBtn);
      helpList.appendChild(helpMenuItem);
    });

    helpContainer.appendChild(helpList);
    helpButton.after(helpContainer);
  }
}
