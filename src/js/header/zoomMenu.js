import createEle from '../helpers/createEle';

export function setupZoomMenu() {
  const zoomBtn = document.getElementById('zoomBtn');
  const spreadsheetContainer = document.getElementById('spreadsheetContainer');

  if (!zoomBtn || !spreadsheetContainer) {
    console.error('Required elements not found.');
    return;
  }

  let zoomMenu;

  function resizeCells(zoomPercentage) {
    const scale = parseFloat(zoomPercentage) / 100;

    spreadsheetContainer.style.transform = `scale(${scale})`;
    spreadsheetContainer.style.transformOrigin = 'top left';

    spreadsheetContainer.style.width = `${100 / scale}%`;
    spreadsheetContainer.style.height = `${100 / scale}%`;

    const originalMaxHeight = 35;
    spreadsheetContainer.style.maxHeight = `${originalMaxHeight / scale}rem`;

    zoomBtn.textContent = `${zoomPercentage}%`;
  }

  function handleZoomOption(option) {
    let zoomValue;
    if (option === 'Custom...') {
      const customZoom = prompt('Enter custom zoom percentage:');
      if (customZoom) {
        zoomValue = customZoom;
      } else {
        return;
      }
    } else {
      zoomValue = option.replace('%', '');
    }

    resizeCells(zoomValue);
    closeZoomMenu();
  }

  function createZoomMenu() {
    if (zoomMenu) return zoomMenu;

    zoomMenu = createEle(
      'div',
      'border dark:border-ys-overlay-30 border-ys-amethyst-400 absolute z-50 bg-ys-amethyst-200 dark:bg-ys-overlay-10 shadow-md',
      false,
      {
        id: 'zoomMenu',
        role: 'menu',
        'aria-orientation': 'vertical',
        'aria-labelledby': 'zoomBtn',
        tabindex: '-1',
      },
    );

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
      button.addEventListener('click', () => handleZoomOption(option));
      li.appendChild(button);
      ul.appendChild(li);
    });

    zoomMenu.appendChild(ul);
    document.body.appendChild(zoomMenu);

    return zoomMenu;
  }

  function toggleZoomMenu() {
    if (!zoomMenu) {
      zoomMenu = createZoomMenu();
    }

    if (zoomMenu.style.display === 'none' || !zoomMenu.style.display) {
      const rect = zoomBtn.getBoundingClientRect();
      zoomMenu.style.top = `${rect.bottom + window.scrollY}px`;
      zoomMenu.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - zoomMenu.offsetWidth)}px`;
      zoomMenu.style.display = 'block';
    } else {
      closeZoomMenu();
    }
  }

  function closeZoomMenu() {
    if (zoomMenu) {
      zoomMenu.style.display = 'none';
    }
  }

  zoomBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleZoomMenu();
  });

  document.addEventListener('click', (event) => {
    if (
      zoomMenu &&
      zoomMenu.style.display === 'block' &&
      !zoomBtn.contains(event.target) &&
      !zoomMenu.contains(event.target)
    ) {
      closeZoomMenu();
    }
  });

  resizeCells(100);
}
