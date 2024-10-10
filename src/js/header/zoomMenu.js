import createEle from '../helpers/createEle';

export function setupZoomMenu() {
  const zoomBtn = document.getElementById('zoomBtn');

  if (!zoomBtn) {
    console.error('Zoom button not found.');
    return;
  }

  zoomBtn.addEventListener('click', () => {
    zoomMenu.classList.remove('hidden');
  });

  const zoomMenu = createEle(
    'div',
    'border dark:border-ys-overlay-30 border-ys-amethyst-400 hidden absolute z-50 top-full left-0 md:w-56 bg-ys-amethyst-200 dark:bg-ys-overlay-10 focus:outline-none shadow-md',
  );

  zoomMenu.id = 'zoomMenu';
  zoomMenu.setAttribute('role', 'menu');
  zoomMenu.setAttribute('aria-orientation', 'vertical');
  zoomMenu.setAttribute('aria-labelledby', 'zoomBtn');
  zoomMenu.setAttribute('tabindex', '-1');

  // Create the list of zoom options - updated in low to high
  const zoomOptions = ['50%', '75%', '100%', '125%', '150%', 'Custom...'];
  const ul = createEle(
    'ul',
    'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
  );

  let selectedZoom = '100%';

  zoomOptions.forEach((option, i) => {
    const li = createEle('li');
    const button = createEle(
      'button',
      'w-full text-left dark:text-ys-textAndIconsLight px-5',
      option,
    );
    button.id = `zoom-item-${i}`;

    if (option === selectedZoom) {
      button.classList.add('selected-zoom');
    }

    // Event listener for zoom selection
    button.addEventListener('click', () => {
      document.querySelectorAll('.selected-zoom').forEach((btn) => {
        btn.classList.remove('selected-zoom');
        btn.style.backgroundColor = ''; // Reset background
        btn.style.color = '';
        btn.style.fontWeight = '';
      });

      // Set the background color based on the current theme
      const isDarkMode = document.documentElement.classList.contains('dark');
      button.classList.add('selected-zoom');
      button.style.backgroundColor = isDarkMode
        ? 'rgba(213, 95, 168, 0.3)' // Dark mode color
        : 'rgb(122, 117, 175, 0.5)'; // Light mode color
      button.style.fontWeight = 'bold';

      selectedZoom = option;
      zoomMenu.classList.add('hidden');
      zoomBtn.textContent = `${selectedZoom}`;
    });

    li.appendChild(button);
    ul.appendChild(li);
  });

  zoomMenu.appendChild(ul);
  zoomBtn.after(zoomMenu);

  zoomBtn.addEventListener('click', () => {
    zoomMenu.classList.toggle('hidden');
  });
}
