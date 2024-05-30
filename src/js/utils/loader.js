export function showLoader(container = false) {
  container = container ? container : document.body;
  const loaderContainer = document.createElement('div');
  loaderContainer.id = 'loaderContainer';
  loaderContainer.className =
    'fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm';

  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.className =
    'animate-spin p-2 bg-gradient-to-tr from-blue-500 to-red-500 via-purple-500 rounded-full';

  const whiteCircle = document.createElement('div');
  whiteCircle.className = 'bg-white rounded-full';

  const innerCircle = document.createElement('div');
  innerCircle.className = 'w-20 h-20 rounded-full';

  whiteCircle.appendChild(innerCircle);
  loader.appendChild(whiteCircle);
  loaderContainer.appendChild(loader);
  container.appendChild(loaderContainer);
}

export function hideLoader() {
  const loaderContainer = document.getElementById('loaderContainer');
  if (loaderContainer) {
    document.body.removeChild(loaderContainer);
  }
}
