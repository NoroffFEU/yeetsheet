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

    // Create the zoom menu div
    zoomMenu = createEle(
      'div',
      'border dark:border-ys-overlay-30 md:w-56 border-ys-amethyst-400 absolute z-50 bg-ys-amethyst-200 dark:bg-ys-overlay-10 shadow-md',
      false,
      {
        id: 'zoomMenu',
        role: 'menu',
        'aria-orientation': 'vertical',
        'aria-labelledby': 'zoomBtn',
        tabindex: '-1',
      },
    );

    // Define the zoom options
    const zoomOptions = ['50%', '75%', '100%', '125%', '150%', 'Custom...'];

    // Create a list (ul) for the zoom options
    const ul = createEle(
      'ul',
      'divide-y divide-solid dark:divide-ys-overlay-30 divide-ys-amethyst-400',
    );

    // Loop through each zoom option
    zoomOptions.forEach((option) => {
      const li = createEle('li'); // Create a list item
      const button = createEle(
        'button',
        'w-full text-left dark:text-ys-textAndIconsLight px-5',
        option, // The text for the button is the zoom option
      );

      // Add click event listener to each zoom option button
      button.addEventListener('click', () => {
        // First, remove 'selected-zoom' class from any other button that has it
        document.querySelectorAll('.selected-zoom').forEach((btn) => {
          btn.classList.remove('selected-zoom');
          btn.style.backgroundColor = ''; // Reset background color
          btn.style.color = ''; // Reset text color
          btn.style.fontWeight = ''; // Reset font weight
        });

        // Check if the page is in dark mode
        const isDarkMode = document.documentElement.classList.contains('dark');

        // Add 'selected-zoom' class to the clicked button
        button.classList.add('selected-zoom');
        button.style.backgroundColor = isDarkMode
          ? 'rgba(213, 95, 168, 0.3)' // Dark mode color
          : 'rgb(122, 117, 175, 0.5)'; // Light mode color
        button.style.fontWeight = 'bold';

        // Call the function to handle the zoom level adjustment
        handleZoomOption(option);
      });

      // Append the button to the list item, and then the list item to the ul
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
