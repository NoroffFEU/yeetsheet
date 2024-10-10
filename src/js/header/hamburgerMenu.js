export function toggleHamburgerMenu() {
  const hamburgerBtn = document.getElementById('nav-hamburger-btn');
  const nav = document.querySelector('nav');
  const mobileNav = document.getElementById('mobileNav');

  // Function to close the nav
  const closeNav = () => {
    nav.classList.add('hidden');
  };

  // Toggle the nav on hamburger button click
  hamburgerBtn.addEventListener('click', (event) => {
    nav.classList.toggle('hidden');
    event.stopPropagation();
  });

  // Close menus when clicking outside of them
  window.addEventListener('click', (event) => {
    if (
      !nav.contains(event.target) &&
      !hamburgerBtn.contains(event.target) &&
      !mobileNav.contains(event.target)
    ) {
      closeNav();
    }
  });
}
