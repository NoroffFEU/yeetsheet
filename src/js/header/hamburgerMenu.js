export function toggleHamburgerMenu() {
  const hamburgerBtn = document.getElementById('nav-hamburger-btn');
  const nav = document.querySelector('nav');
  const mobileNav = document.getElementById('mobileNav');
  const fileBtn = document.getElementById('fileBtn');
  const fileMenu = document.getElementById('fileMenu');

  // Function to close the nav and file menu
  const closeNav = () => {
    nav.classList.add('hidden');
    if (fileMenu) fileMenu.classList.add('hidden');
  };

  // Toggle the nav on hamburger button click
  hamburgerBtn.addEventListener('click', (event) => {
    nav.classList.toggle('hidden');
    event.stopPropagation();
  });

  if (fileBtn) {
    // Toggle the file menu on file button click
    fileBtn.addEventListener('click', (e) => {
      if (fileMenu) fileMenu.classList.toggle('hidden');
      e.stopPropagation();
    });
  }

  // Close menus when clicking outside of them
  window.addEventListener('click', (event) => {
    if (
      !nav.contains(event.target) &&
      !hamburgerBtn.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      closeNav();
    }
    if (
      fileMenu &&
      !fileMenu.contains(event.target) &&
      !fileBtn.contains(event.target)
    ) {
      fileMenu.classList.add('hidden');
    }
  });
}
