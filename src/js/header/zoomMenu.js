import createEle from '../helpers/createEle';

export function setupZoomMenu() {
  const zoomBtn = document.getElementById('zoomBtn');

  if (!zoomBtn) {
    console.error('Zoom button not found.');
    return;
  }

  // Create the dropdown menu when the button is clicked
  zoomBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    let zoomMenu = document.getElementById('zoomMenu');

    if (!zoomMenu) {
      // Create the div for the menu if it doesn't exist
      zoomMenu = createEle(
        'div',
        'border dark:border-ys-overlay-30 border-ys-amethyst-400 absolute z-50 top-13 left-100 w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
        false,
        {
          id: 'zoomMenu',
          role: 'menu',
          'aria-orientation': 'vertical',
          'aria-labelledby': 'zoomBtn',
          tabindex: '-1',
        },
      );

      // Create the list of zoom options
      const zoomOptions = ['100%', '125%', '150%', '75%', '50%', 'Custom...'];
      const ul = createEle(
        'ul',
        'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
      );

      zoomOptions.forEach((option) => {
        const li = createEle('li');
        const button = createEle(
          'button',
          'w-full text-left dark:text-ys-textAndIconsLight px-5',
          option,
        );
        button.addEventListener('click', () => {
          zoomBtn.textContent = option;
          zoomMenu.remove(); // Remove the menu after selection
        });
        li.appendChild(button);
        ul.appendChild(li);
      });

      zoomMenu.appendChild(ul);
      document.body.appendChild(zoomMenu);

      // Position the menu relative to the button
      const rect = zoomBtn.getBoundingClientRect();
      zoomMenu.style.top = `${rect.bottom + window.scrollY}px`;
      zoomMenu.style.left = `${rect.left + window.scrollX}px`;
    } else {
      // If the menu is already open, remove it
      zoomMenu.remove();
    }
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', (event) => {
    const zoomMenu = document.getElementById('zoomMenu');
    if (
      zoomMenu &&
      !zoomBtn.contains(event.target) &&
      !zoomMenu.contains(event.target)
    ) {
      zoomMenu.remove();
    }
  });
}
