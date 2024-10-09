import createEle from '../helpers/createEle';

export function setupZoomMenu() {
  const zoomBtn = document.getElementById('zoomBtn');

  if (!zoomBtn) {
    console.error('Zoom button not found.');
    return;
  }

  const zoomMenu = createEle(
    'div',
    'border dark:border-ys-overlay-30 border-ys-amethyst-400 hidden absolute z-50 top-full left-0 md:w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
  );

  zoomMenu.id = 'zoomMenu';
  zoomMenu.setAttribute('role', 'menu');
  zoomMenu.setAttribute('aria-orientation', 'vertical');
  zoomMenu.setAttribute('aria-labelledby', 'zoomBtn');
  zoomMenu.setAttribute('tabindex', '-1');

  // Create the list of zoom options
  const zoomOptions = ['100%', '125%', '150%', '75%', '50%', 'Custom...'];
  const ul = createEle(
    'ul',
    'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
  );

  zoomOptions.forEach((option, i) => {
    const li = createEle('li');
    const button = createEle(
      'button',
      'w-full text-left dark:text-ys-textAndIconsLight px-5',
      option,
    );
    button.id = `zoom-item-${i}`;

    li.appendChild(button);
    ul.appendChild(li);
  });

  zoomMenu.appendChild(ul);
  zoomBtn.after(zoomMenu);
}
