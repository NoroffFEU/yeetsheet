export function toggleHamburgerMenu() {
  const hamburgerBtn = document.getElementById('nav-hamburger-btn');
  const nav = document.querySelector('nav');

  if (hamburgerBtn && nav) {
    hamburgerBtn.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });
  }
}
