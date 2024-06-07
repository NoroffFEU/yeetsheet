export function toggleSidebar() {
  const toggleButton = document.getElementById('toggleSidebarBtn');
  const sidebarContent = document.getElementById('sidebarContent');

  if (toggleButton && sidebarContent) {
    toggleButton.addEventListener('click', () => {
      sidebarContent.classList.toggle('hidden');
    });
  }
}

// Call the function to set up the event listener
document.addEventListener('DOMContentLoaded', () => {
  toggleSidebar();
});
