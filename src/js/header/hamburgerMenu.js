export function toggleHamburgerMenu() {
  const hamburgerBtn = document.getElementById('nav-hamburger-btn');
  const fileBtn = document.getElementById('fileBtn');
  const nav = document.querySelector('nav');
  const fileMenu = document.getElementById('fileMenu');

  if (hamburgerBtn && nav) {
    hamburgerBtn.addEventListener('click', (e) => {
      nav.classList.toggle('hidden');
      e.stopPropagation();
    });
  }
  if (fileBtn && fileMenu) {
    // File button toggle
    fileBtn.addEventListener('click', (e) => {
      fileBtn.classList.toggle('active');
      e.stopPropagation();
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
      const isClickOutsideNav = !nav.contains(event.target);
      const isClickOutsideBtn = !hamburgerBtn.contains(event.target);

      if (
        isClickOutsideNav &&
        isClickOutsideBtn &&
        !nav.classList.contains('hidden')
      ) {
        nav.classList.add('hidden');
        fileBtn.classList.remove('active');
      }
    });
  }
}
